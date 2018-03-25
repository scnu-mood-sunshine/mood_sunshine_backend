const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// banner 数据模型对应位置
const BannerFeatureSchema = new mongoose.Schema({
  banner: { type: ObjectId, ref: 'Banner' }, // 关联banner
  features: { type: Number, required: true }, // banner功能
  describe: { type: Number, required: true } // 功能描述
})

module.exports = mongoose.model('BannerFeature', BannerFeatureSchema)
