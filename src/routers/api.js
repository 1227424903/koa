// 接口相关子路由
const router = require('koa-router')()
const apiCtrl = require('./../controllers/api')

const routers = router
.post('/login',apiCtrl.login)
.post('/register',apiCtrl.register)
.post('/loginout',apiCtrl.loginOut)
.post('/video',apiCtrl.addVideo)
.delete('/video',apiCtrl.delVideo)
.get('/video',apiCtrl.getVideo)
.put('/video',apiCtrl.updateVideo)

module.exports = routers
