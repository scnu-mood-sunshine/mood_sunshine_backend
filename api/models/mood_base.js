const mongoose = require('mongoose')

const MoodBaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 心情名
  avatar: { type: String, required: true }, // 相关图片
  describe: { type: String, required: true }, // 描述
  mood_type: { type: String, required: true }, // 心情类别
  create_at: { type: Date, default: Date.now() }, // 创建时间
  update_at: { type: Date, default: Date.now() } // 更新时间
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

MoodBaseSchema.index({ name: -1 })

MoodBaseSchema.pre('update', async function (next) {
  try {
    this.update({}, { $set: { update_at: Date.now() } })
  } catch (err) {
    return next(err)
  }
})

MoodBaseSchema.statics.findByName = async function (moodName) {
  const moodType = await this.findOne({
    name: moodName
  })
  return moodType
}

module.exports = mongoose.model('MoodBase', MoodBaseSchema)
