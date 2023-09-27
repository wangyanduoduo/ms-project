<template>
  <div class="home">
    <page-head></page-head>
    <page-left></page-left>
    <page-view></page-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getCmsPageById } from '@/api/activity';
import PageHead from './components/PageHead';
import PageLeft from './components/PageLeft';
import PageView from './components/PageView';
import { createRandomId } from '@/utils';
export default {
  components: {
    PageHead,
    PageLeft,
    PageView,
  },
  methods: {
    ...mapMutations(['UPDATE_COMPONENT']),
    init() {
      this.getData();
    },
    getData() {
      const pageId = this.$route.query.id;
      if (pageId) {
        getCmsPageById(pageId).then(({ data }) => {
          this.postDataToH5(data);
        });
      }
    },
    postDataToH5(data) {
      // 获取页面的数据,同步到h5的项目
      if (data && data.componentList) {
        data.componentList.forEach((item) => {
          if (item.data.validTime && typeof item.data.validTime === 'string') {
            item.data.validTime = JSON.parse(item.data.validTime);
          }
          // 获取的组件数据无id则手动设置随机id
          if (!item.id) {
            const id = createRandomId();
            item.id = item.data.component + '-' + id;
          }
        });
      }
      this.UPDATE_COMPONENT(data);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scope></style>
