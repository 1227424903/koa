// 接口相关子路由
const router = require('koa-router')()
const apiCtrl = require('./../controllers/api')

const routers = router
.post('/login',apiCtrl.login)
.post('/register',apiCtrl.register)
.post('/loginout',apiCtrl.loginout)
.post('/video',apiCtrl.addvideo)
.delete('/video',apiCtrl.delvideo)

module.exports = routers
