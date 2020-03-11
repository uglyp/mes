import loading from '@/libs/loading';
import auth from '@/service/auth';
import checkPermission from '@/service/permission';

export default {
  showLoading(to, from, next) {
    if (from.matched.length !== 0) {
      loading.show();
    }
    next();
  },

  auth(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      // auth
      //   .loggedIn()
      //   .then(() => {
      //     next();
      //   })
      //   .catch(() => {
      //     loading.close();
      //     next({ path: '/login', query: { redirectUrl: to.fullPath } });
      //   });
      next();
    } else {
      next(); // 确保一定要调用 next()
    }
  }
};
