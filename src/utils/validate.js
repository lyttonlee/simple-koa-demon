const Joi = require('joi')

module.exports = {
  schema: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[a-f0-9A-F]{24}$/).required()
    }),
    userSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }),
    articleSchema: Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required()
    })
  },
  validate: {
    validateId: (schema, name) => {
      return async (ctx, next) => {
        const result = Joi.validate({param: ctx['params'][name]}, schema)
        console.log(result)
        if (result.error) {
          ctx.body = result.error
        } else {
          await next()
        }
      }
    },
    validateBody: schema => {
      return async (ctx, next) => {
        const result = Joi.validate(ctx.request.body, schema)
        console.log(result)
        if (result.error) {
          ctx.body = result.error
        } else {
          await next()
        }
      }
    }
  }
}
