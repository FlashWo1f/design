const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')
const guestbook = sequelize.model('guestbook')
const supportlist = sequelize.model('supportlist')
const attentionlist = sequelize.model('attentionlist')
const transmitlist = sequelize.model('transmitlist')
const chat = sequelize.model('chat')
chat.belongsTo(account, {foreignKey: 'form', targetKey: 'user_id'});
guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
transmitlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')

Router.post('/register', function(req, res) {
  // 用户注册
  const body = req.body.userinfo
  const {user_name, pwd} = req.body.userinfo
  const data = {
    user_name: user_name,
    pwd: pwdMd5(pwd),
    create_temp: new Date().getTime(),
    user_id: pwdMd5(Date.now())
  }
  account.create(data).then(doc => {
    const {user_name, user_id, user_info, avatar} = doc
    res.cookie('user_id', user_id)
    return res.json({
      code: 0,
      data: {
        user_name: user_name,
        user_id: user_id,
        user_info: user_info,
        avatar: avatar
      }
    })
  })
})

// 我们自己对原始的MD5进行复杂度调整
function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = Router