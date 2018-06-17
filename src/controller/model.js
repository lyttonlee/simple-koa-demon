const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  date: {
    type: String,
    'default': moment().format('YYYY-M-D:hh-mm-ss')
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }]
})
const User = mongoose.model('User', UserSchema)

const ArticleSchema = new Schema({
  title: String,
  date: {
    type: String,
    'default': moment().format('YYYY-M-D:hh-mm-ss')
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String
})
const Article = mongoose.model('Article', ArticleSchema)

module.exports = {
  User,
  Article
}