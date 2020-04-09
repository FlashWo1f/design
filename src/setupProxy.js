const proxy = require('http-proxy-middleware');
console.log("???")
module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'http://localhost:9094/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // 重写路径
    },
  }));
};
