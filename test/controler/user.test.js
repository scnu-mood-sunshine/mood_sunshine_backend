'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')
const User = require('../../api/models/user')

describe('Controller: User', () => {
  it('Action: login', async () => {
    const result = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)

    assert(result.body.code === 200)
  })
  it('Action: register', async () => {
    const username = Math.random().toString(36).substr(2)
    const result = await request
      .post('/api/v1/register')
      .send({
        user_name: username,
        password: username,
        nickname: username,
        avatar: username
      })

    assert(result.body.code === 200)
  })
  it.skip('Action: changePassword', async () => {
    const result = await request
      .post('/api/v1/changePassword')
      .send({
        user_name: 'aaa',
        password: '123456'
      })
      .expect(200)
    assert(result.body.code === 200)
    const user = await User.findByName('aaa')
    assert(user.comparePassword('123456'))
    await request
      .post('/api/v1/changePassword')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
  })
  it('Action: userinfo', async () => {
    const user = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)

    const result = await request
      .get('/api/auth/user')
      .set({ Authorization: 'Bearer ' + user.body.token })
      .expect(200)

    assert(result.body.data.user_name === 'aaa')
  })
})
