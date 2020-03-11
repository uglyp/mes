import loading from '@/libs/loading';

export default {
  /**
   * 改变title标题
   * @param  {[type]} route [description]
   * @return {[type]}       [description]
   */
  replaceDocTitle(route) {
    const {
      title
    } = route.meta;

    if (title) {
      document.title = `${title}-服装云`;
    }
  },

  /**
   * HTML上添加当前页的属性标记，便于某些css切换
   * @param {[type]} route [description]
   */
  addPageTag(route) {
    const docEl = document.documentElement;
    const {
      name = ''
    } = route;

    docEl.setAttribute('data-page', name);
  },

  closeLoading(route) {
    loading.close();
  }
};
