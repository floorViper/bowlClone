/*
//Express 기본 모듈을 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

//Express의 미들웨어를 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

//Session 미들웨어 불러오기
var expressSession = require('express-session');
//Session file 미들웨어 불러오기
var FileStore = require('session-file-store');

//
var database = require('./database');
var sqlQueryFunctions = require('./sqlQueryFunctions');
var userRouter = require('./userRouter');

//익스프레스 생성
var app = express();

//기본속성 설정
app.set('port', process.env.PORT || 3000);

//public폴더를 static으로 오픈
app.use('/public',express.static(path.join(__dirname,'/public')));

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

//body-parser를 사용해 application/json파싱
app.use(bodyParser.json());

//cookie-parser설정
app.use(cookieParser());

//Session 설정
app.use(expressSession({
    secret: 'my key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));


//라우터 객체 참조
var router = express.Router();

//login check function
router.route('/process/loginCheck').get(function(req, res){
    console.log('/process/loginCheck calling');

    if (req.session.user) {
        console.log('이미 로그인이 되어 있습니다.')
        res.redirect('/public/loginSuccess.html');
    } else {
        console.log('로그인이 되어있지 않습니다.')
        res.redirect('/public/login.html');
    }
});


//login router function
router.route('/process/login').post(function(req, res){
    console.log('/process/login calling');
    //console.log(req);
    userRouter.userLogin(req,res);
});

//logout routing function
router.route('/process/logout').get(function(req,res){
    console.log('/process/logout calling');
    
    if (req.session.user){
        //login state
        console.log('logout');

        req.session.destroy(function(err){
            if(err) {throw err;}

            console.log('cleared session , logout');

            res.redirect('/public/login.html');
        });
    } else {
        //not login state
        console.log('not login state');

        res.redirect('/public/login.html');
    }
});

//유저 추가 하기 처리하는 함수
router.route('/process/addUserPage').get(function(req, res){
    console.log('/process/addUserPage calling');

    if (req.session.user){
        console.log('로그인 상태입니다.');
        res.redirect('/public/addUser.html');
    } else {
        console.log('로그인 상태가 아닙니다.');
        res.redirect('/public/login.html');
    };
});

//User add function router
router.route('/process/addUser').post(function(req, res){
    console.log('/process/addUser calling');

    userRouter.userAddList(req,res);
});


//유저 확인 하기 처리하는 함수
router.route('/process/userListPage').get(function(req, res){
    console.log('/process/userListPage calling');

    if (req.session.user){
        console.log('로그인 상태입니다.');
        res.redirect('/public/userList.html');
    } else {
        console.log('로그인 상태가 아닙니다.');
        res.redirect('/public/login.html');
    };
});

//User list function router
router.route('/process/userList').post(function(req, res){
    console.log('/process/userList calling');

    userRouter.userAllListSelect(req, res);
});

//라우터 객체 등록
app.use('/', router);

//========404 오류 페이지 처리 ========//

var errorHandler = expressErrorHandler({
    static:{
        '404': './htmlSection/error404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//========서버 시작==========//
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트 :'+app.get('port'));

    database.connectionDB();

});

//=========서버 종료==========//
http.createServer(app).on('close', function(){
    console.log('서버가 종료되었습니다.');

    database.closeConnectionDB();
});
*/
