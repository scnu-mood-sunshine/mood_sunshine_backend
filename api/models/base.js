const jwt = require('jsonwebtoken')
const nconf = require('nconf')

// 生成token
function signToken (user) {
  const token = jwt.sign(
    {
      id: user.id,
      secret: user.app_secret
    },
    nconf.get('jwt_secret'),
    { expiresIn: 3600 }
  )
  return token
}

// 检查并更新token
async function checkToken (ctx, User, getUser) {
  const token = ctx.state.user // 获取jwt
  if (token) {
    const user = await User.checkToken(token)
    if (user) {
      if (getUser) {
        return user
      } else {
        return this.signToken(user)
      }
    } else {
      ctx.throw(501, 'token信息异常')
    }
  } else {
    ctx.throw(401, 'token丢失')
  }
}

module.exports = {
  signToken,
  checkToken
}
