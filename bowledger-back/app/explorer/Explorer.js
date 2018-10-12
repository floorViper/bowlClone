/**
 *    SPDX-License-Identifier: Apache-2.0
 */
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');
const dbroutes = require('./rest/dbroutes.js');
const platformroutes = require('./rest/platformroutes.js');
const explorerconfig = require('./explorerconfig.json');
const PersistenceFactory = require('../persistence/PersistenceFactory.js');
const timer = require('./backend/timer.js');
const swaggerDocument = require('../../swagger.json');

class Explorer {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    this.app.use(compression());
    this.persistence = {};
    this.platforms = explorerconfig.platforms;
  }

  getApp() {
    return this.app;
  }

  async initialize(broadcaster) {
    this.persistence = await PersistenceFactory.create(
      explorerconfig.persistence
    );
    dbroutes(this.app, this.persistence);
    for (const pltfrm of this.platforms) {
      await platformroutes(this.app, pltfrm, this.persistence);
      timer.start(platform, this.persistence, broadcaster);
    }
  }
}

module.exports = Explorer;
