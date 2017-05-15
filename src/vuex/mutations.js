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
  customerList (state, para) {
    let { type, users } = para
    if (type === 'all') {
      state.customer.allList.data = users
    } else {
      state.customer.myList.data = users
    }
  },
  customerListLoading (state, para) {
    let { type, bool } = para
    if (type === 'all') {
      state.customer.allList.loading = bool
    } else {
      state.customer.myList.loading = bool
    }
  },
  customerListTotal (state, para) {
    let { type, total } = para
    if (type === 'all') {
      state.customer.allList.total = total
    } else {
      state.customer.myList.total = total
    }
  },
  customerAllListPage (state, page) {
    state.customer.allList.page = page
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
    state.customerService.list = waiter
  }


}