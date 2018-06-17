const Koa = require('koa')
const loagger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
// 创建服务
const app = new Koa()
// 连接数据库
const mongoose = require('mongoose')
const dbname = 'joi'
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost/${dbname}`)
const DBconnected = mongoose.connection
DBconnected.on('open', () => {
  console.log(`已连接到数据库${dbname}`)
})
DBconnected.on('error', err => {
  console.error(err)
})
// 打印日志记录
app.use(loagger())
// 解析body数据
app.use(bodyParser())
// API路由
const apiRouter = require('./router/apiRouter')
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
// 监听
const port = 3000
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`the server is listening on ${host}:${port}`)
})
