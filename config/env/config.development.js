'use strict'

const baseConfig = require('./config.base')

const devConfig = {
  port: 8424,
  mongodb: 'mongodb://127.0.0.1:27017/mood_sunshine_dev'
}

module.exports = Object.assign(baseConfig, devConfig)
