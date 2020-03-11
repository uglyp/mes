
export default {
  /**
   *
   * @param fn {Function}   实际要执行的函数
   * @param delay {Number}  延迟时间，单位是毫秒（ms）
   *
   * @return {Function}     返回一个“防反跳”了的函数
   */

  debounce(fn, delay) {
    // 定时器，用来 setTimeout
    let timer;

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function debounce(...args) {
      // 保存函数调用时的上下文和参数，传递给 fn
      const context = this;

      // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
      clearTimeout(timer);

      // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
      // 再过 delay 毫秒就执行 fn
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  },

  /**
   * 首字母大写
   * @param {*} str
   */
  firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * 生成UUID
   */
  createUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    return uuid;
  },

  /**
   * 弹层弹出后禁止body滚动
   *
   * @param {any} flag
   */
  preventBodyScroll(flag) {
    if (flag) {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;left:0px;right:0px';
    } else {
      const body = document.body;
      body.style.position = '';
      const top = body.style.top;
      document.body.scrollTop = -parseInt(top, 10);
      document.documentElement.scrollTop = -parseInt(top, 10);
      body.style.top = '';
    }
  },

  setDocTitle(title) {
    document.title = title || '';

    // ios需要通过加载 iframe 来刷新 title
    // if (
    //   detect.os.ios &&
    //   navigator.userAgent.indexOf('MobankerMobileType') === -1
    // ) {
    //   const iframe = document.createElement('iframe');
    //   iframe.setAttribute('src', '/static/favicon.ico');
    //   iframe.style.display = 'none';
    //   iframe.addEventListener('load', () => {
    //     setTimeout(() => {
    //       document.body.removeChild(iframe);
    //     }, 10);
    //   });
    //   document.body.appendChild(iframe);
    // }
  },

  /**
   * body上添加/删除类名
   * @param {string} className 类名
   * @param {add | remove} action 添加或删除
   */
  toggleBodyClass(className, action) {
    const docEl = document.getElementsByTagName('body')[0];

    if (action === 'add') {
      docEl.classList.add(className);
    } else if (action === 'remove') {
      docEl.classList.remove(className);
    }
  },

  pick(obj, ...keys) {
    if (typeof obj !== 'object') return {};

    const result = {};
    Object.keys(obj).forEach(key => {
      if (keys.indexOf(key) >= 0) {
        result[key] = obj[key];
      }
    });

    return result;
  },

  /**
   *
   * @param {string} ip ip地址
   */
  checkLocalIP(ip) {
    const ipAddress = ip || location.hostname;

    if (ipAddress === '127.0.0.1' || ipAddress === 'localhost') {
      return true;
    }

    const arrIpAddress = ipAddress.split('.');

    if (arrIpAddress[0] === '10') {
      return true;
    }

    if (arrIpAddress[0] === '192' && arrIpAddress[1] === '168') {
      return true;
    }

    if (arrIpAddress[0] === '172') {
      const num = parseInt(arrIpAddress[1], 10);

      if (num >= 16 && num <= 31) {
        return true;
      }
    }

    return false;
  },

  checkIP(ip) {
    ip = ip || location.hostname;
    const reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; // 正则表达式
    if (reg.test(ip)) {
      if (
        RegExp.$1 < 256 &&
        RegExp.$2 < 256 &&
        RegExp.$3 < 256 &&
        RegExp.$4 < 256
      ) {
        return true;
      }
    }
    return false;
  },

  /**
   * 文件引入
   * @param {} r
   * @param {*} type
   */
  importAll(r, type = 'object') {
    const modules = type === 'object' ? {} : [];

    r.keys().forEach(key => {
      let moduleKey = key.replace(/(\.\/|\.js)/g, '');
      const moduleKeyArr = moduleKey.split(/[-/]/);

      moduleKey = '';
      moduleKeyArr.forEach((item, index) => {
        moduleKey += index > 0 ? this.firstLetterUpper(item) : item;
      });

      if (type === 'object') {
        modules[moduleKey] = r(key).default;
      } else {
        modules.push(r(key).default);
      }
    });

    return modules;
  },

  pxToRem(d, rootValue = 75) {
    let val = (parseFloat(d) / rootValue).toFixed(6);
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  loadScript(url, callback = () => {}) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');

    if (typeof url === 'string') {
      url = {
        src: url
      };
    }

    script.type = 'text/javascript';
    script.async = true;
    script.src = url.src;

    // script 属性
    if (url.attrs) {
      Object.keys(url.attrs).forEach(key => {
        script.setAttribute(key, url.attrs[key]);
      });
    }

    // callback 执行
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (this.readyState === 'complete' || script.readyState === 'loaded') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // 其他浏览器
      script.onload = () => {
        callback();
      };
    }

    head.appendChild(script);
  }
};
