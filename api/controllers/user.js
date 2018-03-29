const User = require('../models/user')
const base = require('../services/base')

const login = async ctx => {
  ctx.verifyParams({
    user_name: 'string',
    password: 'string'
  })
  const user = await User.findByName(ctx.request.body.user_name)
  if (!user) {
    ctx.throw(423, '用户不存在')
  }
  const isMatch = await user.comparePassword(ctx.request.body.password)
  if (!isMatch) {
    ctx.throw(423, '用户名或密码错误！')
  }
  const token = base.signToken(user)
  ctx.body = {
    code: 200,
    message: '登录成功!',
    token: token
  }
}

const register = async ctx => {
  ctx.verifyParams({
    user_name: 'string',
    password: 'string',
    avatar: 'string',
    nickname: 'string'
  })
  const body = ctx.request.body
  const user = new User({
    user_name: body.user_name,
    password: body.password,
    avatar: body.avatar,
    nickname: body.nickname
  })
  await user.save()

  ctx.body = {
    code: 200,
    message: '注册成功！'
  }
}

const getUserInfo = async ctx => {
  if (ctx.state.userMessage) {
    const user = ctx.state.userMessage
    ctx.body = {
      code: 200,
      message: '获取用户信息成功！',
      data: ctx.state.userBaseMessage,
      token: base.signToken(user)
    }
  } else {
    ctx.body = {
      code: 404,
      message: '没有此用户信息！'
    }
  }
}

// const changePassword = async ctx => {
//   try {
//     const user = await User.findByName(ctx.request.body.userName)
//     if (!user) {
//       ctx.body = {
//         code: 404,
//         message: '没有这个用户'
//       }
//     } else {
//       const password = ctx.request.body.password
//       if (user.comparePassword(password)) {
//         user.password = password
//         user.save()
//         ctx.body = {
//           code: 200,
//           message: '修改密码成功！',
//           userName: user.user_name,
//           token: base.signToken(user)
//         }
//       } else {
//         ctx.body = {
//           code: 400,
//           message: '旧密码不对兄dei'
//         }
//       }
//     }
//   } catch (error) {
//     ctx.throw(500, error.message)
//   }
// }

module.exports = {
  login,
  register,
  getUserInfo
  // changePassword
}
