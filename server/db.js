const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'design', // 数据库名
  'root',   // 用户名
  '171646167',   // 用户密码
  {
      'dialect': 'mysql',  // 数据库使用mysql
      'host': 'localhost', // 数据库服务器ip
      'port': 3306,        // 数据库服务器端口
      // 'define': {
      //     // 字段以下划线（_）来分割（默认是驼峰命名风格）
      //     'underscored': true
      // }
      'timezone': '+08:00'
  }
);

const account = sequelize.define(
  'account',
  {
    'userId': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'unique': true
    },
    'userName': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'pwd': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'avatar': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'createTemp': {
      'type': Sequelize.DATE,
      'defaultValue': Sequelize.NOW,
    },
  }
)
account.sync();
// account.findAll().then(res => console.log("??????????????????????????????", res, "!!!!!!!!!!!!!!!!!!!!!!!11", Array.isArray(res)))
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


module.exports = sequelize