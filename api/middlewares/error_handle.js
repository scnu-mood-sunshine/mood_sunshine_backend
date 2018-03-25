'use strict'

// 全局错误捕捉
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.throw(err.status, error.message)
    }
  }
}