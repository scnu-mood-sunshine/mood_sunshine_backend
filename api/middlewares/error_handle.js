'use strict'

// 全局错误捕捉
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message
      }
    }
  }
}