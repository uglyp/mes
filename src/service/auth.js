import storage from '@/libs/storage';
import Router from '@/routes';
import api from '@/api';
import eventBus from '@/libs/event-bus';
import store from '@/store';
import { eventConf } from '@/config';

export default {
  getToken() {
    const token = storage.get('token');
    return token || '';
  },

  getCorpid() {
    const user = this.getUser()
    return user && user.corpid || ''
  },

  getBusId() {
    const user = this.getUser();

    return (user && user.id) || '';
  },

  getUser() {
    return storage.get('user');
  },

  getMenu() {
    return storage.get('menu');
  },

  expireToLogin() {
    const {
      currentRoute: { fullPath, name }
    } = Router;

    if (name !== 'login') {
      storage.remove('user');
      Router.push({ path: '/login', query: { redirectUrl: fullPath } });
      eventBus.$emit(eventConf.ELOGOUT);
    }
  },

  /**
   * 判断是否登录
   *
   * @returns
   */
  loggedIn() {
    const user = storage.get('user');

    return new Promise((resolve, reject) => {
      if (user && user.token) {
        resolve();
      } else {
        reject();
      }
    });
  },

  login(params) {
    return new Promise((resolve, reject) => {
      api.login.enter(params, { showDefaultError: false }).then(response => {
        if (response && response.code === 300) {
          resolve(response.message)
          return
        }
        const { empid, empname, empEnName, trueORFolase, corpid, factoryid, workShopid, classid, posid, comName, token } = response
        storage.set('token', token);
        // {
        //   empid,
        //   empname,
        //   empEnName,
        //   trueORFolase,
        //   corpid,
        //   factoryid,
        //   workShopid,
        //   classid,
        //   posid,
        //   comName
        // }
        storage.set('user', { ...response })
        store.dispatch('getMenu', { empId: empid })
        resolve();
      });
    });
  },

  logout() {
    this.expireToLogin();
  }
};
