<!--
 * @Author: wy
 * @Date: 2023-09-13 18:09:18
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 16:15:55
 * @FilePath: /笔记/cms/ms-project/src/App.vue
 * @Description: 
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>
