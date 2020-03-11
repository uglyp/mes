import auth from '@/service/auth';
import Api from './api';
import urlTypes from './url-type';

// API 请求基础公用配置,可配置项参见 https://github.com/axios/axios#request-config
const baseConfig = () => {
  // const busId = auth.getBusId();
  const config = {
    baseURL: '',
    timeout: 1000 * 60 * 5,
    method: 'post',
    headers: {
      token: auth.getToken(),
      corpid: auth.getCorpid()
    },
    data: {
      // busId
    }
  };

  return config;
};

export default new Api(urlTypes, baseConfig);
