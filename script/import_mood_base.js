require('../config/nconf')
require('../config/mongoose')
const fs = require('fs')
const path = require('path')
const MoodBaseModel = require('../api/models/mood_base')
const MoodTypeModel = require('../api/models/mood_type')
const _ = require('lodash')

const goodMoodPath = path.join(__dirname, '../data/负面评价词语（中文）.txt')

/**
 * 插入
 * @param {array} goodmoods 
 */
async function insertMoodBase(goodmoods) {
  const goodMoodType = await MoodTypeModel.findByName('坏心情')
  for (let item of goodmoods) {
    const data = {
      name: item,
      avatar: 'no picture',
      describe: 'no describe',
      mood_type: goodMoodType.name
    }
    if (_.isEmpty(data.name)) {
      continue
    }
    const sameBase = await MoodBaseModel.findByName(data.name)
    if (sameBase) {
      continue
    }
    const moodBase = new MoodBaseModel(data)
    goodMoodType.thesaurus.push({
      id: moodBase._id,
      name: moodBase.name,
      avatar: moodBase.avatar,
      describe: moodBase.describe,
      create_at: moodBase.create_at
    })
    await moodBase.save()
    await goodMoodType.save()
  }
  console.log(goodMoodType)
  return
}

async function initMoodType() {
  await MoodTypeModel.updateOne({name: '好心情'}, {thesaurus: []})
  return
}

fs.readFile(goodMoodPath, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  }
  const goodMoods = data.toString().split('\n').slice(2)
  insertMoodBase(goodMoods)
  // initMoodType()
})
