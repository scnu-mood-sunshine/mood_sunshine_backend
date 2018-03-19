// 'use strict'
// const { request } = require('../bootstrap.test')
// const assert = require('power-assert')

// describe('Controller: SnowFlakeController', () => {
//   const agent = request.agent()
//   describe('Action: create', () => {
//     it('should creste many different ids', (done) => {
//       request.get('/api/snowflake')
//         .end((err, res) => {
//           if (err) console.log(err.message)
//           let p1 = Math.floor(Math.random() * 52)
//           let p2 = Math.floor(Math.random() * 52)
//           while (p1 === p2) {
//             p2 = Math.floor(Math.random() * 52)
//           }
//           res.body.data.length.should.equal(52)
//           res.body.data[p1].should.not.equal(res.body.data[p2])
//           done(err)
//         })
//     })
//   })
// })
