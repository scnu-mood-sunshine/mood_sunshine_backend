'use strict'
const { request } = require('../bootstrap.test')
const assert = require('power-assert')
const UserMoodModel = require('../../api/models/user_mood')

describe('Controller: userMood', () => {
  let login = null
  const userMoodName = Math.random().toString(36).substr(2)
  const sentence = Math.random().toString(36).substr(2)
  let userMood = null
  before('login', async () => {
    login = await request
      .post('/api/v1/login')
      .send({
        user_name: 'aaa',
        password: 'aaa'
      })
      .expect(200)
  })
  it('Action: createUserMood', async () => {
    const result = await request
      .post('/api/auth/usermood')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        sentence: sentence,
        mood_name: userMoodName,
        mood_type: '好心情'
      })
      .expect(200)

    userMood = await UserMoodModel.findOne({ mood_name: userMoodName })
    assert(userMood.sentence === sentence)
    assert(result.body.code === 201)
  })
  it('Action: updateUserMood', async () => {
    const newUserMoodName = Math.random().toString(36).substr(2)
    const newSentence = Math.random().toString(36).substr(2)
    const result = await request
      .put('/api/auth/userMood')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        mood_id: userMood.id,
        mood_name: newUserMoodName,
        sentence: newSentence
      })
      .expect(200)

    userMood = await UserMoodModel.findById(userMood.id)
    assert(userMood.sentence === newSentence)
    assert(result.body.code === 200)
  })
  it('Action: getMoodByDay', async () => {
    const date = Date.now()
    const result = await request
      .post('/api/auth/usermoodlist')
      .set({ Authorization: 'Bearer ' + login.body.token })
      .send({
        date: date
      })
      .expect(200)

    assert(Array.isArray(result.body.data))
  })
  it('Action: getPostMoodTotal', async () => {
    const result = await request
      .get('/api/v1/postmoodtotal/5abd37168edfc177a4589779')
      .expect(200)
    assert(result.body.code === 200)
    assert(Array.isArray(result.body.data))
  })
})
