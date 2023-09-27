<!--
 * @Author: wy
 * @Date: 2023-09-19 21:13:37
 * @LastEditors: wy
 * @LastEditTime: 2023-09-19 22:29:16
 * @FilePath: /笔记/cms/ms-project/src/components/SideBar/Link.vue
 * @Description: 
-->
<template>
  <!-- 跳转的链接分内部链接/外部链接 -->
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { Validator } from '@bigbighu/cms-utils';
export default {
  name: 'Link',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    linkProps(url) {
      if (Validator.isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
        };
      }
      return {
        is: 'router-link',
        to: url,
      };
    },
  },
};
</script>

<style lang="less" scope></style>
