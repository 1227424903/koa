// error 自路由
const router = require('koa-router')()

router.get('*', (ctx) => {
  ctx.body = '拒绝访问！'

}).post('*', (ctx) => {
  ctx.body = '{code:-2}'
})

module.exports = router
