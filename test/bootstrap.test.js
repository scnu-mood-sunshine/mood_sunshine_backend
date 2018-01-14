'use strict'
require('../config/nconf')
require('../config/mongoose')
const app = require('../config/koa')
const nconf = require('nconf')
const server = app.listen(nconf.get('port'))
const request = require('supertest').agent(server)

module.exports = {
  request
}
