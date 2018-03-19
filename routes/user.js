'use strict'

const UserController = require('../api/controllers/user')

module.exports = (router, authRouter, commonRouter) => {
  // 登录
  commonRouter.post('/login', UserController.login)
  // 注册
  commonRouter.post('/register', UserController.register)
  // 获取用户信息
  authRouter.get('/userinfo', UserController.getUserInfo)
  // 修改密码
  commonRouter.post('/changePassword', UserController.changePassword)
}
