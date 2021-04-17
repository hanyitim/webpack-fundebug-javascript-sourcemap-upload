import axios from 'axios';
import FormData from 'form-data';
import string2fileStream from 'string-to-file-stream';
axios.defaults.baseURL = 'https://fundebug.com/javascript/sourcemap';
function getFormData({filename,content,apikey,appversion}){
    const formData = new FormData();
    formData.append('apikey',apikey);
    formData.append('appversion',appversion);
    formData.append('sourceMap',string2fileStream(content._value),{filename,contentType: 'text'});

    return formData;
}

export default async (sourceMapList,options)=>{
    if(options.clear){
        await axios.post('clear',{
            apikey:options.apikey
        });
    }
    const promiseList = sourceMapList.map((sourcemap)=>{
        const data = getFormData({...sourcemap,...options});
        return axios.post('upload',data,{headers:{...data.getHeaders(),filename:sourcemap.filename}});
    });
    return axios.all(promiseList);
};