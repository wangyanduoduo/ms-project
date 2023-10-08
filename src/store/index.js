/*
 * @Author: wy
 * @Date: 2023-09-22 13:47:45
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 15:44:50
 * @FilePath: /笔记/cms/ms-project/src/store/index.js
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import settings from '@/config';
import { Messager, createRandomId } from '@/utils';

const messager = new Messager(settings.decorateOrigin);
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
    previewHeight: 0,
    componentsTopList: [], // h5传递过来的各个组件的top值
    addComponentIndex: null, // 拖动的组件要添加的位置
    activeComponentId: null, // 当前被操作的组件id
    setType: 1, // 1-页面；2-组件
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
      messager.emit('pageChange', {
        disabledRestHeight,
        value: state.pageData,
      });
    },
    UPDATE_PAGE_HEIGHT(state, { height, list }) {
      state.previewHeight = height;
      state.componentsTopList = list;
    },
    SET_DRAG_INDEX(state, payload) {
      state.addComponentIndex = payload;
    },
    // 向h5发送添加的位置信息
    VIEW_ADD_PREVIEW(state, index) {
      messager.emit('setPreview', index);
    },
    SET_ACTIVE_ID(state, id) {
      state.activeComponentId = id;
    },
    SET_SETTYPE(state, type) {
      state.setType = type;
    },
    VIEW_DELETE_PREVIEW() {
      messager.emit('deletePreview');
    },
    ADD_COMPONENT(state, payload) {
      // 新增加的组件
      const component = JSON.parse(JSON.stringify(payload.data));
      // 为组件配置一个唯一的id，在h5项目中可以使用
      const id = `${component.data.component}-${createRandomId()}`;
      component.id = id;
      // 配置组件的位置
      state.pageData.componentList.splice(payload.index, 0, component);
      this.commit('SET_ACTIVE_ID', id); // id被用于表示被选中的组件，新增加的组件因该默认选中
      this.commit('VIEW_SET_ACTIVE', id); // 更新H5区域选中状态
      this.commit('SET_SETTYPE', 2); // 更新页面编辑类型为组件
      this.commit('SET_DRAG_INDEX', null); // 重置拖动组件要添加的位置
    },
    DELETE_COMPONENT() {
      messager.emit('deletePreview');
    },
    EDIT_COMPONENT() {
      // todo
    },
    // 向H5页面发送选中指定项
    VIEW_SET_ACTIVE(state, id) {
      messager.emit('setActive', id);
    },
  },
  actions: {
    initMessage({ commit }) {
      // 监听H5预览页面高度变化
      messager.on('pageHeightChange', (data) => {
        let height = data.height ? data.height + 72 : 768;
        let list = data.componentsTopList || [];
        commit('UPDATE_PAGE_HEIGHT', { height, list });
      });
    },
    pageChange({ commit }, payload) {
      const obj = {
        add: 'ADD_COMPONENT',
        delete: 'DELETE_COMPONENT',
        edit: 'EDIT_COMPONENT',
      };
      const commitFn = obj[payload.type];
      commitFn && commit(commitFn, payload);
      // 组件变化之后，数据因该同步到h5同步更新
      commit('VIEW_UPDATE');
    },
  },
  modules,
});
Vue.store = store;
export default store;
