import { getUserListPage, requestLogin, removeUser, batchRemoveUser, editUser, addUser } from '../api/api';
export default {
  // -----------------------登录------------------------
  login (context, params) {
    context.commit('loginLoading', true)
    // 开始登录请求
    requestLogin(params).then(re_data => {
      let { msg, code, data } = re_data;
      if (code !== 200) {
        context.commit('loginMsg', msg)
      } else {
        sessionStorage.setItem('token', JSON.stringify(data.access_token))
        context.commit('token', data.access_token)
      }
      // 取消登录loading
      context.commit('loginLoading', false)
    })
  },
  // ----登出----
  logout (context) {
    context.commit('token', '')
  },
  // ----重置msg----
  resetLoginMsg (context) {
    context.commit('loginMsg', '')
  },

  // -----------------------促成与回访记录------------------------
  // ----获取促成回访列表----
  getFacilitateList (context, para) {
    // 开启loading
    context.commit('facilitateListLoading', true)
    getUserListPage(para).then((res) => {
      let res_data = res.data.data
      console.log(res_data)
      context.commit('facilitateListTotal', res_data.total)
      context.commit('facilitateList', res_data.data)
      context.commit('facilitateListLoading', false)
    })
  },

  //

}
