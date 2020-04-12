const express = require('express')
const Router = express.Router()
const sequelize = require('./db')
const account = sequelize.model('account')
const book = sequelize.model('book')
const bookInfo = sequelize.model('bookInfo')

bookInfo.belongsTo(book, { foreignKey: 'ISBN', targetKey: 'ISBN' })
const tureRes = {
  success: true,
  error: null,
  code: 0
}

Router.post('/detail', function(req, res) {
  const { ISBN } = req.body 
  bookInfo.findOne({
    include: [{
      model: book
    }],
    where: { ISBN }
  }).then(ret => {
    return res.json({
      data: ret,
      ...tureRes
    })
  })
})


bookInfo.create({
  ISBN: "9787512511996",
  author: {
    label: "作者",
    value: "毕淑敏"
  },
  publisher: {
    label: "出版社",
    value: "国际文化出版公司"
  },
  originalName: {
    label: "原书名",
    value: null
  },
  translatoer: {
    label: "译者",
    value: null
  },
  pages: {
    label: "页数",
    value: 782
  },
  price: {
    label: "价格",
    value: "12.00"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})
bookInfo.create({
  ISBN: "9787530220115",
  author: {
    label: "作者",
    value: "陈希我"
  },
  publisher: {
    label: "出版社",
    value: "北京十月文艺出版社"
  },
  originalName: {
    label: "原书名",
    value: null
  },
  translatoer: {
    label: "译者",
    value: null
  },
  pages: {
    label: "页数",
    value: 496
  },
  price: {
    label: "价格",
    value: "65.00元"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})
bookInfo.create({
  ISBN: "9787559638083",
  author: {
    label: "作者",
    value: "[英] 亨利·斯各特·斯托克斯"
  },
  publisher: {
    label: "出版社",
    value: "北京联合出版公司"
  },
  originalName: {
    label: "原书名",
    value: "三岛由纪夫传"
  },
  translatoer: {
    label: "译者",
    value: "于是"
  },
  pages: {
    label: "页数",
    value: 352
  },
  price: {
    label: "价格",
    value: "58.00元"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})
bookInfo.create({
  ISBN: "9787208151345",
  author: {
    label: "作者",
    value: "周作人"
  },
  publisher: {
    label: "出版社",
    value: "上海人民出版社"
  },
  originalName: {
    label: "原书名",
    value: null
  },
  translatoer: {
    label: "译者",
    value: null
  },
  pages: {
    label: "页数",
    value: 3782
  },
  price: {
    label: "价格",
    value: "112.00"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})
bookInfo.create({
  ISBN: "9787541155390",
  author: {
    label: "作者",
    value: "[挪威] 阿澜·卢"
  },
  publisher: {
    label: "出版社",
    value: "四川文艺出版社"
  },
  originalName: {
    label: "原书名",
    value: "Doppler"
  },
  translatoer: {
    label: "译者",
    value: "宁蒙"
  },
  pages: {
    label: "页数",
    value: 176
  },
  price: {
    label: "价格",
    value: "48.00"
  },
  layout: {
    label: "装帧",
    value: "精装"
  },
})
bookInfo.create({
  ISBN: "9787565111235",
  author: {
    label: "作者",
    value: "朱赢椿"
  },
  publisher: {
    label: "出版社",
    value: "南京师范大学出版社"
  },
  originalName: {
    label: "原书名",
    value: null
  },
  translatoer: {
    label: "译者",
    value: null
  },
  pages: {
    label: "页数",
    value: 400
  },
  price: {
    label: "价格",
    value: "78.00"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})

book.create({
  ISBN: "9787512511996",
  bookName: "花冠病毒",
  img: "https://img1.doubanio.com/view/subject/s/public/s33586178.jpg",
  score: 3,
  titleIntro: "2020年毕淑敏重磅畅销小说独家授权全新修订版。本书是一部震撼心灵的优秀抗疫文学。抗击新冠肺炎疫情时期，助人自助心理疏导必读经典书",
  conIntro: "20NN年，一种极其凶猛罕见的嗜血病毒——“花冠”，突袭有1000万人口的中国燕市。人类与病毒之间的殊死大战拉开帷幕！民众生命陷入危机，没有任何人能置身事外。亲临一线的科研教授于增风，以身试毒不幸身亡",
})

module.exports = Router