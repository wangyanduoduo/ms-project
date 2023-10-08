<!--
 * @Author: wy
 * @Date: 2023-09-14 17:38:11
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 16:34:15
 * @FilePath: /笔记/cms/ms-project/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container style="height: 100vh" class="app-wrapper">
    <side-bar class="sidebar-container"></side-bar>
    <el-container direction="vertical" class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>
<script>
import { SideBar, NavBar, AppMain } from '@/components';
export default {
  name: 'layout',
  components: {
    SideBar,
    NavBar,
    AppMain,
  },
};
</script>
<style lang="less" scoped>
.app-wrapper {
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.sidebar-container {
  width: 200px;
  background-color: rgba(48, 65, 86, 1);
  ::v-deep {
    .el-menu {
      width: 100%;
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 220px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
#app .hideTree {
  margin-left: 0 !important; // 隐藏左侧菜单
}
</style>
