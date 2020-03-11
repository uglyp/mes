import axios from 'axios';
import showLoading from './interceptors/show-loading';
import errorHandler from './interceptors/error-handler';

const instance = axios.create();

// 添加 showLoading 配置项
// 是否显示请求 loading
showLoading(instance);

// 添加 showDefaultError 配置项
// 是否默认错误处理
errorHandler(instance);

export default instance;
