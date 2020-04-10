const express = require('express')

const bodyParser = require('body-parser')

// const cookirParse = require('cookie-parser')
const sequelize = require('./db')
// const chat = sequelize.model('chat')
// const account = sequelize.model('account')
console.log("康康", sequelize.models.account)
const app = express()
const userRouter = require('./user')

const server = require('http').Server(app)

app.all('*', function (req, res, next) {
  console.log("req", req.connection.remoteAddress)
  res.header("Access-Control-Allow-Origin", "http://192.168.0.13:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// app.use(cookirParse())
app.use(bodyParser.urlencoded())

app.use('/user', userRouter)

server.listen(9094, function () {
  console.log('Node app start at port  9094')
})
