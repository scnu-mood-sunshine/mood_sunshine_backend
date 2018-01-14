'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')
const User = require('../../api/models/user')

describe('User', () => {
  it('changePassword', async () => {
    const result = await request
      .post('/api/v1/changePassword')
      .send({
        userName: 'aaa',
        password: '123456'
      })
      .expect(200)
    assert(result.body.code === 200)
    const user = await User.findByName('aaa')
    assert(user.comparePassword('123456'))
    await request
      .post('/api/v1/changePassword')
      .send({
        userName: 'aaa',
        password: 'aaa'
      })
  })
  it('userinfo', async () => {
    const user = await request
      .post('/api/login')
      .send({
        userName: 'aaa',
        passwd: 'aaa'
      })
      .expect(200)

    const result = await request
      .post('/api/userinfo')
      .set({ Authorization: 'Bearer ' + user.body.token })
      .expect(200)

    assert(result.body.userName === 'aaa')
  })
})
