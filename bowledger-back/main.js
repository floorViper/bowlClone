/*
    SPDX-License-Identifier: Apache-2.0
*/

/**
 *
 * Created by shouhewu on 6/8/17.
 *
 */

const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const Explorer = require('./app/explorer/Explorer.js');
const appconfig = require('./appconfig.json');
const helper = require('./app/helper.js');

const logger = helper.getLogger('main');
const express = require('express');
const path = require('path');
const pgservice = require('./app/persistence/postgreSQL/db/pgservice.js');

////로그인 연결 추가 지역////
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var database = require('./loginTest/database');
var indexRouter = require('./app/explorer/rest/index.js');
var authRouter = require('./app/explorer/rest/auth');
var userRouter = require('./loginTest/userRouter');
///////////////////////////

const host = process.env.HOST || appconfig.host;
const port = process.env.PORT || appconfig.port;

class Broadcaster extends WebSocket.Server {
  constructor(server) {
    super({ server });
    this.on('connection', function connection(ws, req) {
      const location = url.parse(req.url, true);
      this.on('message', message => {
        console.log('received: %s', message);
      });
    });
  }

  broadcast(data) {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

let server;
async function startExplorer() {
  const explorer = new Explorer();
  //= =========== web socket ==============//
  server = http.createServer(explorer.getApp());
  const broadcaster = new Broadcaster(server);
  await explorer.initialize(broadcaster);
  explorer
    .getApp()
    ///////추가//////////
    //htmlSection폴더를 static으로 오픈
    .use(express.static(path.join(__dirname, 'public')))
    //.use('/htmlSection',express.static(path.join(__dirname,'/loginTest/htmlSection')))
    //cookie-parser설정
    .use(cookieParser())
    //Session 설정
    .use(
      expressSession({
        secret: 'my key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
      })
    )
    .use('/', indexRouter)
    .use('/auth', authRouter);
  /////////////
  logger.info(
    'Please set logger.setLevel to DEBUG in ./app/helper.js to log the debugging.'
  );
  // ============= start server =======================
  server.listen(port, () => {
    console.log('\n');
    console.log(`Please open web browser to access ：http://${host}:${port}/`);
    console.log('\n');
    console.log(`pid is ${process.pid}`);
    console.log('\n');
    ////추가////
    //database.connectionDB();
    ///////////
  });
}

startExplorer();

let connections = [];
server.on('connection', connection => {
  connections.push(connection);
  connection.on(
    'close',
    () => (connections = connections.filter(curr => curr !== connection)) //커넥션닫으면 그커넥션 제외
  );
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
const shutDown = function() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    pgservice.closeconnection();
    ////추가////
    //database.closeConnectionDB();
    ///////////
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    );
    pgservice.closeconnection();
    ////추가////
    //database.closeConnectionDB();
    ///////////
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', shutDown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', shutDown);
