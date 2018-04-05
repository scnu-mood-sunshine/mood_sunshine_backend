'use strict'

const PostController = require('../api/controllers/posts')

module.exports = (router, authRouter, commonRouter) => {
  // 新建文章
  authRouter.post('/posts', PostController.createNewPost)
  // 获取文章详情
  commonRouter.get('/posts/:post_id', PostController.getPostDetail)
  // 获取文章列表
  commonRouter.get('/posts', PostController.getPostList)
  // 获取当前用户文章列表
  authRouter.get('/userposts', PostController.getOwnPostList)
  // 删除文章
  authRouter.delete('/posts/:post_id', PostController.deletePost)
}
