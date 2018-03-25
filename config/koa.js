const Koa = require('koa')
const nconf = require('nconf')
const json = require('koa-json')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const router = require('../routes/index')
const parameter = require('koa-parameter')
const koaBody = require('koa-body')
const serve = require('koa-static')
const path = require('path')
const app = module.exports = new Koa()

// json body parser
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

// 参数验证
app.use(parameter(app))

// 美化json
app.use(json())

if (nconf.get('NODE_ENV') !== 'unittest') {
  // 跨域请求
  app.use(cors())
  // 日志
  app.use(logger())
  // 文件上传
  app.use(koaBody({ multipart: true }))

  // 静态服务器
  app.use(serve(path.join(__dirname, '/public')))
}

// jwt
app.use(
  jwt({ secret: nconf.get('jwt_secret') }).unless({
    path: [/^\/api\/v1/, /^\/api\/upload/]
  })
)

// 路由加载
app.use(router.routes(), router.allowedMethods())

if (nconf.get('NODE_ENV') !== 'unittest') {
  app.listen(nconf.get('port') || 8426, nconf.get('host'), () => {
    console.log(
      `\x1b[33m%s\x1b[0m`,
      `Server running at http://${nconf.get('host')}:${nconf.get('port') || 8426}`
    )
  })
}
