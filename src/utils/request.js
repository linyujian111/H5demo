/*
 * @Description: 请求配置
 * @Author: xwq
 * @Date: 2019-03-30 17:30:34
 * @LastEditTime: 2019-08-22 15:35:39
 */
import $http from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';

// process.env.VUE_APP_API_URL

const service = $http.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 2000,
    'content-type': 'application/x-www-form-urlencoded',
    headers: { 'X-Custom-Header': 'foobar' },
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        data = Qs.stringify(data);
        return data;
    }],
});

const responseCode = {
    31000: function (msg) {
        Toast(msg);
    },
    32000: function (msg) {
        Toast(msg);
    },
};
//interceptors.request
//请求拦截
service.interceptors.request.use(config => {
    // eslint-disable-next-line no-console
    // console.log(config, '---------');
    if (!config.data) {
        config.data = {};
    }
    // config.data.token = '44646116f161689441616161';
    return config;
}, error => {
    return Promise.rejiect(error);
});

//interceptors.response
//响应拦截
service.interceptors.response.use(res => {

    const response = res.data;
    if (response.code != 20000) {
        if (responseCode[response.code]) {
            responseCode[response.code](response.msg);
        }
        return Promise.reject(response).catch(erro => {
            return erro;
        });
    } else {
        return response;
    }

}, error => {
    return Promise.reject(error).catch(errorInfo => {
        return errorInfo;
    });
});



export default service;