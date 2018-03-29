const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // 文章标题
  avatar: { type: String }, // 封面图片
  introduction: { type: String, required: true }, // 文章简介
  content: { type: String, required: true }, // 主要内容
  tags: { type: Array }, // 相关标签
  mood_tags: { type: Array }, // 心情标签(写文章时的心情)
  in_use: { type: Boolean, default: true }, // 是否可用(对于公众)
  hidden: { type: Boolean, default: false }, // 是否隐藏(对于作者)
  owner: {
    user_id: { type: String }, // 作者id
    avatar: { type: String }, // 作者头像
    nickname: { type: String }, // 作者昵称
    badge: { type: Array }, // 作者徽章(备用)
    level: { type: Number } // 作者等级
  },
  count: {
    view: { type: Number, default: 0 }, // 阅览数
    mood_get: { type: Number, default: 0 }, // 获得心情数
    like: { type: Number, default: 0 }, // 点赞数
    comment: { type: Number, default: 0 }, // 评论数
    words: { type: Number, default: 0 }, // 字数
    share: { type: Number, default: 0 }, // 分享数
    appreciate: { type: Number, default: 0 } // 赞赏数
  },
  hot: { type: Number, default: 0 }, // 文章热度值
  create_at: { type: Date, default: Date.now() }, // 创建时间
  update_at: { type: Date, default: Date.now() } // 最新编辑时间
},
{
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

PostSchema.index({ create_at: -1 })

module.exports = mongoose.model('Post', PostSchema)
