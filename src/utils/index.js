/*
 * @Author: wy
 * @Date: 2023-09-22 15:22:50
 * @LastEditors: wy
 * @LastEditTime: 2023-09-26 17:23:20
 * @FilePath: /笔记/cms/ms-project/src/utils/index.js
 * @Description:
 */
export * from './postMessage.js';
/**
 * 生成随机id 添加组件时生成
 */
export function createRandomId() {
  return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
    36
  );
}
