import deepMerge from 'deepmerge';
import qs from 'qs';
import http from './http';

/**
 * 组装http请求
 * @param  {[type]} urlVal [description]
 * @return {[type]}        [description]
 */
function assembleHttp(urlVal, ctx) {
  return (params = {}, config = {}) => {
    config = deepMerge.all([{}, ctx._baseConfig(), urlVal, config]);

    if (['post', 'put', 'patch'].indexOf(config.method) > -1) {
      config.data = Object.assign(config.data || {}, params);

      if (
        config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ) {
        config.data = qs.stringify(config.data);
      }
    } else {
      config.params = Object.assign(config.params || {}, params);
    }

    return http(config).then(response => {
      const { data, data: { code, message, result } } = response
      // console.log('errordata', data)
      if (code === 200) {
        return result
      }

      if (code === 300) {
        return data
      }

      // return data
      return Promise.reject(message)
    }
    );
  };
}

/**
 * 填充方法
 * @param  {[type]} apiObj [description]
 * @param  {[type]} urls   [description]
 * @return {[type]}        [description]
 */

/**
 * Api 类
 */
class Api {
  constructor(urls, baseConfig) {
    this._baseConfig = baseConfig;
    this._urls = urls;
    this._init();
  }
  /**
   * 作为Vue插件进行安装，挂载到Vue.prototype
   */
  install(Vue) {
    Vue.prototype.$api = this;
  }

  _init() {
    function fillMethods(apiObj, urls, ctx) {
      const urlKeys = Object.keys(urls);

      urlKeys.forEach(urlKey => {
        let urlVal = urls[urlKey];
        if (typeof urlVal === 'string' || urlVal.url) {
          urlVal =
            typeof urlVal !== 'string'
              ? urlVal
              : {
                url: urlVal
              };

          apiObj[urlKey] = assembleHttp(urlVal, ctx);
        } else {
          apiObj[urlKey] = {};
          fillMethods(apiObj[urlKey], urlVal, ctx);
        }
      });
    }

    const { _urls: urls } = this;

    fillMethods(this, urls, this);
  }
}

// fillMethods(Api.prototype, urls);

export default Api;
