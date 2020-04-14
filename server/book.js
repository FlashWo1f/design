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

Router.post('/allbook', function(req, res) {
  book.findAll().then(ret => res.json({
    data: ret,
    ...tureRes
  }))
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
bookInfo.create({
  ISBN: "10019-1985",
  author: {
    label: "作者",
    value: "鲁迅"
  },
  publisher: {
    label: "出版社",
    value: "人民文学出版社"
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
bookInfo.create({
  ISBN: "9787535735508",
  author: {
    label: "作者",
    value: "史蒂芬・霍金"
  },
  publisher: {
    label: "出版社",
    value: "湖南科学技术出版社"
  },
  originalName: {
    label: "原书名",
    value: null
  },
  translatoer: {
    label: "译者",
    value: "许明贤 / 吴忠超"
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
    value: "BBC书籍"
  },
})
bookInfo.create({
  ISBN: "9787800875830",
  author: {
    label: "作者",
    value: "[美] 戴尔·卡耐基"
  },
  publisher: {
    label: "出版社",
    value: "中国发展出版社"
  },
  originalName: {
    label: "原书名",
    value: "How to Win Friends and Influence People"
  },
  translatoer: {
    label: "译者",
    value: "袁玲"
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
bookInfo.create({
  ISBN: "9787540468798",
  author: {
    label: "作者",
    value: "大冰"
  },
  publisher: {
    label: "出版社",
    value: "湖南文艺出版社"
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
    value: "36.00"
  },
  layout: {
    label: "装帧",
    value: "平装"
  },
})

book.create({
  ISBN: "9787512511996",
  bookName: "花冠病毒",
  author: "毕淑敏",
  img: "https://img1.doubanio.com/view/subject/s/public/s33586178.jpg",
  score: 3,
  titleIntro: "2020年毕淑敏重磅畅销小说独家授权全新修订版。本书是一部震撼心灵的优秀抗疫文学。抗击新冠肺炎疫情时期，助人自助心理疏导必读经典书",
  conIntro: "20NN年，一种极其凶猛罕见的嗜血病毒——“花冠”，突袭有1000万人口的中国燕市。人类与病毒之间的殊死大战拉开帷幕！民众生命陷入危机，没有任何人能置身事外。亲临一线的科研教授于增风，以身试毒不幸身亡",
})
book.create({
  ISBN: "9787530220115",
  bookName: "心！",
  author: "陈希我",
  img: "https://img3.doubanio.com/view/subject/s/public/s33555062.jpg",
  score: 4,
  titleIntro: "林修身，日本长谷川商会会长，作为日籍华人代表回到中国时，离奇地因“心脏破碎”而去世。因此，记者开始了对林修身生前故事的探询与追踪。然而，经过各个不同人物的讲述之后，林修身的形象却越来越难以辨认，被构建起来的个体历史同时也在被解构",
  conIntro: "在民族国家、性别政治、道德伦理、情爱欲望的种种重负之下，一个“剥洋葱”式的故事逐层呈现。“我于是分明地意识着那心的消失过程。它确凿地存在，然后渐渐地化为尘埃”。",
})
book.create({
  ISBN: "9787559638083",
  bookName: "美与暴烈 : 三岛由纪夫传",
  author: "[英] 亨利·斯各特·斯托克斯",
  img: "https://img3.doubanio.com/view/subject/l/public/s33597630.jpg",
  score: 4,
  titleIntro: "林修身，日本长谷川商会会长，作为日籍华人代表回到中国时，离奇地因“心脏破碎”而去世。因此，记者开始了对林修身生前故事的探询与追踪。然而，经过各个不同人物的讲述之后，林修身的形象却越来越难以辨认，被构建起来的个体历史同时也在被解构",
  conIntro: "在民族国家、性别政治、道德伦理、情爱欲望的种种重负之下，一个“剥洋葱”式的故事逐层呈现。“我于是分明地意识着那心的消失过程。它确凿地存在，然后渐渐地化为尘埃”。",
})
book.create({
  ISBN: "9787208151345",
  bookName: "周作人集外文 : 1904—1945",
  author: "周作人",
  img: "https://img1.doubanio.com/view/subject/l/public/s33542038.jpg",
  score: 4,
  titleIntro: "《呐喊》收录作者1918年至1922年所作小说十四篇。1923年8月由北京新潮社出版，原收十五篇，列为该社《文艺丛书》之一。1924年5月第三次印刷时起，改由北京北新书局出版，列为作者所编的《乌合丛书》之一。1930年1 月第十三次印刷时，由作者抽去其中的《不周山》一篇(后改名为《补天》，收入《故事新编》)。作者生前共印行二十二版次。",
  conIntro: "鲁迅先生青年时代曾受进化论、尼采超人哲学和托尔斯泰博爱思想的影响。1904年初，入仙台医科专门学医，后从事文艺创作，希望以此改变国民精神。鲁迅先生一生写作计有600万字，其中著作约500万字，辑校和书信约100万字。作品包括杂文、短篇小说、评论、散文、翻译作品。对于“五四运动”以后的中国文学产生了深刻的影响。",
})
book.create({
  ISBN: "9787541155390",
  bookName: "我不喜欢人类，我想住进森林 : 15周年修订版",
  author: "[挪威] 阿澜·卢",
  img: "https://img3.doubanio.com/view/subject/l/public/s33534692.jpg",
  score: 4,
  titleIntro: "《呐喊》收录作者1918年至1922年所作小说十四篇。1923年8月由北京新潮社出版，原收十五篇，列为该社《文艺丛书》之一。1924年5月第三次印刷时起，改由北京北新书局出版，列为作者所编的《乌合丛书》之一。1930年1 月第十三次印刷时，由作者抽去其中的《不周山》一篇(后改名为《补天》，收入《故事新编》)。作者生前共印行二十二版次。",
  conIntro: "鲁迅先生青年时代曾受进化论、尼采超人哲学和托尔斯泰博爱思想的影响。1904年初，入仙台医科专门学医，后从事文艺创作，希望以此改变国民精神。鲁迅先生一生写作计有600万字，其中著作约500万字，辑校和书信约100万字。作品包括杂文、短篇小说、评论、散文、翻译作品。对于“五四运动”以后的中国文学产生了深刻的影响。",
})
book.create({
  ISBN: "9787565111235",
  bookName: "肥肉",
  author: "朱赢椿",
  img: "https://img3.doubanio.com/view/subject/l/public/s27208042.jpg",
  score: 4,
  titleIntro: "《呐喊》收录作者1918年至1922年所作小说十四篇。1923年8月由北京新潮社出版，原收十五篇，列为该社《文艺丛书》之一。1924年5月第三次印刷时起，改由北京北新书局出版，列为作者所编的《乌合丛书》之一。1930年1 月第十三次印刷时，由作者抽去其中的《不周山》一篇(后改名为《补天》，收入《故事新编》)。作者生前共印行二十二版次。",
  conIntro: "鲁迅先生青年时代曾受进化论、尼采超人哲学和托尔斯泰博爱思想的影响。1904年初，入仙台医科专门学医，后从事文艺创作，希望以此改变国民精神。鲁迅先生一生写作计有600万字，其中著作约500万字，辑校和书信约100万字。作品包括杂文、短篇小说、评论、散文、翻译作品。对于“五四运动”以后的中国文学产生了深刻的影响。",
})
book.create({
  ISBN: "10019-1985",
  bookName: "朝花夕拾",
  author: "鲁迅",
  img: "https://img3.doubanio.com/view/subject/s/public/s2875823.jpg",
  score: 5,
  titleIntro: "中西的思想确乎有一点不同。听说中国的孝子们，一到将要“罪孽深重祸延父母”的时候，就买几斤人参，煎汤灌下去，希望父母多喘几天气，即使半天也好。我的一位教医学的先生却教给我医生的职务道：可医的应该给他医治，不可医的应该给他死得没有痛苦。",
  conIntro: "父亲的喘气颇长久，连我也听得很吃力，然而谁也不能帮助他。我有时竟至于电光一闪似的想道：“还是快一点喘完了罢……。”立刻觉得这思想就不该，就是犯了罪；但同时又觉得这思想实在是正当的，我很爱我的父亲。便是现在，也还是这样想。",
})
book.create({
  ISBN: "9787535735508",
  bookName: "时间简史",
  img: "https://img9.doubanio.com/view/subject/s/public/s9111416.jpg",
  score: 5,
  author: "史蒂芬・霍金",
  titleIntro: "史蒂芬·霍金的《时间简史》在1998年首版以来的岁月里，已成为全球科学著作的里程碑。它被翻译840种文字，销售了1000万册，成为国际出版史上的奇观。",
  conIntro: "为了把许多观测揭示的新知识，以及他最新的研究纳入《时间简史(插图版)》，霍金教授为这一增订版准备了新的前言，全面更新了原书的内容，而且还新增加了一章，有关虫洞和时间旅行的激动人心的课题。",
})
book.create({
  ISBN: "9787800875830",
  bookName: "人性的弱点全集",
  img: "https://img9.doubanio.com/view/subject/s/public/s1083685.jpg",
  score: 5,
  author: "[美] 戴尔·卡耐基",
  titleIntro: "《人性的弱点全集》汇集了卡耐基的思想精华和最激动人心的内容，是作者最成功的励志经典，出版后立即获得了广大读者的欢迎，成为西方世界最持久的人文畅销书。",
  conIntro: "主要内容包括：与人相处的基本技巧、平安快乐的要诀、如何使人喜欢你、如何赢得他人的赞同、如何更好地说服他人、让你的家庭生活幸福快乐等十篇。",
})
book.create({
  ISBN: "9787540468798",
  bookName: "乖，摸摸头",
  author: "大冰",
  img: "https://img9.doubanio.com/view/subject/s/public/s27466554.jpg",
  score: 4,
  titleIntro: "【乖，摸摸头】：“杂草敏”是一只南方姑娘，辞去了稳定的幼儿园老师工作，跑到济南某电视台，从剪片子做起。后来又离开了山东，蒲公英一样漂去了北京又漂回了南方，甚至还漂到了澳大利亚……",
  conIntro: "【我有一碗酒，可以慰风尘】：这是一个关于越战老兵的故事。他将所有用命换来的补贴终身无偿捐献给希望工程、自费组建了第一支民间消防队，从不屑解释也不愿争辩的老兵，心里藏着一个关于铭记与奉献的故事。",
})


module.exports = Router