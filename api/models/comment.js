const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // 评论用户id
  to_post_id: { type: String, default: '' }, // 被评论文章的id
  to_user_id: { type: String, default: '' }, // 被评论用户的id
  compiled_content: { type: String }, // 评论内容
  floor: { type: Number }, // 评论楼层
  in_use: { type: Boolean, default: true }, // 是否可用
  create_at: { type: Date, default: Date.now() },
  owner: { // 评论者信息
    user_id: { type: String, required: true }, // id
    nickname: { type: String, required: true }, // 昵称
    avatar: { type: String, required: true }, // 头像
    badge: { type: Array }, // 徽章
    level: { type: Number }, // 等级
    mood_tags: { type: Array } // 心情标签(评论时的心情)
  },
  count: { // 相关计数
    reply: { type: Number, default: 0 }, // 回复数
    like: { type: Number, default: 0 }, // 点赞数
    mood_get: { type: Number, default: 0 } // 获得心情数
  },
  children: [{ // 子评论
    compiled_content: { type: String }, // 评论内容
    create_at: { type: Date, default: Date.now() }, // 创建时间
    parent_id: { type: String }, // 回复楼层
    user_id: { type: String, required: true }, // 用户id
    mood_tags: { type: Array }, // 心情标签(评论时的心情)
    user: { // 子回复用户信息
      user_id: { type: String, required: true }, // 用户id
      nickname: { type: String, required: true } // 用户昵称
    }
  }]
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

CommentSchema.index({ create_at: -1 })

module.exports = mongoose.model('Comment', CommentSchema)
