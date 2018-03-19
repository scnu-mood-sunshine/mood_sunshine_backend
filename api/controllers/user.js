const User = require('../models/user')
const base = require('../services/base')

const login = async ctx => {
  const { userName, password } = ctx.request.body
  try {
    const user = await User.findByName(userName)
    if (!user) {
      ctx.throw(423, '用户不存在')
    }
    const isMatch = await user.comparePassword(password)
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
}

const register = async ctx => {
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
}

const getUserInfo = async ctx => {
  try {
    if (ctx.state.userMassage) {
      const user = ctx.state.userMassage
      ctx.body = {
        code: 200,
        message: '获取用户信息成功！',
        userName: user.user_name,
        token: base.signToken(user)
      }
    } else {
      ctx.body = {
        code: 404,
        message: '没有此用户信息！'
      }
    }
  } catch (error) {
    ctx.throw(500, error.message)
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
