<!--
 * @Author: wy
 * @Date: 2023-09-19 20:34:16
 * @LastEditors: wy
 * @LastEditTime: 2023-09-20 14:02:30
 * @FilePath: /笔记/cms/ms-project/src/components/SideBar/index.vue
 * @Description: 
-->
<template>
  <div class="side-container">
    <div @click="goHome" class="system-title">cms页面配置系统</div>
    <el-menu
      :collapse="false"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="true"
      active-text-color="#409EFF"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <side-bar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      >
      </side-bar-item>
    </el-menu>
  </div>
</template>

<script>
import { permissionRoutes } from './pemissionRoutes.js';
import SideBarItem from './SideBarItem.vue';
export default {
  name: 'SideBar',
  components: {
    SideBarItem,
  },
  data() {
    return {
      permission_routes: permissionRoutes,
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
  },
};
</script>

<style lang="less" scope>
.system-title {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background-color: #288ce3;
  img {
    margin-right: 5px;
    width: 50px;
    height: 50px;
  }
}
</style>
