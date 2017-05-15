import axios from './config'

let base = process.env.NODE_ENV === 'production' ? 'http://haru.xjycfapi.com/api/v1' : '/api'

export const requestLogin = params => { return axios.post(`${base}/login/android`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// -----------new-----------
export const getALLCustomerListPage = params => { return axios.get(`${base}/queryCustomer`, { params: params }).then(res => res.data) }
export const getUserListPage = params => { return axios.get(`${base}/queryCustomerVisitRecordsAll`, { params: params }).then(res => res.data) };
export const createCustomer = params => { return axios.post(`${base}/createCustomer`, params).then(res => res.data) }
export const getAllWaiter = () => { return axios.get(`${base}/queryCustomerService`).then(res => res.data) }
export const divideCustomer = params => { return axios.post(`${base}/divideCustomer`, params).then(res => res.data) }

