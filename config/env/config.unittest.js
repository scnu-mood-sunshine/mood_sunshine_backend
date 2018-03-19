'use strict'

const baseConfig = require('./config.base')

const unittestConfig = {
  host: '127.0.0.1',
  port: 8422,
  mongodb: 'mongodb://127.0.0.1:27017/mood_sunshine_test'
}

module.exports = Object.assign(baseConfig, unittestConfig)
