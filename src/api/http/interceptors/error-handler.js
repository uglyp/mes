import { Message } from 'element-ui';
import auth from '@/service/auth';

function errorHandler(data) {
  const { message } = data;

  Message.error({
    message: message || '请求出错, 请稍后重试',
    duration: 3000
  });
}

export default instance => {
  // Add a response interceptor
  instance.interceptors.response.use(
    response => {
      const data = response.data;
      if (data.success === false) {
        if (response.config.showDefaultError !== false) {
          // TODO:
          if (data.error === '01000101' || data.error === '01000100') {
            auth.expireToLogin();
            return data;
          }
          errorHandler(data);
        }

        return response;
      }

      return response;
    },
    error => {
      // Do something with response error
      const data = {
        error,
        msg: ''
      };

      if (error.response) {
        data.msg = error.response.data && error.response.data.msg;
      } else {
        data.msg = error.message && '当前网络不可用，请稍后重试！';
      }

      if (error.config && error.config.showDefaultError !== false) {
        errorHandler(data);
      }

      return Promise.reject(error);
    }
  );
};
