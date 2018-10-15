// 接口相关子路由
const router = require('koa-router')()
const apiCtrl = require('./../controllers/user')

const routers = router
.post('/login',apiCtrl.login)
.post('/register',apiCtrl.register)
.post('/loginout',apiCtrl.loginOut)

module.exports = routers
