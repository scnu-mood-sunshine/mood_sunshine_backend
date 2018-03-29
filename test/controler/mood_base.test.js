'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')
const MoodBaseModel = require('../../api/models/mood_base')

describe('Controller: moodBase', () => {
  let login = null
  const moodBaseName = Math.random().toString(36).substr(2)
  let moodBase = null
  before('login', async () => {
    login = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)
  })
  it('Action: createmoodBase', async () => {
    const result = await request
      .post('/api/auth/moodBase')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        name: moodBaseName,
        avatar: 'no picture',
        describe: '好心情不用解释!',
        mood_type: '好心情'
      })
      .expect(200)

    moodBase = await MoodBaseModel.findOne({ name: moodBaseName })
    assert(moodBase.name === moodBaseName)
    assert(result.body.code === 201)
  })
  it('Action: deletemoodBase', async () => {
    const result = await request
      .delete('/api/auth/moodBase/' + moodBase.id)
      .set({ Authorization: 'Bearer ' + login.body.token })
      .expect(200)

    assert(result.body.code === 200)
  })
})
