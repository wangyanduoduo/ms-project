<!--
 * @Author: wy
 * @Date: 2023-09-22 11:40:34
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 14:41:53
 * @FilePath: /笔记/cms/ms-project/src/pages/decorate/components/PageLeft.vue
 * @Description: 
-->
<template>
  <div class="page-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="(item, index) in componentList"
        :key="index"
        class="component-item"
        :title="item.title"
        :name="index + 1"
      >
        <ul class="component-list">
          <li
            v-for="(component, size) in item.components"
            :key="size"
            :class="
              draggableEnable(component) ? 'drag-enabled' : 'drag-disabled'
            "
            :draggable="draggableEnable(component)"
            @dragstart="onDragstart(component, $event)"
            @dragend="onDragend($event)"
          >
            <i :class="component.iconClass" style="font-size: 28px" />
            <p class="name">
              {{ component.name }}
            </p>
            <p class="num">
              {{
                `${componentMap[component.data.component] || 0}/${
                  component.maxNumForAdd
                }`
              }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex';
import componentList from '@/config/component-list';
export default {
  data() {
    return {
      componentList,
      activeNames: [1, 2],
    };
  },
  computed: {
    ...mapState(['addComponentIndex', 'dragComponent']),
    // 已使用的组件数量
    componentMap() {
      return mapGetters(['pageComponentTotalMap']);
    },
  },
  methods: {
    ...mapMutations([
      'SET_DRAG_STATE',
      'SET_DRAG_COMPONENT',
      'SET_DRAG_INDEX',
      'VIEW_SET_ACTIVE',
    ]),
    ...mapActions(['pageChange']),
    draggableEnable() {
      return true;
    },
    onDragstart(component) {
      this.SET_DRAG_STATE(true);
      this.SET_DRAG_COMPONENT(JSON.parse(JSON.stringify(component)));
      return component;
    },
    onDragend() {
      // 停止拖拽
      let addIndex = this.addComponentIndex;
      if (addIndex !== null) {
        const params = {
          index: addIndex,
          type: 'add',
          data: this.dragComponent,
        };

        this.pageChange(params);
        this.SET_DRAG_INDEX(null);
        this.VIEW_SET_ACTIVE(addIndex);
      }
      this.SET_DRAG_STATE(false);
    },
  },
};
</script>

<style lang="less" scope>
// 左侧框架
.page-left {
  position: absolute;
  top: 56px;
  left: 0;
  width: 186px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
  background: #fff;
  user-select: none;
}

// 组件列表
.component-item {
  padding: 0 20px;
  margin-top: 22px;
  .component-list {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      font-size: 12px;
      padding-bottom: 8px;
      text-align: center;
      &.drag-enabled {
        cursor: move;
      }
      &.drag-disabled {
        cursor: not-allowed;
      }
      &.drag-enabled:hover {
        background: @color-1;
        color: #fff;
        border-radius: 2px;
        .ico {
          background-position: 0 -32px;
        }
        .num,
        .name {
          color: #ffffff !important;
        }
      }
      .ico {
        display: inline-block;
        margin-top: 8px;
        background-position: 0 0;
        height: 32px;
        width: 32px;
        background-size: cover;
      }
      .name {
        line-height: 16px;
        margin-top: -4px;
      }
      .num {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

// 折叠面板样式
.el-collapse {
  border: none;
  ::v-deep .el-collapse-item__header {
    border: none;
    height: 30px;
    line-height: 30px;
  }
  ::v-deep .el-collapse-item__wrap {
    border: none;
  }
  ::v-deep .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
