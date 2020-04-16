const express = require('express')
const Router = express.Router()
const sequelize = require('./db')
const account = sequelize.model('account')
const book = sequelize.model('book')
const bookInfo = sequelize.model('bookInfo')
const comment = sequelize.model('comment')

comment.belongsTo(book, { foreignKey: 'ISBN', targetKey: 'ISBN' })
comment.belongsTo(account, { foreignKey: 'userId', targetKey: 'userId' })

const tureRes = {
  success: true,
  error: null,
  code: 0
}

comment.create({
  text: "我有一时，曾经屡次忆起儿时在故乡所吃的蔬果：菱角、罗汉豆、茭白、香瓜。凡这些，都是极其鲜美可口的；都曾是使我思乡的蛊惑。后来，我在久别之后尝到了，也不过如此；惟独在记忆上，还有旧来的意味存留。他们也许要哄骗我一生，使我时时反顾。",
  score: "4.5",
  userId: "18879349607",
  ISBN: "10019-1985",
  like: '25',
  dislike: '3'
})

comment.create({
  text: "鲁迅从小到大的生活经历和思想脉络，塑造了一些个性鲜明的人物，读来温馨有趣",
  score: "4",
  userId: "18822223333",
  ISBN: "10019-1985",
  like: '55',
  dislike: '7'
})

comment.create({
  text: "鲁迅最早的藏书，是一部木刻绘图《山海经》。四本小小的书，纸张很黄，刻印都十分粗拙，图像差到几乎全用直线凑合，连动物的眼睛都是长方形的。可是年幼的鲁迅如获至宝：人面的兽，九头的蛇，一脚的牛，没有头而“以乳为目、以脐为口”的怪物，远古神话世界的奇烈想象透过粗鄙的纸页喷薄而来，让心智初开的少年惊慕不已。几十年后，念及不知何时散佚的这最初的收藏，早已年过不惑的鲁迅在一册思忆儿时故乡生活的集子里写道：“这四本书，乃是我最初得到，最为心爱的宝书。”",
  score: "4",
  userId: "18833334444",
  ISBN: "10019-1985",
  like: '55',
  dislike: '7'
})

// 获取所有评论
Router.post("/getcomm", (req, res) => {
  const { ISBN } = req.body
  comment.findAll({
    include: [{
      model: account,
      attributes: ["avatar", "userName", "userId"]
    }],
    where: { ISBN },
    order: ["createdAt"]
  }).then(ret => {
    return res.json({
      data: ret,
      ...tureRes
    })
  })
})

module.exports = Router
