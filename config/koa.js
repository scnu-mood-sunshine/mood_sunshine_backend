const Koa = require('koa')
const nconf = require('nconf')
const json = require('koa-json')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const router = require('../route/index')
const app = module.exports = new Koa()

// 路由

// json body parser
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
// 美化json
app.use(json())
// 跨域请求
if (nconf.get('NODE_ENV') !== 'unittest') {
  app.use(cors())
  app.use(logger())
}
app.use(
  jwt({ secret: nconf.get('jwt_secret') }).unless({
    path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/v1/]
  })
)
app.use(router.routes(), router.allowedMethods())

if (nconf.get('NODE_ENV') !== 'unittest') {
  app.listen(nconf.get('port') || 8426, nconf.get('host'), () => {
    console.log(
      `\x1b[33m%s\x1b[0m`,
      `Server running at http://${nconf.get('host')}:${nconf.get('port') || 8426}`
    )
  })
}
