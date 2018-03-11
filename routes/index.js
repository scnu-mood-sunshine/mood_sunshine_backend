'use strict'

const Router = require('koa-router')
const base = require('../api/models/base')
const User = require('../api/models/user')
const logger = require('../api/middlewares/logger')
const router = new Router()
const apiRouter = new Router()
const authRouter = new Router()

router.prefix('/api')
apiRouter.prefix('/v1')
authRouter.prefix('/v1/auth')

router.get('/', async (ctx, next) => {
  ctx.redirect('http://google.com')
})

// 登录
apiRouter.post('/login', async ctx => {
  const { userName, passwd } = ctx.request.body
  try {
    const user = await User.findByName(userName)
    if (!user) {
      ctx.throw(423, '用户不存在')
    }
    const isMatch = await user.comparePassword(passwd)
    if (!isMatch) {
      ctx.throw(423, '用户名或密码错误！')
    }
    const token = base.signToken(user)
    ctx.body = {
      code: 200,
      message: '登录成功!',
      token: token
    }
  } catch (e) {
    ctx.throw(e)
  }
})

// 注册
apiRouter.post('/register', async ctx => {
  const { userName, passwd } = ctx.request.body
  try {
    const user = new User({
      user_name: userName,
      password: passwd
    })
    await user.save()

    ctx.body = {
      code: 200,
      message: '注册成功！'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error.message
    }
  }
})

// 获取用户信息
authRouter.post('/userinfo', async ctx => {
  const user = await base.checkToken(ctx, User, true)
  ctx.body = {
    code: 200,
    message: '获取用户信息成功！',
    userName: user.user_name,
    token: base.signToken(user)
  }

  /*
  const token = await base.checkToken(ctx, User)
  ctx.body = {
    token: token
  }
  */
})

authRouter.post('/changePassword', async ctx => {
  const user = await User.findByName(ctx.request.body.userName)
  if (!user) {
    ctx.body = {
      code: 200,
      message: '没有这个用户'
    }
  } else {
    const password = ctx.request.body.password
    user.password = password
    user.save()
    ctx.body = {
      code: 200,
      message: '修改密码成功！',
      userName: user.user_name,
      token: base.signToken(user)
    }
  }
})

router.use(logger())

router.use(apiRouter.routes(), apiRouter.allowedMethods())
router.use(authRouter.routes(), authRouter.allowedMethods())

module.exports = router
