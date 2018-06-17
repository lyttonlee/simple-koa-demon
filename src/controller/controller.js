const {User, Article} = require('./model')
module.exports = {
  getinit: async (ctx, next) => {
    const users = await User.find()
    ctx.type = 'application/json'
    ctx.body = {
      users
    }
  },
  newuser: async (ctx, next) => {
    const userinfo = ctx.request.body
    // console.log(ctx.request.body)
    const user = new User(userinfo)
    try {
      const res = await user.save()
      console.log(res)
      ctx.body = res
    } catch (error) {
      console.log(error)
    }
  },
  getUser: async (ctx, next) => {
    console.log(ctx['params']['userid'])
    const user = await User.findById(ctx['params']['userid'])
    console.log(user)
    ctx.type = 'application/json'
    ctx.body = {
      user
    }
  },
  newArticle: async(ctx, next) => {
    const article = new Article(ctx.request.body)
    const res = await article.save()
    ctx.body = res
  }
}
