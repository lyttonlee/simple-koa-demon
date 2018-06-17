const Router = require('koa-router')
const controller = require('../controller/controller')
const {validate, schema} = require('../utils/validate')
const apiRouter = new Router({
  prefix: '/api'
})
apiRouter
  .get('/', controller.getinit)
  .post('/user', validate.validateBody(schema.userSchema), controller.newuser)
  .get('/user/:userid', validate.validateId(schema.idSchema, 'userid'), controller.getUser)
  .post('/:userid/article',validate.validateId(schema.idSchema, 'userid'), validate.validateBody(schema.articleSchema), controller.newArticle)
module.exports = apiRouter