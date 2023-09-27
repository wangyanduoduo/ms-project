/*
 * @Author: wy
 * @Date: 2023-09-22 15:56:14
 * @LastEditors: wy
 * @LastEditTime: 2023-09-22 15:56:22
 * @FilePath: /笔记/cms/ms-project/src/store/getters.js
 * @Description:
 */
const getters = {
  pageComponentTotalMap: (state) => {
    let map = {};
    let cList = state.pageData.componentList || [];
    let cName;
    cList.forEach((c) => {
      cName = c.data.component;
      if (map[cName]) {
        map[cName] += 1;
      } else {
        map[cName] = 1;
      }
    });
    return map;
  },
};

export default Object.assign({}, getters);
