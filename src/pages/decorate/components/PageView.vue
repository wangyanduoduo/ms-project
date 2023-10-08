<!--
 * @Author: wy
 * @Date: 2023-09-22 11:40:34
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 16:36:22
 * @FilePath: /笔记/cms/ms-project/src/pages/decorate/components/PageView.vue
 * @Description: 
-->
<template>
  <div class="page-view" ref="pageView">
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
      <!-- 元素到达放置区域 -->
      <div
        v-if="dragActive"
        class="preview-drag-mask"
        @dragover="onDragover($event)"
      />
      <!-- 元素离开放置区域 -->
      <div
        v-if="dragActive"
        class="preview-drag-out"
        @dragover="onDragOut($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import settings from '@/config';
export default {
  name: 'pageView',
  computed: {
    ...mapState([
      'pageData',
      'previewHeight',
      'dragActive',
      'componentsTopList',
      'addComponentIndex',
    ]),
    previewSrc() {
      return (
        settings.decorateViewSrc +
        `?pageId=${this.$route.query.id || ''}&noLogin=true`
      );
    },
  },
  methods: {
    ...mapMutations([
      'VIEW_UPDATE',
      'SET_DRAG_INDEX',
      'VIEW_ADD_PREVIEW',
      'VIEW_DELETE_PREVIEW',
    ]),
    // 进入页面需要监听h5项目的渲染，以便获取信息
    ...mapActions(['initMessage', 'pageChange']),
    onDragover(event) {
      // 取消默认行为
      event.preventDefault();
      // 放置元素的地方距离浏览器的顶部距离
      const viewWrapTop = 191; // 由元素的放置排布计算得到的
      // 放置元素的位置，需要计算（永远相对h5的浏览窗口）所以要考虑scrollTop
      let dropTop = this.$refs.pageView.scrollTop + event.pageY - viewWrapTop;
      // 定义新组建的位置
      let addIndex = 0;
      for (let i = this.componentsTopList.length - 1; i >= 0; i--) {
        const valueIndex = this.componentsTopList[i];
        const preValueIndex = this.componentsTopList[i - 1] || 0;
        const half = (valueIndex - preValueIndex) / 2; // 当前组件高度的一半
        if (i === 0 && dropTop <= half) break;
        if (dropTop > valueIndex - half) {
          addIndex = i + 1;
          break;
        }
      }
      if (this.addComponentIndex === addIndex) return; // 节约性能
      this.SET_DRAG_INDEX(addIndex);
      this.VIEW_ADD_PREVIEW(addIndex);
    },
    onDragOut(event) {
      event.preventDefault();
      // 组件被拖动了，但是又没有添加的时候
      if (this.addComponentIndex !== null) {
        this.SET_DRAG_INDEX(null);
        this.VIEW_DELETE_PREVIEW();
      }
    },
    onloadH5() {
      this.VIEW_UPDATE();
    },
  },
  mounted() {
    this.initMessage();
  },
};
</script>

<style lang="less" scoped>
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
}
.cache-box {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background: @color-1-bg;
  border: 1px solid @color-1;
  padding: 0 10px;
  z-index: 2;
  .color-1 {
    cursor: pointer;
  }
  .cache-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    color: #aaa;
  }
}
.preview {
  position: absolute;
  width: 100%;
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
  }
  .preview-drag-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
}
</style>
