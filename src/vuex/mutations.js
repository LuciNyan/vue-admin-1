export default {
  // ----admin----
  token (state, token) {
    state.admin.token = token
  },
  loginLoading (state, bool) {
    state.admin.loading = bool
  },
  loginMsg (state, msg) {
    state.admin.msg = msg
  },

  // ----回访列表----
  // 更新促成回访记录列表数据
  facilitateList (state, users) {
    state.facilitateList.data = users
  },
  // 更改促成回访列表加载状态
  facilitateListLoading(state, bool) {
    state.facilitateList.loading = bool
  },
  // 更改total
  facilitateListTotal (state, total) {
    state.facilitateList.total = total
  },
}