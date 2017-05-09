import axios from 'axios'
import store from '../vuex/store'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 查询session 中存在的token
    const token = JSON.parse(sessionStorage.getItem('token'))
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = `application/json`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
);

let base = process.env.NODE_ENV === 'production' ? 'http://haru.xjycfapi.com/api/v1' : '/api'

export const createCustomer = params => { return axios.post(`${base}/createCustomer`, params).then(res => res.data) }

export const requestLogin = params => { return axios.post(`${base}/login/android`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/queryCustomerVisitRecordsAll`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
// -----------new-----------
export const getFacilitateListPage = params => { return axios.get(`${base}/customer/facilitateList`, { params: params }); };
