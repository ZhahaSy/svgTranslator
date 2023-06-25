import axios, { AxiosRequestConfigPluginOriginalData } from 'axios';
import { nanoid } from 'nanoid';
import { showFailToast } from 'vant';
import { API_ERROR_CODE } from '@/constants';
// import { projectConfig } from '@/config';

/**
 * API 请求前缀
 */
export const API_BASE_URL = '/api/budget';

const CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '请求参数错误',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '接口地址不存在',
  405: '请求方式不支持。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const DashboardMap = {
  uat: 'http://alpha.dashboard.bilibili.co/login.html?caller=uat-ee&path=',
  pre: 'https://dashboard-mng.biliapi.net/api/v4/user/dashboard_login?caller=pre-ee&path=',
  prod: 'https://dashboard-mng.biliapi.net/api/v4/user/dashboard_login?caller=ee&path=',
};

const instance = axios.create({
  withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    'X-AppKey': 'ops.fin-api.purchase',
  },
});

// CSRF
instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['X-CSRF'] = nanoid();
  }
  return config;
});

// MOCK
// TODO: 这里应该需要读取 VITE_BASE_URL，拼接 baseURL
instance.interceptors.request.use((config) => {
  // let baseURL = import.meta.env.VITE_MOCK === 'mock' ? '' : '/api';
  // let needMock = projectConfig.mock !== 'none';
  // needMock = needMock && (!projectConfig.pickMode || !!(projectConfig.pickMode && config.headers?.['x-mock']));
  // if (needMock) {
  //   baseURL = projectConfig.mock === 'local' ? '/localMock' : '/mock';
  // }
  // config.baseURL = baseURL;
  config.baseURL = API_BASE_URL;
  return config;
});

// 登录失效
instance.interceptors.response.use((response) => {
  if (response.data.code === API_ERROR_CODE.NOT_LOGGED_IN) {
    const { pathname, search, hostname } = window.location;
    let href = '';
    if (process.env.NODE_ENV === 'development') {
      href = DashboardMap.uat;
    } else {
      const currentEnv = ['uat', 'pre'].find((i) => hostname.includes(i));
      href = DashboardMap[currentEnv || 'prod'];
    }
    window.location.replace(href + (pathname || '/') + search);
    // 如果是未登录，则自动将 quiet 设置为 true，不展示错误 提示
    response.config.quiet = true;
  }
  return response;
});

// Error Toast
instance.interceptors.response.use(
  // 当 status >= 200 && status < 300 时，会进入此逻辑
  (response) => {
    const { data: responseData, config } = response;
    if (responseData.code !== 0) {
      if (!config.skipError && !config.quiet) {
        showFailToast(responseData.message ?? '请求异常');
      }
      return Promise.reject(response);
    }
    if ((config as AxiosRequestConfigPluginOriginalData<unknown>).originalResponse) {
      return responseData;
    }
    return responseData.data;
  },
  // 当 status > 300 时，会进入此逻辑
  (error) => {
    if (error.response && !error.config.quiet && !error.config.skipError) {
      showFailToast(CodeMessage[error.response.status] ?? '请求异常');
    }
    return Promise.reject(error);
  },
);

export default instance;
