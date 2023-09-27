<!--
 * @Author: wy
 * @Date: 2023-09-19 22:54:16
 * @LastEditors: wy
 * @LastEditTime: 2023-09-19 23:07:27
 * @FilePath: /笔记/cms/ms-project/src/components/SideBar/Item.vue
 * @Description: 
-->
<script>
// import '@/assets/iconfont/iconfont.css';
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    const classStr = 'iconfont icon-' + icon;
    if (icon) {
      vnodes.push(<i class={classStr}> </i>);
    }
    if (title) {
      vnodes.push(<span v-slot="title"> {title}</span>);
    }
    console.log(vnodes, 'context');
    return vnodes;
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 18px;
  color: #bfcbd9;
}
</style>
