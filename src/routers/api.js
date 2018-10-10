// 接口相关子路由
const router = require('koa-router')()
const apiCtrl = require('./../controllers/api')

const routers = router
.post('/login.json',apiCtrl.login)
.post('/register.json',apiCtrl.register)

module.exports = routers
