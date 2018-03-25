'use strict'

const PostModel = require('../models/post')
const _ = require('lodash')

/** 创建新文章 */
const createNewPost = async ctx => {
  try {
    ctx.verifyParams({
      title: 'string',
      avatar: { type: 'string', require: false },
      content: 'string'
    })
    ctx.request.body.owner = ctx.state.userBaseMessage
    const post = new PostModel(ctx.request.body)
    post.save()
    ctx.body = {
      code: 200,
      message: 'create success',
      data: {
        post_id: post._id
      }
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error.message
    }
  }
}

/** 删除文章 */
const deletePost = async ctx => {
  try {
    const postId = ctx.params.postId
    const post = await PostModel.findById(postId)
    const contentUser = ctx.state.userMessage
    if (post.owner.user_id === contentUser.id || contentUser.manager_level > 0) {
      await PostModel.updateOne({ _id: postId }, { in_use: false })
      ctx.body = {
        code: 200,
        message: '删除成功！'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '您无法做这个事情噢！'
      }
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error.message
    }
  }
}

/** 获取文章详情 */
const getPostDetail = async ctx => {
  try {
    const postId = ctx.params.postId
    const postDetail = _.omit(await PostModel.findById(postId), ['in_use'])
    ctx.body = {
      code: 200,
      data: postDetail
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error.message
    }
  }
}

/** 获取公众文章列表 */
const getPostList = async ctx => {
  try {
    const page = Number(ctx.query.page) || 1
    const limit = Number(ctx.query.limit) || 12
    const opt = {
      in_use: true
    }
    const sortObj = {
      create_at: -1,
      hot: -1
    }

    const postList = await PostModel
      .find(opt)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
    const result = _.chain(postList)
      .map(o => {
        return {
          title: o.title,
          avatar: o.avatar,
          introduction: o.introduction,
          tags: o.tags,
          owner: o.owner.nickname,
          create_at: o.create_at
        }
      })
      .value()

    ctx.body = {
      code: 200,
      message: '获取文章列表成功',
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
}
module.exports = {
  getPostDetail,
  createNewPost,
  deletePost,
  getPostList
}
