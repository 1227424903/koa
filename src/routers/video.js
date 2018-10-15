// 接口相关子路由
const router = require('koa-router')()
const apiCtrl = require('./../controllers/video')

const routers = router
.post('/add',apiCtrl.addVideo)
.delete('/del',apiCtrl.delVideo)
.get('/get',apiCtrl.getVideo)
.put('/update',apiCtrl.updateVideo)

module.exports = routers
