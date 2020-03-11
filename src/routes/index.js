import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';
import loginRouter from './login';
import dashboardRouter from './layout';
import notFoundRouter from './not-found';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      x: 0,
      y: 0
    };
  },
  routes: [...loginRouter, ...dashboardRouter, ...notFoundRouter]
});

// 添加导航钩子
hooks(router);

export default router;
