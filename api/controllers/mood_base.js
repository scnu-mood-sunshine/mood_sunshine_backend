'use strict'

const MoodBaseModel = require('../models/mood_base')
const MoodTypeModel = require('../models/mood_type')

/** 添加一个心情基本信息 */
const createMoodBaseMess = async ctx => {
  // 检查是否为管理员
  if (ctx.state.userMessage.manager_level < 1) {
    ctx.throw(403, '权限不足')
  }
  ctx.verifyParams({
    name: 'string',
    avatar: 'string',
    describe: 'string',
    mood_type: 'string'
  })
  // 检查是否拥有对应的心情类别
  const moodBase = new MoodBaseModel(ctx.request.body)
  const moodType = await MoodTypeModel.findByName(moodBase.mood_type)
  if (!moodType) {
    ctx.throw(400, '心情类型不匹配')
  }
  moodType.thesaurus.push({
    id: moodBase._id,
    name: moodBase.name,
    avatar: moodBase.avatar,
    describe: moodBase.describe,
    create_at: moodBase.create_at
  })
  await moodBase.save()
  await moodType.save()
  ctx.body = {
    code: 201,
    message: '心情信息添加成功'
  }
}

const deleteMoodBase = async ctx => {
  // 检查是否为管理员
  if (ctx.state.userMessage.manager_level < 1) {
    ctx.throw(403, '权限不足')
  }
  const moodBase = await MoodBaseModel.findById(ctx.params.id)
  await MoodTypeModel.updateOne(
    { name: moodBase.mood_type },
    {
      $pull: {
        thesaurus: { id: moodBase.id }
      }
    }
  )
  await MoodBaseModel.deleteOne({ _id: ctx.params.id })
  ctx.body = {
    code: 200,
    message: '心情信息删除成功'
  }
}

module.exports = {
  createMoodBaseMess,
  deleteMoodBase
}
