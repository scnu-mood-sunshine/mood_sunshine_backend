'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')
const MoodTypeModel = require('../../api/models/mood_type')

describe('Controller: moodType', () => {
  let login = null
  const moodTypeName = Math.random().toString(36).substr(2)
  before('login', async () => {
    login = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)
  })
  it('Action: getMoodType', async () => {
    const result = await request
      .get('/api/auth/moodtype/5abd04d066169c501b28e9b4')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .expect(200)

    assert(result.body.data.name === '好心情')
  })
  it('Action: getMoodTypeList', async () => {
    const result = await request
      .get('/api/auth/moodtype')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .expect(200)

    assert(result.body.code === 200)
  })
  it('Action: createMoodType', async () => {
    const result = await request
      .post('/api/auth/moodtype')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        name: moodTypeName,
        avatar: 'no picture',
        describe: '好心情不用解释!'
      })
      .expect(200)

    const moodtype = await MoodTypeModel.findOne({ name: moodTypeName })
    assert(moodtype.name === moodTypeName)
    assert(result.body.code === 201)
  })
  it('Action: deleteMoodType', async () => {
    const result = await request
      .delete('/api/auth/moodtype?name=' + moodTypeName)
      .set({ Authorization: 'Bearer ' + login.body.token })
      .expect(200)

    assert(result.body.code === 200)
  })
})
