/*
 * @Author: wy
 * @Date: 2023-09-22 13:47:45
 * @LastEditors: wy
 * @LastEditTime: 2023-09-27 14:14:33
 * @FilePath: /笔记/cms/ms-project/src/store/index.js
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import settings from '@/config';
import { Messager } from '@/utils';

const messager = new Messager(settings.decorateOrigin);
console.log('====settings.decorateOrigin', settings.decorateOrigin);

Vue.use(Vuex);

// require.context管理所有的modules
// 导出一个函数
const modulesFiles = require.context('./modules', true, /\.js$/);

let modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath).default || '';
  modules[moduleName] = value;
  return modules;
}, {});

modules = Object.assign({}, modules);

const emptyPageData = {
  id: '',
  name: '页面标题',
  shareDesc: '', // 微信分享文案
  shareImage: '', // 微信分享图片
  backgroundColor: '', // 页面背景颜色
  backgroundImage: '', // 页面背景图片
  backgroundPosition: 'top', // 页面背景位置
  cover: '',
  componentList: [],
};
const store = new Vuex.Store({
  state: {
    dragActive: false, // 当前是否正在拖动组件
    dragComponent: {}, // 正在拖动的组件对象
    pageData: JSON.parse(JSON.stringify(emptyPageData)),
  },
  getters,
  mutations: {
    SET_DRAG_STATE(state, payload) {
      state.dragActive = payload;
    },
    SET_DRAG_COMPONENT(state, payload) {
      state.dragComponent = payload;
    },
    // 更新活动页面数据
    UPDATE_COMPONENT(state, payload) {
      state.pageData = payload;
    },
    // disabledRestHeight 用来表示是否将h5的高度更新到cms
    VIEW_UPDATE(state, disabledRestHeight = false) {
      console.log('向H5发送更改后的数据');
      console.log(state.pageData);
      messager.emit('pageChange', {
        disabledRestHeight,
        value: state.pageData,
      });
    },
  },
  actions: {
    initMessage({ commit }) {
      // 监听H5预览页面高度变化
      messager.on('pageHeightChange', (data) => {
        console.log('从H5更新组件高度为=====', data);
        let height = data.height ? data.height + 72 : 768;
        let list = data.componentsTopList || [];
        commit('UPDATE_PAGE_HEIGHT', { height, list });
      });
    },
  },
  modules,
});
Vue.store = store;
export default store;
