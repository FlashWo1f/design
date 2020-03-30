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
