const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const MoodTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 类别名(好心情，坏心情，一般心情)
  avatar: { type: String, required: true }, // 相关图片
  describe: { type: String, required: true }, // 描述
  Thesaurus: [{ type: ObjectId, ref: 'MoodBase' }], // 心情词库，关联心情基本信息
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

module.exports = mongoose.model('MoodType', MoodTypeSchema)
