export default {
  // --------用户相关--------
  getToken (state) {
    return state.admin.token
  },
  getLoginLoading (state) {
    return state.admin.loading
  },
  getRole (state) {
    return state.admin.role
  },
  getUsername (state) {
    return state.admin.username
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
  getCustomerSwitch (state) {
    return state.customer.switchDisable
  },
  getAllCustomerList (state) {
    return state.customer.allList.data.filter(user => {
      let flag = true
      // 在被选择列表中查找 如果 有该用户 则屏蔽该用户
      for (let selected of state.customer.selectList.data) {
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
  // 自己的用户
  getMyCustomerList (state) {
    return state.customer.myList.data
  },
  getMyCustomerListLoading (state) {
    return state.customer.myList.loading
  },
  getMyCustomerListTotal (state) {
    return state.customer.myList.total
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
    for (let selected of state.customer.selectList.data) {
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
    return state.customerService.list
  },

}
