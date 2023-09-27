<!--
 * @Author: wy
 * @Date: 2023-09-22 11:40:34
 * @LastEditors: wy
 * @LastEditTime: 2023-09-27 14:09:05
 * @FilePath: /笔记/cms/ms-project/src/pages/decorate/components/PageView.vue
 * @Description: 
-->
<template>
  <div class="page-view">
    <div class="preview">
      <div class="preview-head">
        <div class="preview-head-title">
          {{ pageData.name || '微页面标题' }}
        </div>
      </div>
      <div class="preview-wrap">
        <iframe
          id="previewIframe"
          class="preview-iframe"
          :src="previewSrc"
          title="频道名称"
          frameborder="0"
          allowfullscreen
          width="100%"
          :height="previewHeight"
          @load="onloadH5"
        />
      </div>
      <div class="preview-drag-mask" @dragover="onDragover($event)" />
      <div class="preview-drag-out" @dragover="onDragout($event)" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import settings from '@/config';
export default {
  name: 'pageView',
  computed: {
    ...mapState(['pageData', 'previewHeight']),
    previewSrc() {
      return (
        settings.decorateViewSrc +
        `?pageId=${this.$route.query.id || ''}&noLogin=true`
      );
    },
  },
  methods: {
    ...mapMutations(['VIEW_UPDATE']),
    // 进入页面需要监听h5项目的渲染，以便获取信息
    ...mapActions(['initMessage']),
    onDragover() {},
    onDragOut() {},
    onloadH5() {
      this.VIEW_UPDATE();
    },
  },
  mounted() {
    this.initMessage();
  },
};
</script>

<style lang="less" scope>
.page-view {
  position: absolute;
  top: 56px;
  left: 186px;
  right: 376px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  user-select: none;

  .preview {
    .preview-head {
      height: @content-header-height;
      width: 375px;
      margin: 72px auto 0;
      background: url('~@/assets/img/layout/header_bg.png') left top no-repeat;
      background-size: cover;
      position: relative;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      .preview-head-title {
        width: 180px;
        margin: 0 auto;
        height: 64px;
        font-size: 14px;
        text-align: center;
        padding-top: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .preview-iframe {
      min-height: 600px;
    }
    .preview-drag-mask {
      position: absolute;
      left: 50%;
      top: 60px;
      bottom: 20px;
      width: 520px;
      margin-left: -260px;
      z-index: 10;
      // background-color: red;
    }
    .preview-drag-out {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9;
      // background-color: yellow;
    }
  }
}
</style>
