#### 安装
```
npm i -D webpack-fundebug-javascript-sourcemap-upload
```
#### 参数
* apikey[string],[required:true] --- fundebug 项目的 apikey
* appversion[string],[default:'1.0.0'] --- 版本号，用于区分sourcemap
* clear[boolean],选填,[default:false] --- 是否在上传soucemap之前清除旧的soucemap文件
#### 使用
```javascript
const FundebugJavascriptSourcemapPlugin = require('webpack-fundebug-javascript-sourcemap-upload');

module.exports = {
    entry:[],
    ...,
    plugins:[
        new FundebugJavascriptSourcemapPlugin({
            apikey:'xxxx',
            appversion:'1.1.1',
            clear:true
        })
    ]
}


```
### fundebug文档相关
* [webpack soucemap 相关配置](https://docs.fundebug.com/notifier/javascript/sourcemap/generate/webpack.html) 

### 注意
1. 需要开启```devtool:"hidden-source-map"```,插件在会在emit阶段获取```.js.map```后缀的文件，通过fundebug api 上传，并删除compilation.assets内的 sourcemap 资源；

