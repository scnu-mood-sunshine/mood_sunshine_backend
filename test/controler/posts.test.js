'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')

describe('Controller: Post', () => {
  let login = null
  let newPostId = null
  before('login', async () => {
    login = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)
  })
  it('Action: createNewPost', async () => {
    const result = await request
      .post('/api/auth/posts')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        title: Math.random().toString(36).substr(2),
        avatar: Math.random().toString(36).substr(2),
        introduction: Math.random().toString(36).substr(2),
        content: 'content',
        tags: []
      })
      .expect(200)
    newPostId = result.body.data.post_id
    assert(result.body.code === 200)
  })
  it('Action: getPostDetail', async () => {
    const result = await request
      .get('/api/v1/posts/' + newPostId)
      .expect(200)

    assert(result.body.data.content === `content`)
  })
  it('Action: getPostList', async () => {
    const result = await request
      .get('/api/v1/posts?page=1&limit=10')
      .expect(200)

    assert(result.body.data.length <= 10)
  })
  it('Action: deletePost', async () => {
    const result = await request
      .delete('/api/auth/posts/' + newPostId)
      .set({ Authorization: 'Bearer ' + login.body.token })
      .expect(200)

    assert(result.body.code === 200)
  })
})
