export default {
  // ----用户相关----
  getToken (state) {
    return state.admin.token
  },
  getLoginLoading (state) {
    return state.admin.loading
  },
  getLoginMsg (state) {
    return state.admin.msg
  },

  // ----回访----
  getFacilitateList (state) {
    return state.facilitateList.data
  },
  getFacilitateListLoading (state) {
    return state.facilitateList.loading
  },
  getFacilitateListTotal (state) {
    return state.facilitateList.total
  }
}
