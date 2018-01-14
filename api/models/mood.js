const mongoose = require('mongoose')

const MoodSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 心情名
  avatar: { type: String, required: true }, // 相关图片
  describe: { type: String, required: true }, // 描述
  proverb: { type: Array }, // 运营励志语
  // value: {}, // 相关科学计数值
  count: {
    times: { type: Number } // 出现次数
  }, // 计数值
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

module.exports = mongoose.model('Mood', MoodSchema)
