const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
  avatar: { type: String, required: true }, // banner图url
  url: { type: String }, // 跳转url
  location: { type: Number, required: true }, // banner位置
  features: { type: Number, required: true }, // banner功能
  begin_time: { type: Date, required: true }, // 开始时间
  expiration: { type: Date, required: true }, // 结束时间
  create_at: { type: Date, required: true } // 创建时间
})

module.exports = mongoose.model('Banner', BannerSchema)
