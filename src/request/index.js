/*
 * @Author: wy
 * @Date: 2023-09-22 14:12:55
 * @LastEditors: wy
 * @LastEditTime: 2023-09-22 14:51:29
 * @FilePath: /笔记/cms/ms-project/src/request/index.js
 * @Description:
 */
import axios from 'axios';
import { baseURL } from '@/config';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL, // url = base url + request url
  timeout: 20000, // request timeout
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['X-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(res, 'res');
    // 接口请求失败提示
    if (res.code !== 10000) {
      Message.error(res.message);
    }
    if (res.code === -2) {
      localStorage.removeItem('token');
      window.location.href = location.origin + '/cms-manage/#/login';
    }
    return res;
  },
  (error) => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
