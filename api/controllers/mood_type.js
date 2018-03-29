'use strict'

/** 心晴类别表 */
const MoodTypeModel = require('../models/mood_type')
const _ = require('lodash')

/** 获取类别信息 */
const getMoodTypeById = async ctx => {
  const moodType = await MoodTypeModel.findById(ctx.params.mood_type_id)
  ctx.body = {
    code: 200,
    data: _.omit(moodType, ['update_at'])
  }
}

/** 获取类别列表 */
const getMoodTypeList = async ctx => {
  const moodTypes = await MoodTypeModel.find({}).sort({ update_at: -1 })
  const data = _.chain(moodTypes)
    .map(o => {
      _.omit(o, ['thesaurus'])
    })
    .value()

  ctx.body = {
    code: 200,
    data: data
  }
}

/** 添加一个类别 */
const createMoodType = async ctx => {
  if (ctx.state.userMessage.manager_level < 1) {
    ctx.throw(403, '权限不足')
  }
  ctx.verifyParams({
    name: 'string',
    avatar: 'string',
    describe: 'string'
  })
  const moodType = new MoodTypeModel(ctx.request.body)
  await moodType.save()
  ctx.body = {
    code: 201,
    message: '类别添加成功！'
  }
}

/** 删除一个类别 */
const deleteMoodType = async ctx => {
  if (ctx.state.userMessage.manager_level < 1) {
    ctx.throw(403, '权限不足')
  }
  await MoodTypeModel.deleteOne({ name: ctx.query.name })
  ctx.body = {
    code: 200,
    message: '删除类别成功！'
  }
}

module.exports = {
  getMoodTypeById,
  getMoodTypeList,
  createMoodType,
  deleteMoodType
}
