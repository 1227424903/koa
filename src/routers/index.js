// 主路由
const api = require('./api')
const error = require('./error')

const router = require('koa-router')()

router.use('/api', api.routes(), api.allowedMethods())
router.use('/', error.routes(), error.allowedMethods())// 一定放在最后
module.exports = router
