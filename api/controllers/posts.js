'use strict'

const PostModel = require('../models/post')
const _ = require('lodash')

/** 创建新文章 */
const createNewPost = async ctx => {
  ctx.verifyParams({
    title: 'string',
    avatar: { type: 'string', require: false },
    content: 'string',
    introduction: 'string'
  })
  ctx.request.body.owner = ctx.state.userBaseMessage
  const post = new PostModel(ctx.request.body)
  await post.save()
  ctx.body = {
    code: 200,
    message: 'create success',
    data: {
      post_id: post._id
    }
  }
}

/** 删除文章 */
const deletePost = async ctx => {
  const postId = ctx.params.post_id
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
}

/** 获取文章详情 */
const getPostDetail = async ctx => {
  const postId = ctx.params.post_id
  const postDetail = _.omit(await PostModel.findById(postId), ['in_use'])
  ctx.body = {
    code: 200,
    data: postDetail
  }
}

/** 获取公众文章列表 */
const getPostList = async ctx => {
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
        id: o.id,
        title: o.title,
        avatar: o.avatar,
        introduction: o.introduction,
        tags: o.tags,
        author: {
          name: o.owner.nickname,
          id: o.owner.id,
          avatar: o.owner.avatar
        },
        create_at: o.create_at,
        views: o.count.view,
        mood_get: o.count.mood_get
      }
    })
    .value()

  ctx.body = {
    code: 200,
    message: '获取文章列表成功',
    data: result
  }
}

/** 获取当前用户的文章列表 */
const getOwnPostList = async ctx => {
  const page = Number(ctx.query.page) || 1
  const limit = Number(ctx.query.limit) || 12

  const postList = await PostModel.find({
    'owner.user_id': ctx.state.userBaseMessage.user_id
  })
    .sort({ update_at: -1 })
    .skip((page - 1) * limit)
    .limit(8)

  const result = _.chain(postList)
    .map(o => {
      return {
        id: o.id,
        title: o.title,
        avatar: o.avatar,
        introduction: o.introduction,
        tags: o.tags,
        author: {
          name: o.owner.nickname,
          id: o.owner.id,
          avatar: o.owner.avatar
        },
        create_at: o.create_at,
        update_at: o.update_at,
        views: o.count.view,
        mood_get: o.count.mood_get
      }
    })
    .value()
  ctx.body = {
    code: 200,
    message: '获取当前用户文章成功',
    data: result
  }
}

module.exports = {
  getPostDetail,
  createNewPost,
  deletePost,
  getPostList,
  getOwnPostList
}
