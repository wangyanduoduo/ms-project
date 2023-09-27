<!--
 * @Author: wy
 * @Date: 2023-09-20 14:04:31
 * @LastEditors: wy
 * @LastEditTime: 2023-09-21 15:40:39
 * @FilePath: /笔记/cms/ms-project/src/components/NavBar/index.vue
 * @Description: 
-->
<template>
  <el-header class="flex-row-center">
    <div class="flex-row-center">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>

    <right-menu></right-menu>
  </el-header>
</template>

<script>
import Hamburger from '@/components/Hamburger';
import Breadcrumb from '@/components/Breadcrumb';
import RightMenu from './RightMenu.vue';
export default {
  components: {
    Hamburger,
    Breadcrumb,
    RightMenu,
  },
};
</script>

<style lang="less" scope>
.flex-row-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
