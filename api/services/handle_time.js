'use strict'

/**
 * 判断心情创建时间与当前时间的间隔
 * @param {Date} moodDate 心情创建的时间对象
 * @param {number} interval 时间间隔每小时
 */
function judgeMoodDate (moodDate, interval) {
  return Date.now() - moodDate < interval * 3600 * 1000
}

/**
 * 获取日期字符串 ‘2018-03-12’
 * @param {Date} date 日期时间戳
 */
function getDayByDate (date) {
  return date.toLocaleString().split(' ')[0]
}

module.exports = {
  judgeMoodDate,
  getDayByDate
}
