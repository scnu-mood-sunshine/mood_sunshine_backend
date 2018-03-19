'use strict'

const Router = require('koa-router')

/** 中间件导入 */
const middlewares = require('../api/middlewares/index')

/** 资源路由 */
const router = new Router()
/** restful api 路由 */
const commonRouter = new Router()
/** 监权路由 */
const authRouter = new Router()

/** 路由前缀 */
router.prefix('/api')
commonRouter.prefix('/v1')
authRouter.prefix('/auth')

/** 通用路由中间件 */

/** 平常路由中间件 */

/** 监权路由中间件 */
authRouter.use(middlewares.checkToken())

/** 路由编写 */
require('./user')(router, authRouter, commonRouter)

/** 整合路由 */
router.use(commonRouter.routes(), commonRouter.allowedMethods())
router.use(authRouter.routes(), authRouter.allowedMethods())

module.exports = router
