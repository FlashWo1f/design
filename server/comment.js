const express = require('express')
const Router = express.Router()
const sequelize = require('./db')
const account = sequelize.model('account')
const book = sequelize.model('book')
const bookInfo = sequelize.model('bookInfo')
const comment = sequelize.model('comment')

comment.belongsTo(book, { foreignKey: 'ISBN', targetKey: 'ISBN' })
comment.belongsTo(account, { foreignKey: 'userId', targetKey: 'userId' })

const trueRes = {
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

comment.create({
  text: "新冠疫情带火的三流小说",
  score: "1",
  userId: "18833334444",
  ISBN: "9787512511996",
  like: '15',
  dislike: '3'
})

comment.create({
  text: "在这本书《花冠病毒》中，病毒的起因是冰川活动导致病毒传染人体，这与我们今天的疫情似乎有些不同，可追究根本总是人类的活动造成了这一切。历史总是惊人的相似，可我们似乎永远学不会反思与铭记，遗忘是最可悲的事！",
  score: "4",
  userId: "18822223333",
  ISBN: "9787512511996",
  like: '7',
  dislike: '1'
})

comment.create({
  text: "心？人心，有时候真的感觉人心比现实更可怕，比动物还害怕，这就是人心。",
  score: "5",
  userId: "18822223333",
  ISBN: "9787530220115",
  like: '106',
  dislike: '3'
})

comment.create({
  text: "越读越不想接近真相了，太赤裸裸，已经起了恶心感。对经常在日记里剖析自己行为背后的动机、动机背后的动机这样的人来说，很多心理变化、忏悔、拆解等都不陌生，但读来依旧震撼。痛苦诘问自己，还要再痛苦审视诘问。林修身的境况从外部视角已经写得大致明白了，在那颗破碎的心说话前，几乎取得了他人的谅解，我们会同情他，说境况如此，情有可原，他也是受害者……诸如此类的话。但这颗心偏偏跳出来：“受害不是施害的理由，也不是撒谎的理由，受害者并不天然占有道德优势，也没有道德豁免权。”只是这颗心的忏悔原来竟也修饰自己，而香织所说的又可信吗？每个人都武装自己，没有人例外，“所有的叙述都在寻找容器，借以装上自己的酒。”我最后的防线只剩下：每个人的叙述里有他们的真实。",
  score: "5",
  userId: "18879349607",
  ISBN: "9787530220115",
  like: '203',
  dislike: '3'
})

comment.create({
  text: "“我走上舞台，期待着观众会流泪，可是相反，他们会爆发出阵阵笑声。”",
  score: "5",
  userId: "18822223333",
  ISBN: "9787559638083",
  like: '106',
  dislike: '3'
})

comment.create({
  text: "民俗与儿童主题，在集外文中常见。有几篇知堂评论当时学校教育的文章，读来甚是活泼可爱。学生逃学？不是一朝一夕的事儿，学校和家庭首先要自我反省。学校不放寒暑假？等着吧，学生会更少！哈哈。",
  score: "5",
  userId: "18879349607",
  ISBN: "9787208151345",
  like: '76',
  dislike: '3'
})

comment.create({
  text: "集外文上卷收录文章，篇幅多短小，但是力度老道。尤其周作人转向自己的园地前的第一册《夏夜梦》，很多文章读来酣畅淋漓，许多议题至今仍不过时，只看题目也过瘾：论俄国革命与虚无主义之别；中国人之爱国；文学改良与孔教；妇女选举权问题……知堂之人本/思辨，使其观点对今日公共议题的讨论而言，仍有很强的参考价值。二三册所录文章可以看出他并非全然匿于苦雨斋中，对时事仍有关注。",
  score: "5",
  userId: "18822223333",
  ISBN: "9787208151345",
  like: '50',
  dislike: '9'
})

comment.create({
  text: "集外文上卷收录文章，篇幅多短小，但是力度老道。尤其周作人转向自己的园地前的第一册《夏夜梦》，很多文章读来酣畅淋漓，许多议题至今仍不过时，只看题目也过瘾：论俄国革命与虚无主义之别；中国人之爱国；文学改良与孔教；妇女选举权问题……知堂之人本/思辨，使其观点对今日公共议题的讨论而言，仍有很强的参考价值。二三册所录文章可以看出他并非全然匿于苦雨斋中，对时事仍有关注。",
  score: "5",
  userId: "18833334444",
  ISBN: "9787208151345",
  like: '21',
  dislike: '0'
})

comment.create({
  text: "垃圾小说，哗众取宠",
  score: "1",
  userId: "18833334444",
  ISBN: "9787541155390",
  like: '9',
  dislike: '21'
})

comment.create({
  text: "应该出过好几本这样的系列。不想与人类接触躲在深林，我想不应该躲到更远的森林吗，一方面不想接触一方面又离不开。尽不到父亲的责任，又让妻子怀孕~屡次提到生殖器器官？？？why？？？可能现代人喜欢丧文学，但是我还是欣赏不来。",
  score: "1",
  userId: "18822223333",
  ISBN: "9787541155390",
  like: '5',
  dislike: '2'
})

comment.create({
  text: "如书名，看个十几篇还好，看个几十篇，那就真心腻味的很。",
  score: "2",
  userId: "18822223333",
  ISBN: "9787565111235",
  like: '105',
  dislike: '2'
})

comment.create({
  text: "参差不齐，有些很好看，有些很敷衍，总体来说还不错。这个选题很有意思。",
  score: "4",
  userId: "18833334444",
  ISBN: "9787565111235",
  like: '25',
  dislike: '2'
})


comment.create({
  text: "作为小学的梦想是长大成为一个科学家的小明，竟真的读过！（应该是很小的时候在地摊上买的，说不定当时买的还真不是盗版！而且是读过好多名字很相近的书！很可惜那个想当科学家的小明和那个经常出现在数学题里的小明一样并没有考上高中~（不知是啥误了小明，但#读书误了我#",
  score: "5",
  userId: "18879349607",
  ISBN: "9787535735508",
  like: '25',
  dislike: '2'
})

comment.create({
  text: "看不懂,一直看.",
  score: "5",
  userId: "18833334444",
  ISBN: "9787535735508",
  like: '6',
  dislike: '0'
})

comment.create({
  text: "当年的催眠读物。",
  score: "5",
  userId: "18822223333",
  ISBN: "9787535735508",
  like: '25',
  dislike: '0'
})

comment.create({
  text: "一向不喜欢励志书籍，但这本在情商提升上实在很有启发。我自己看的是全本，但看完觉得其实有空时随意翻着读，做好已读记号会效果更好些。重要的还是实行。",
  score: "5",
  userId: "18822223333",
  ISBN: "9787800875830",
  like: '125',
  dislike: '3'
})

comment.create({
  text: "饶了我吧，读者式的文章实在太可怕了。如何让别人喜欢我？算了吧。如果我不欣赏一个人，我不会有任何兴趣取悦一个人。如何赢得别人的赞同？自己做好了有需要赞同么？Don't waste my time.",
  score: "3",
  userId: "18879349607",
  ISBN: "9787800875830",
  like: '634',
  dislike: '20'
})

comment.create({
  text: "说得容易做的难。其实说白了就一句话：真心实意站在对方角度着想",
  score: "4",
  userId: "18833334444",
  ISBN: "9787800875830",
  like: '236',
  dislike: '10'
})

comment.create({
  text: "心疼我在亚马逊上花的两块钱。这本书竟然是一个建筑系高材生，和我聊博尔赫斯，李斯特的姑娘推荐的，hope that she was just kidding",
  score: "1",
  userId: "18833334444",
  ISBN: "9787540468798",
  like: '236',
  dislike: '10'
})

comment.create({
  text: "妈蛋，还我两块！",
  score: "1",
  userId: "18822223333",
  ISBN: "9787540468798",
  like: '316',
  dislike: '8'
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
      ...trueRes
    })
  })
})

module.exports = Router
