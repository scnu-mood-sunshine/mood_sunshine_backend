'use strict'

/** 用户心情统计表 */
const mongoose = require('mongoose')

const UserMoodSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // 用户ID
  mood_type: { type: String, require: true }, // 心情类别
  mood_name: { type: String, require: true }, // 心情名
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

UserMoodSchema.index({ user_id: 1, create_at: -1 })

module.exports = mongoose.model('UserMood', UserMoodSchema)
