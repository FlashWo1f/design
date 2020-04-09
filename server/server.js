const express = require('express')

const bodyParser = require('body-parser')

// const cookirParse = require('cookie-parser')
const sequelize = require('./db')
// const chat = sequelize.model('chat')
// const account = sequelize.model('account')

const app = express()
const userRouter = require('./user')

const server = require('http').Server(app)


// app.use(cookirParse())
app.use(bodyParser.urlencoded())

app.use('/user', userRouter)

server.listen(9094, function(){
  console.log('Node app start at port  9094')
})
