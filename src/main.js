/*
 * @Author: wy
 * @Date: 2023-09-13 18:09:18
 * @LastEditors: wy
 * @LastEditTime: 2023-09-22 15:39:29
 * @FilePath: /笔记/cms/ms-project/src/main.js
 * @Description:
 */
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/app.less'; // 后台装修搭建系统公共CSS

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
