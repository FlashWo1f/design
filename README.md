# 项目

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