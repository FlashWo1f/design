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
  avatar: "https://game.gtimg.cn/images/lol/act/img/champion/Leblanc.png",
  books: "10019-1985;9787535735508"
})

account.create({
  userId: "18822223333",
  userName: "张某",
  pwd: "12345678",
  avatar: "https://game.gtimg.cn/images/lol/act/img/champion/Vladimir.png",
  books: "9787512511996;9787559638083;9787208151345"
})

account.create({
  userId: "18833334444",
  userName: "曹子孝",
  pwd: "12345678",
  avatar: "https://game.gtimg.cn/images/lol/act/img/champion/Kassadin.png",
  books: "9787512511996;9787559638083;9787208151345"
})

const trueRes = {
  success: true,
  error: null,
  code: 0
}

Router.post('/getbooks', function (req, res) {
  // 获取用户购物车的书，
  const { userId } = req.body
  // console.log("好像有点问题题题题题题题题题题题题题", req.body)
  account.findOne({
    where: { userId }
  }).then(ret => {
    if (ret) {
      const { books } = ret
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
          ...trueRes
        })
      })
    } else {
      res.json({
        error: "用户不存在",
        code: -1,
        success: false
      })
    }
  })


})

Router.post('/register', function (req, res) {
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
    const { userName, userId } = doc
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

// 将某本书加入购物车
Router.post("/addtocart", function (req, res) {
  const { ISBN, userId } = req.body
  account.findOne({
    where: {
      userId
    }
  }).then(ret => {
    const books = ret.books + ";" + ISBN;
    if (ret.books.includes(ISBN)) {
      return res.json({
        error: "该商品已在购物车",
        code: -1,
        success: false
      })
    }
    account.update(
      { books },
      {
        where: {
          userId
        }
      }
    ).then(temp => {
      if (temp) {
        res.json({
          ...trueRes
        })
      } else {
        res.json({
          error: "操作失败",
          code: -1,
          success: false
        })
      }
    })
  })
})

// 将某本书从购物车删除
Router.post("/delfromcart", function (req, res) {
  const { ISBN, userId } = req.body
  account.findOne({
    where: {
      userId
    }
  }).then(ret => {
    const ISBNArr = ret.books.split(";")
    const result = ISBNArr.filter(item => item !== ISBN)
    console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad", ISBNArr, result)
    account.update({ books: result.join(";") }, {
      where: {
        userId
      }
    }).then(temp => {
      if (temp) {
        res.json({
          ...trueRes
        })
      } else {
        res.json({
          error: "操作失败",
          code: -1,
          success: false
        })
      }
    })
  })
})

// 获取所有用户  待测试
Router.post('/getalluser', function (req, res) {
  // 用户列表
  const { userId } = req.body
  if (userId) {
    account.findOne({
      where: { userId }
    }).then(ret => {
      return res.json({
        data: ret,
        ...trueRes
      })
    })
  } else {
    account.findAll({
      order: [ // 使用order进行排序
        ['createdAt'],
      ]
    }).then(doc => {
      return res.json({
        code: 0,
        data: doc
      })
    })
  }
})

// 登录
Router.post("/login", function (req, res) {
  const { username, password } = req.body
  account.findOne({
    'where': {
      'userId': username,
      'pwd': password
    }
  }).then(ret => {
    if (ret.dataValues) {
      delete ret.dataValues.pwd
      res.json({
        data: ret.dataValues,
        ...trueRes
      })
    } else {
      res.json({
        success: false,
        error: "该用户不存在",
        code: -1
      })
    }
  })
})
// 我们自己对原始的MD5进行复杂度调整
// function pwdMd5(pwd) {
//   const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
//   return utility.md5(utility.md5(pwd + salt))
// }

module.exports = Router