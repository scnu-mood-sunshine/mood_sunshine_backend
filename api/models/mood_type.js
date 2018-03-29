const mongoose = require('mongoose')

const MoodTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 类别名(好心情，坏心情，一般心情)
  avatar: { type: String, required: true }, // 相关图片
  describe: { type: String, required: true }, // 描述
  thesaurus: [{
    id: { type: String, required: true }, // 心情id
    name: { type: String, required: true }, // 心情名
    avatar: { type: String, required: true }, // 相关图片
    describe: { type: String, required: true }, // 描述
    create_at: { type: Date } // 创建时间
  }], // 心情词库，关联心情基本信息
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

MoodTypeSchema.index({ name: -1 })

MoodTypeSchema.pre('update', async function (next) {
  try {
    this.update({}, { $set: { update_at: Date.now() } })
  } catch (err) {
    return next(err)
  }
})

MoodTypeSchema.statics.findByName = async function (moodTypeName) {
  const moodType = await this.findOne({
    name: moodTypeName
  })
  return moodType
}

module.exports = mongoose.model('MoodType', MoodTypeSchema)
