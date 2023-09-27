<!--
 * @Author: wy
 * @Date: 2023-09-20 14:21:02
 * @LastEditors: wy
 * @LastEditTime: 2023-09-21 15:51:19
 * @FilePath: /笔记/cms/ms-project/src/components/Breadcrumb/index.vue
 * @Description: 
-->
<template>
  <el-breadcrumb separator="/" style="margin-left: 10px">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!-- 最后一个没有点击事件 -->
        <span v-if="index === levelList.length - 1">{{ item.meta.title }}</span>
        <!-- 需要点击事件 -->
        <span v-else @click.prevent="handleLink(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matchList = this.$route.matched;
      matchList = matchList.filter((item) => {
        return item.meta && item && item.meta.title;
      });
      const firstRoute = matchList[0];

      if (!this.isHome(firstRoute)) {
        // 增加一个首页
        matchList = [{ path: '/home', meta: { title: '首页' } }].concat(
          matchList
        );
      }

      this.levelList = matchList.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase();
    },
    // pathCompile(path) {
    //   const { params } = this.$route
    //   var toPath = pathToRegexp.compile(path)
    //   return toPath(params)
    // },
    // handleLink(item) {
    //   const { redirect, path } = item;
    //   if (redirect) {
    //     this.$router.push(redirect);
    //     return;
    //   }
    //   this.$router.push(this.pathCompile(path));
    // },
  },
  created() {
    this.getBreadcrumb();
  },
};
</script>

<style lang="less" scope></style>
