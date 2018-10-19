const router = require('./routers/index')
const config = require('./config')

var cors = require('koa-cors');

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const onerror = require('koa-onerror')

const app = new Koa()

onerror(app)

// session存储配置
const sessionMysqlConfig = {
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host
}

app.use(cors({
  credentials: true
}));


// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))




// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口
app.listen(config.sys.port, () => {
  console.log(`the server is start at port ${config.sys.port}`)
})
