<!--
 * @Author: wy
 * @Date: 2023-09-22 11:40:34
 * @LastEditors: wy
 * @LastEditTime: 2023-10-08 17:43:17
 * @FilePath: /笔记/cms/ms-project/src/pages/decorate/components/PageRight.vue
 * @Description: 
-->
<template>
  <div>
    <change-set-type v-model="setType"></change-set-type>
  </div>
</template>

<script>
import ChangeSetType from './components/ChangeSetType';
export default {
  components: {
    ChangeSetType,
  },
  computed: {
    setType: {
      get: function () {
        return this.$store.state.setType;
      },
      set: function (val) {
        this.$store.commit('SET_SETTYPE', val);
      },
    },
  },
};
</script>

<style lang="less" scope></style>
