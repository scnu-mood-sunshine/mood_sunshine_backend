'use strict'

/** 用户心情记录表 */
const mongoose = require('mongoose')

const UserMoodSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // 用户ID
  sentence: { type: String, default: '' }, // 判断心情的句子
  toPost: { type: String, default: '' }, // 针对文章的心情
  toComment: { type: String, default: '' }, // 针对评论的心情
  mood_type: { type: String, required: true }, // 心情类别
  mood_name: { type: String, required: true }, // 心情名
  create_at: { type: Date, default: Date.now() } // 创建时间
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

UserMoodSchema.indexes({ user_id: 1, create_at: -1 })
UserMoodSchema.indexes({ toPost: -1 })
UserMoodSchema.indexes({ toComment: -1 })

UserMoodSchema.pre('update', async function (next) {
  try {
    this.update({}, { $set: { create_at: Date.now() } })
  } catch (err) {
    return next(err)
  }
})

module.exports = mongoose.model('UserMood', UserMoodSchema)
