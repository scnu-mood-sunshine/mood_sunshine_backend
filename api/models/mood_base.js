const mongoose = require('mongoose')

const MoodBaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 心情名
  avatar: { type: String, required: true }, // 相关图片
  describe: { type: String, required: true }, // 描述
  proverb: { type: Array }, // 运营励志语
  mood_type: { type: Number }, // 心情类别
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

module.exports = mongoose.model('MoodBase', MoodBaseSchema)
