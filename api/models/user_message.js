const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const UserMessageSchema = new mongoose.Schema({
  _id: { tyep: ObjectId, ref: 'User' }, // 主键与用户Id相同
  favour: { type: Array } // 爱好
})

const UserMessage = mongoose.model('UserMessage', UserMessageSchema)

module.exports = UserMessage
