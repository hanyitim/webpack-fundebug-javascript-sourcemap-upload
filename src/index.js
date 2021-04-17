
import uploader from './lib/uploader.js';
import stdout from './lib/stdout.js';

class WebpackFundebugJavascriptSourcemapUpload{
    constructor(options={}){
        this.assignOptions(options);
        this.pluginName = 'webpack-fundebug-javascript-sourcemap-upload';
    }
    apply(compiler){
        const self = this;
        compiler.hooks.emit.tapPromise(this.pluginName,(compilation)=>{
            const assetsKeys = Object.keys(compilation.assets);
            const mapList = [];
            self.options.apikey && assetsKeys.forEach(function(assetsKey){
                if(/.js.map$/g.test(assetsKey)){
                    mapList.push({
                        filename:assetsKey,
                        content:{...compilation.assets[assetsKey]}
                    });
                    delete compilation.assets[assetsKey];
                }
            });
            if(mapList.length === 0){
                return;
            }
            stdout.render();
            return uploader(mapList,this.options).then((resList)=>{
                stdout.stop();
                resList.forEach(({config})=>{
                    stdout.success(`${config.headers.filename}  ---------------  OK`)
                });
            }).catch((err)=>{
                stdout.stop();
                throw new Error(err);
            })
        })
    }
    assignOptions(options){
        const defaultOptions = {
            apikey:'',
            appversion:'1.0.0',
            clear:false
        };
        this.options = Object.assign(defaultOptions,options);
    }
}

module.exports = WebpackFundebugJavascriptSourcemapUpload;