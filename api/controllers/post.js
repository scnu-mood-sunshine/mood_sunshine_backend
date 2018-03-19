'use strict'

const postModel = require('../models/post')

/** 获取文章详情 */
const getPostDetail = async (ctx) => {
  const postId = ctx.params.postId
  const postDetail = await postModel.findById(postId)
  ctx.body = {
    code: 200,
    postDetail
  }
}

module.exports = {
  getPostDetail
}
