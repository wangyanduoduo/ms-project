<!--
 * @Author: wy
 * @Date: 2023-09-22 11:20:15
 * @LastEditors: wy
 * @LastEditTime: 2023-09-26 17:39:44
 * @FilePath: /笔记/cms/ms-project/src/pages/decorate/components/PageHead.vue
 * @Description: 
-->
<template>
  <div>----header-----</div>
</template>

<script>
export default {};
</script>

<style lang="less" scope>
.page-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: @page-header-height;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .go-back {
    float: left;
    line-height: 55px;
    font-size: 14px;
    color: #4f4f4f;
    cursor: pointer;
    .logo {
      display: inline-block;
      vertical-align: middle;
      margin: -2px 4px 0 0;
      max-width: 30px;
      max-height: 30px;
    }
  }
}
</style>
