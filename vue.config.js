/*
 * @Author: wy
 * @Date: 2023-09-14 16:55:57
 * @LastEditors: wy
 * @LastEditTime: 2023-09-28 19:23:18
 * @FilePath: /笔记/cms/ms-project/vue.config.js
 * @Description:
 */
const path = require('path');
module.exports = {
  publicPath: '/cms-manage/',
  outputDir: 'build',
  devServer: {
    host: '127.0.0.1',
    hot: true,
    open: true,
    port: 3011,
    // openPage: '/cms-manage', // 指定浏览器打开时的导航页面
    proxy: {
      '/api/atlas-cms': {
        target: 'http://127.0.0.1:3300',
        pathRewrite: {
          '^/api/atlas-cms': '/atlas-cms',
        },
      },
    },
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/mixin.less')], // 定义公共样式文件
    });
}
