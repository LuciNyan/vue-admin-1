export default {
  // --------用户相关--------
  getToken (state) {
    return state.admin.token
  },
  getLoginLoading (state) {
    return state.admin.loading
  },


  // --------回访--------
  getFacilitateList (state) {
    return state.facilitateList.data
  },
  getFacilitateListLoading (state) {
    return state.facilitateList.loading
  },
  getFacilitateListTotal (state) {
    return state.facilitateList.total
  },


  //-------客户--------
  // 在所有用户列表展示的数据
  getAllCustomerList (state) {
    return state.customer.allList.data.filter(user => {
      let flag = true
      // 在被选择列表中查找 如果 有该用户 则屏蔽该用户
      for (var selected of state.customer.selectList.data) {
        if  (selected.id === user.id) {
          flag = false
          break;
        }
      }
      if (flag === true) {
        return user
      }
    })
  },
  getAllCustomerListLoading (state) {
    return state.customer.allList.loading
  },
  getAllCustomerListPage (state) {
    return state.customer.allList.page
  },
  getAllCustomerListTotal (state) {
    return state.customer.allList.total
  },
  // ----选框----
  getSelectCustomerList (state) {
    return state.customer.selectList.data
  },
  getSelectCustomerListTotal (state) {
    return state.customer.selectList.data.length
  },
  getSelectCustomerListBalanceSum (state) {
    let sum = 0
    for (var selected of state.customer.selectList.data) {
      sum += parseFloat(selected.balance)
    }
    return sum
  },
  getSelectCustomerListLoading (state) {
    return state.customer.selectList.loading
  },
  getSubmitDivideLoading (state) {
    return state.customer.selectList.submitLoading
  },


  //--------客服--------
  getWaiterList (state) {
    return state.waiter.list
  },

}
