'use strict'

/** 用户心晴记录 */
const UserMoodModel = require('../models/user_mood')
const { judgeMoodDate, getDayByDate } = require('../services/handle_time')
const nconf = require('nconf')
const _ = require('lodash')

/** 创建一条心情 */
const createNewMood = async ctx => {
  ctx.verifyParams({
    mood_name: 'string',
    sentence: { type: 'string', require: false }
  })
  const body = ctx.body
  body.user_id = ctx.state.userBaseMessage.user_id
  const mood = new UserMoodModel(body)
  mood.save()
  ctx.body = {
    code: 201,
    message: '加了一条新的心情！'
  }
}

/** 更新某条心情 */
const updateMood = async ctx => {
  ctx.verifyParams({
    mood_id: 'string',
    mood_name: 'string',
    sentence: { type: 'string', require: false }
  })
  const body = ctx.body
  const mood = await UserMoodModel.findById(body.mood_id)
  if (!judgeMoodDate(mood.create_at, nconf.get('mood_validity_period'))) {
    ctx.throw(400, '心情已经定格了，过了这么久就别改了吧～')
  }
  await UserMoodModel.findOneAndUpdate({ _id: body.mood_id }, {
    mood_name: body.mood_name,
    sentence: body.sentence
  })
  ctx.body = {
    code: 200,
    message: '心情修改成功！'
  }
}

/** 获取当前用户某日的心情 */
const getMoodByDay = async ctx => {
  ctx.verifyParams({
    date: 'int'
  }, ctx.query)
  const clientTime = new Date(ctx.query.date)
  const clientDate = new Date(getDayByDate(clientTime))

  const moods = await UserMoodModel.find({
    user_id: ctx.state.userBaseMessage.user_id,
    create_at: {
      $gte: clientDate,
      $lte: clientDate.valueOf() + 24 * 3600 * 1000
    }
  })
  ctx.body = {
    code: 200,
    data: _.omit(moods, ['user_id'])
  }
}

module.exports = {
  createNewMood,
  updateMood,
  getMoodByDay
}
