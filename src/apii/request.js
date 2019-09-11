//封装axios代码
import axios from 'axios';
import {message} from 'antd';
import store from '@redux/store';

const instance = axios.create({
   baseURL:'http://localhost:3000/api',//基本路径
    timeout:5000//限制超时
});


//设置拦截器    请求拦截器
instance.interceptors.request.use(
    (config) =>{
        const {token} = store.getState().user;
        if (token){
            config.headers.authorization = token;
        }
        return config;
    }
);


//设置拦截器    响应拦截器
instance.interceptors.response.use(
    (response) =>{
        const result = response.data;
        if (result.status === 0){
            return result.data;
        } else{
            message.error(result.msg);
            return Promise.reject(result.msg);
        }
    },
    (error) => {
        console.log('axios请求失败：', error);
        message.error('未知错误，请联系管理员~');
        return Promise.reject('未知错误，请联系管理员~');
    }
);
export default instance;