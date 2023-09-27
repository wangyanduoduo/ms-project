/*
 * @Author: wy
 * @Date: 2023-09-14 17:32:33
 * @LastEditors: wy
 * @LastEditTime: 2023-09-22 15:18:29
 * @FilePath: /笔记/cms/ms-project/src/router/index.js
 * @Description:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        hidden: true,
        meta: { title: '首页' },
        component: () => import('@/pages/home/index.vue'),
      },
      {
        path: '/activity',
        name: '活动管理',
        hidden: true,
        meta: { title: '活动管理' },
        component: () => import('@/pages/activity/index.vue'),
      },
    ],
  },
  {
    path: '/decorate',
    name: 'decorate',
    component: () => import('@/pages/decorate/index'),
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    name: 'Login',
    hidden: true,
    meta: { title: '登录' },
  },
];

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
