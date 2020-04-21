# 项目

- 如果要使用 react 的话，对新手来说，首选脚手架大概就是使用由 facebook  官方出的脚手架 create-react-app 了
- create-react-app 将 webpack 的配置，lint 的配置，babel 的配置等封装成 react-scripts，这种做法保证了底层依赖版本升级和迁移的时候，可以平滑迁移，不会影响到业务项目。
- create-react-app 支持开发者对项目进行个性化配置（通过配合 react-app-rewired 使用或yarn eject 暴露 相关配置后进行修改）。


<a href="https://juejin.im/post/5d5e25b5f265da03970bbf82">配置参考</a>

## 初始化

create-reate-app --template typescript design

## tips
### 路径alias
在tsconfig.json中
```json
{
  "compilerOptions": {
  // ...
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@com/*": ["component/*"]
    }
  }
}
```

> 加上之后，出现了诡异的一幕，在我npm start的时候 上面修改的paths自动消失了

解决办法

在tsconfig.json的同级加一个json文件  内容:
```json
{
  "compilerOptions": {
  // ...
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@com/*": ["component/*"]
    }
  }
}
```
然后再tsconfig.json中

"extends": "./paths.json"

### 引入less

1. yarn eject 暴露config和script
2. yarn add less less-loader -D 安装less & less-loader到开发环境
3. 修改webpack配置
```js
  const lessRegex = /\.less$/;  // 新增less配置
  const lessModuleRegex = /\.module\.less$/; // 新增less配置
  /* 下面是原有代码块 */
  {
    test: cssModuleRegex,
    use: getStyleLoaders({
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    }),
  },
  /* 上面是原有代码块 */
  /* 下面是添加代码块 */
  {
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({
      importLoaders: 1,// 值是1
      sourceMap: isEnvProduction && shouldUseSourceMap
    },
      "less-loader"
    ),
    sideEffects: true
  },
  {
    test: lessModuleRegex,
    use: getStyleLoaders({
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true, // 增加这个可以通过模块方式来访问less
      getLocalIdent: getCSSModuleLocalIdent
    },
      "less-loader"
    )
  },
  /* 上面是添加代码块 */
  /* 下面是原有代码块 */
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
      'sass-loader'
    ),
    sideEffects: true,
  },
  /* 上面是原有代码块 */

```


server 可以参考douban  e91cb3743612252437896f79a815e44bb2bb545c
在前端项目里面嵌入了一个node项目

## Sequelize 初步使用
https://sequelize.org/
在 Node Web 开发过程中，后台数据库我一直使用的都是 Mysql。起初在做 Node Web 开发的时候，都是提前在 Mysql 图形界面里创建好数据表，然后再开始实际开发，这个过程一直穿插在整个项目的开发过程中。一个人在一台机器上，做全栈的开发，这个过程可能并不会出现什么问题，因为数据表结构以及整个项目代码都在一台电脑上，不管你怎么修改，都是一套代码，一个数据库结构。

然而，当你需要在多台电脑之间协同工作的时候，你就会发现这种方式的弊端。比如在A电脑上修改了数据表结构之后，接着去B电脑上继续编码，我们虽然能通过Git同步代码，但是数据表结构却无法同步过去，我们就需要在B电脑上，手动将数据库结构维护成一致，否则无法接着进行。这种操作方式非常的不方便，而且很LOW。

而 Sequelize 框架就能很好的解决这个问题，通过 Sequelize 框架，我们将每个数据表直接定义为数据模型，通过调用数据模型的一些方法，就可以直接操作数据库，甚至是同步数据表结构。

```node
node server/db
就创建了表，太舒服了
node server/server
创建服务
```

### 查询表的内容
```js
const account = sequelize.define('account', {})
// 在其他文件中
const sequelize = require('./db')
const account = sequelize.model('account')
// res 即account里面的数据数组
account.findAll().then(res => console.log(res))
Array.isArray(res)  // true
```
### 关联表
```js
// 将bookInfo归属于book表
bookInfo.belongsTo(book, { foreignKey: 'ISBN', targetKey: 'ISBN' })
// 在连表查询的时候
Router.post('/detail', function(req, res) {
  const { ISBN } = req.body 
  // 只能在bookInfo的查询里面去include model book 反过来就会报错
  // 其实node方面res.json里面返回到前端的数据格式可以再优化一些，由于所花时间问题，在这方面粗糙了一些，将重点放在了前端上面 后续如果优化此项目的话，可以考虑将node层配合接口axios去重构一下数据格式
  bookInfo.findOne({
    include: [{
      model: book
    }],
    where: { ISBN }
  }).then(ret => {
    return res.json({
      data: ret,
      ...trueRes
    })
  })
})
```

## 创建数据库

1. 管理员权限进入cmd, 进入mysql的bin文件夹
2. mysql -u root -p 输入密码进入数据库(前提是mysql服务已经开着)
3. CREATE DATABASE IF NOT EXISTS design DEFAULT CHARSET utf8 COLLATE utf8_general_ci; use design;(默认设置utf-8)

## css
text-indent 首行文本缩进


## 跨域
本地服务在9094端口，前端在3000端口，即使是本地，端口不一样还是跨域的

## bug
添加了setupProxy.js文件
paths文件中也导出了
proxySetup: resolveApp('src/setupProxy.js')
但是就是没用

放弃代理，直接在请求头和响应头里做处理

将Header导入app.tsx，因为header中用了withRouter报错。
You should not use <withRouter(Header) /> outside a <Router>
用useHistory又报错
Cannot read property 'history' of undefined
return useContext(Context).history

### 跳转到页面指定位置
1. 本以为给目标盒子加上id, 然后将window.location.hash = "#id"就行
以失败告终
2.
 ```js
setTimeout(() => {
        const ele: any = document.getElementById("comments")
        ele.scrollIntoView()
      }, 0);
```
失败

### 阻止事件冒泡

在首页评论中，希望展开上面的点击事件不要冒泡

```js
(e) => e.stopPropagation();
```

### 图片

请求图片403问题。 豆瓣对请求源做了处理
需要我们在html的meta中加入
```html
<meta name="referrer" content="no-referrer">
```

```js
// /server/server.js
app.all('*', function (req, res, next) {
  console.log("req", req.connection.remoteAddress)
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// /src/api/index.ts
headers: {
  // 设置
  'Content-Type': 'application/x-www-form-urlencoded',
  "origin": "http://127.0.0.1:3000",
  // 'Access-Control-Allow-Origin': '*'
  // "Access-Control-Allow-Credentials": "true"
},
// 前端起的服务要和上面的origin一致  所以不能用localhost

// 综上还是会在控制台打印出
// xhr.js:126 Refused to set unsafe header "origin"
```

## 文本省略  固定CSS属性组合
```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width: 120px;
```