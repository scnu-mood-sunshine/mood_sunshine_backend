const nconf = require('nconf')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(nconf.get('mongodb'), {
  promiseLibrary: global.Promise
})
module.exports = mongoose
