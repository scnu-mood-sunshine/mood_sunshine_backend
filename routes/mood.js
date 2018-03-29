'use strict'

const userMoodController = require('../api/controllers/user_mood')
const moodTypeController = require('../api/controllers/mood_type')
const moodBaseController = require('../api/controllers/mood_base')

module.exports = (router, authRouter, commonRouter) => {
  /** 心情类别 */
  authRouter.post('/moodtype', moodTypeController.createMoodType)
  authRouter.get('/moodtype', moodTypeController.getMoodTypeList)
  authRouter.get('/moodtype/:mood_type_id', moodTypeController.getMoodTypeById)
  authRouter.delete('/moodtype', moodTypeController.deleteMoodType)

  /** 心情信息 */
  authRouter.post('/moodbase', moodBaseController.createMoodBaseMess)
  authRouter.delete('/moodbase/:id', moodBaseController.deleteMoodBase)
  /** 用户心情 */
  authRouter.post('/usermood', userMoodController.createNewMood)
  authRouter.post('/usermood', userMoodController.getMoodByDay)
  authRouter.put('/usermood', userMoodController.updateMood)
}
