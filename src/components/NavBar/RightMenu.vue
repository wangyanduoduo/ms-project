<!--
 * @Author: wy
 * @Date: 2023-09-21 15:22:46
 * @LastEditors: wy
 * @LastEditTime: 2023-09-21 15:41:50
 * @FilePath: /笔记/cms/ms-project/src/components/NavBar/RightMenu.vue
 * @Description: 
-->
<template>
  <div class="right-menu">
    <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      @visible-change="toggleDropdown"
    >
      <div class="avatar-wrapper">
        <p class="user-name">name</p>
        <i
          class="el-icon-arrow-down el-icon--right"
          :class="isDropdownOpen ? 'open' : ''"
        />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="logout">登出</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'rightMenu',
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown(e) {
      this.isDropdownOpen = e;
    },
    logout() {
      // todo
    },
  },
};
</script>

<style lang="less" scope>
.right-menu {
  display: flex;
  align-items: center;
  padding-right: 16px;
  justify-content: flex-end;
  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 16px;
    color: #303133;
    vertical-align: text-bottom;
    &:last-child {
      padding-right: 0;
    }
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    .avatar-wrapper {
      position: relative;
      white-space: nowrap;

      .user-name {
        cursor: pointer;
        display: inline-block;
      }
      .el-icon--right {
        font-size: 16px;
        -webkit-transition: -webkit-transform 0.3s;
        transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        margin-left: 8px;
        margin-right: 0 !important;
        &.open {
          transform: rotateZ(180deg);
        }
      }

      .sa-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
