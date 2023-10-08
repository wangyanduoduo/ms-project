/*
 * @Author: wy
 * @Date: 2023-09-26 16:44:07
 * @LastEditors: wy
 * @LastEditTime: 2023-10-07 17:24:12
 * @FilePath: /笔记/cms/ms-project/src/utils/postMessage.js
 * @Description:
 */
// 配置监听对象
export class Messager {
  constructor(targetOrigin) {
    this.targetOrigin = targetOrigin;
    // 存放监听的方法
    this.actions = {};
    this.messageListener = (event) => {
      // 监听方法的类型和调用方法，对应的方法存在在actions里面
      const type = event.data && event.data.type;
      if (event.origin === this.targetOrigin && type && this.actions[type]) {
        this.actions[type](event.data.value);
      }
    };
    window.addEventListener('message', this.messageListener);
  }
  // 监听指定的消息
  on(type, cb) {
    this.actions[type] = cb;
    return this;
  }
  // 发送指定的消息,把消息发送到h5项目
  emit(type, value) {
    // 获取iframe
    let win = document.getElementById('previewIframe').contentWindow;
    win.postMessage(
      {
        type,
        value,
      },
      this.targetOrigin
    );
    return this;
  }
  // 移除监听事件
  destroy() {
    window.removeEventListener('message', this.messageListener);
    return this;
  }
}
