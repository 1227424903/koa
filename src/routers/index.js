// 主路由
const user = require('./user')
const video = require('./video')
const error = require('./error')

const router = require('koa-router')()

router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/video', video.routes(), video.allowedMethods())
router.use('/', error.routes(), error.allowedMethods())// 一定放在最后
module.exports = router
