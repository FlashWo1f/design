const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const book = sequelize.model('book')
const bookInfo = sequelize.model('bookInfo')
// const poetrylist = sequelize.model('poetrylist')
// const guestbook = sequelize.model('guestbook')
// const supportlist = sequelize.model('supportlist')
// const attentionlist = sequelize.model('attentionlist')
// const transmitlist = sequelize.model('transmitlist')
// const chat = sequelize.model('chat')
// chat.belongsTo(account, {foreignKey: 'form', targetKey: 'user_id'});
// guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
// poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
// transmitlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
// const utility  = require('utility')

// account.hasMany(book, {foreignKey: 'books', targetKey: 'ISBN'})
account.create({
  userId: "18879349607",
  userName: "李某",
  pwd: "211335246",
  avatar: "https://img.yzcdn.cn/vant/logo.png",
  books: "10019-1985;9787535735508"
})

const tureRes = {
  success: true,
  error: null,
  code: 0
}

Router.post('/getbooks', function(req, res) {
  // 获取用户购物车的书，
  const { books } = req.body
  const booksArr = books.split(";")
  bookInfo.findAndCountAll({
    include: book,
    where: {
      ISBN: {
        $in: booksArr
      }
    }
  }).then(ret => {
    res.json({
      data: ret,
      ...tureRes
    })
  })
})

Router.post('/register', function(req, res) {
  // 用户注册
  const body = req.body
  console.log("lululu", body)
  const { userName, pwd, userId } = body
  const data = {
    userName,
    // pwd: pwdMd5(pwd),
    pwd,
    userId,
    createTemp: new Date().getTime(),
    // user_id: pwdMd5(Date.now())
  }
  // account.create(data) => 放入数据去mysql
  account.create(data).then(doc => {
    // console.log("hahaha", doc)
    const {userName, userId} = doc
    // const {userName, userId, user_info, avatar} = doc
    res.cookie('userId', userId)
    return res.json({
      code: 0,
      success: true,
      error: null,
      data: {
        userName: userName,
        userId: userId,
      }
    })
  },
  error => {
    // sqlMessage 数据库错误信息
    const { errors, parent: { code } } = error
    // console.log("error", errors[0].type, code)
    if (errors[0].type) {
      if (code === "ER_DUP_ENTRY") {
        return res.json({
          code: -1,
          success: false,
          error: "该账号已被注册，直接登录吧~"
        })
      }
    }
  })
})

// 我们自己对原始的MD5进行复杂度调整
function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = Router