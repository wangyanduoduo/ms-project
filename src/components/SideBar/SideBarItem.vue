<!--
 * @Author: wy
 * @Date: 2023-09-19 21:03:53
 * @LastEditors: wy
 * @LastEditTime: 2023-09-20 14:34:21
 * @FilePath: /笔记/cms/ms-project/src/components/SideBar/SideBarItem.vue
 * @Description: 
-->
<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 渲染没有孩子的链接 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <menu-link
        :to="resolvePath(onlyOneChild.path)"
        v-if="onlyOneChild.meta && onlyOneChild.meta.title"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          class="submenu-title-noDropdown"
        >
          <i class="el-icon-tickets" />
          {{ onlyOneChild.meta.title }}
        </el-menu-item>
      </menu-link>
    </template>
    <!-- 有孩子的链接 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
import { Validator } from '@bigbighu/cms-utils';
import MenuLink from './Link';
import Item from './Item';

export default {
  name: 'SideBarItem',
  components: { MenuLink, Item },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null; // 可以在其他组件中被调用
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        return true;
      });
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noShowingChildren: true,
        };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (Validator.isExternal(routePath)) {
        return routePath;
      }
      if (Validator.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scope>
#app .hideSidebar .el-submenu > .el-submenu__title .iconfont {
  margin-left: 18px;
}
#app .el-menu-item {
  display: flex;
  align-items: center;
}
#app .el-menu-item [class^='el-icon-'] {
  font-size: 20px;
}
</style>
