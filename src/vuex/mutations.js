export default {
  // --------admin--------
  token (state, token) {
    state.admin.token = token
  },
  loginLoading (state, bool) {
    state.admin.loading = bool
  },
  loginMsg (state, msg) {
    state.admin.msg = msg
  },

  // --------回访列表--------
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

  // --------客户--------
  customerAllList (state, users) {
    state.customer.allList.data = users
  },
  customerAllListPage (state, page) {
    state.customer.allList.page = page
  },
  customerAllListLoading (state, bool) {
    state.customer.allList.loading = bool
  },
  customerAllListTotal (state, total) {
    state.customer.allList.total = total
  },
  // 添加 到待分发列表
  customerSelectListPush (state, userId) {
    const user = state.customer.allList.data.find(user => {
      return user.id === userId
    })
    state.customer.selectList.data.push(user)
  },
  // 从待分发列表 删除
  customerSelectListSplice (state, userId) {
    console.log(userId)
    const user = state.customer.selectList.data.find(user => {
      return user.id === userId
    })
    state.customer.selectList.data.splice(state.customer.selectList.data.indexOf(user), 1)
  },
  customerSelectListSubmitLoading (state, bool) {
    state.customer.selectList.submitLoading = bool
  },

  // --------客服--------
  waiterAllList (state, waiter) {
    state.waiter.list = waiter
  }


}