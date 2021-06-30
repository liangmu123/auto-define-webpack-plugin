## 版本升级
> version 1.1.3
>> 优化了getEnvConfig方法 不在立即转为json格式 而是在插件中在调用transformToJson方法
>
> version1.1.1
>> 修复dotenv 对已有process.env[key]不会再次覆盖问题

## 安装
```javascript
npm i @class_liangmu/auto-define-webpack-plugin -D
```
## 使用
> 传参可以是JSON格式字符串 也可以是普通字符串 优先级最高
```javascript
const AutoDefineWebpackPlugin = require('@class_liangmu/auto-define-webpack-plugin')

{
    plugins: [
        new AutoDefineWebpackPlugin({
            'process.env': {
                NODE_ENV: 'development'
            }
        })
    ]
}
```
> 可在根目录配置.env文件 默认自动读取 优先级最低
```javascript
# 通用环境
## webpack mode
NODE_ENV=development
## webpack 代理api
API_BASE_URL=/api
```

>可根据不同环境 配置不同的文件配置
>> 根目录新建env文件夹 新建.env .env.test文件（为方便管理 配置文件统一放在了根目录env文件下）
>> 需在package.json中 配置专属环境变量 指定配置文件 优先级中等
```javascript
"scripts": {
    "build:test": "auto-define LM_ENV=test npm run build
}
```
```javascript
# .env
NODE_ENV=development
API_BASE_URL=/api
```
```javascript
# .env.test
NODE_ENV=production
API_BASE_URL=/api2
```
