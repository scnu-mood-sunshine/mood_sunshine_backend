'use strict'

const userMoodController = require('../api/controllers/user_mood')
const moodTypeController = require('../api/controllers/mood_type')
const moodBaseController = require('../api/controllers/mood_base')

module.exports = (router, authRouter, commonRouter) => {
  /** 心情类别 */
  // 创建心情类别
  authRouter.post('/moodtype', moodTypeController.createMoodType)
  // 获取所有心情类别
  authRouter.get('/moodtype', moodTypeController.getMoodTypeList)
  // 根据id查看类别数据
  authRouter.get('/moodtype/:mood_type_id', moodTypeController.getMoodTypeById)
  // 删除心情类别数据
  authRouter.delete('/moodtype', moodTypeController.deleteMoodType)

  /** 心情信息 */
  // 添加一个心情词信息
  authRouter.post('/moodbase', moodBaseController.createMoodBaseMess)
  // 删除心情词信息
  authRouter.delete('/moodbase/:id', moodBaseController.deleteMoodBase)

  /** 用户心情 */
  // 添加一个新的用户心情
  authRouter.post('/usermood', userMoodController.createNewMood)
  // 获取当前用户某天的心情列表
  authRouter.post('/usermoodlist', userMoodController.getMoodByDay)
  // 更新某一条心情
  authRouter.put('/usermood', userMoodController.updateMood)

  /** 文章心情 */
  // 获取属于某篇文章心情统计
  commonRouter.get('/postmoodtotal/:post_id', userMoodController.getPostMoodTotal)
}
