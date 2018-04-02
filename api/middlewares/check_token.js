'use strict'

const User = require('../models/user')

// 检查token
module.exports = () => {
  return async (ctx, next) => {
    try {
      const token = ctx.state.user
      if (token) {
        const user = await User.checkToken(token)
        if (user) {
          ctx.state.userBaseMessage = {
            user_name: user.user_name,
            user_id: user.id,
            nickname: user.nickname,
            sign: user.sign,
            avatar: user.avatar,
            level: user.level,
            badge: user.badge,
          }
          ctx.state.userMessage = user
          await next()
        } else {
          ctx.throw(501, 'token信息异常')
        }
      } else {
        ctx.throw(401, 'token丢失')
      }
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
}
