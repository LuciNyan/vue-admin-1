import {
  getUserListPage,
  requestLogin,
  getALLCustomerListPage,
  getAllWaiter,
  divideCustomer,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from '../api/api';

import { Message } from 'element-ui'

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
  getFacilitateList (context, para = false) {
    context.commit('facilitateListLoading', true)
    if (para === false) {
      para = {
        page: 1,
        mobile: ''
      }
    }
    // 异步
    getUserListPage(para).then((res) => {
      let res_data = res.data
      context.commit('facilitateListTotal', res_data.total)
      context.commit('facilitateList', res_data.data)
      context.commit('facilitateListLoading', false)
    })
  },

  // -----------------------客户列表------------------------
  getAllCustomerList (context, para = false) {
    context.commit('customerAllListLoading', true)
    if (para === false) {
      para = {
        page : 1,
        mobile: ''
      }
    }
    // 设置当前页数
    context.commit('customerAllListPage', para.page)
    // 异步
    getALLCustomerListPage(para).then((res) => {
      let res_data = res.data.data
      context.commit('customerAllListTotal', res_data.total)
      context.commit('customerAllList', res_data.data)
      context.commit('customerAllListLoading', false)
    })
  },
  // 添加一条 或 批量添加
  addSelectList (context, para) {
    if  (typeof para === 'number') {
      context.commit('customerSelectListPush', para)
    } else {
      para.forEach((userId) => {
        context.commit('customerSelectListPush', userId)
      })
    }
  },
  // 删除一条 或 多条
  delSelectList (context, para) {
    if  (typeof para === 'number') {
      context.commit('customerSelectListSplice', para)
    } else {
      para.forEach((userId) => {
        context.commit('customerSelectListSplice', userId)
      })
    }
  },
  // 提交待分配区域
  submitSelectList (context, para) {
    context.commit('customerSelectListSubmitLoading', true)
    let {ids, waiterId} = para
    let divide_param = {
      customer_user_ids: ids.toString(),
      customer_service_user_id: waiterId
    }
    divideCustomer(divide_param).then(res => {
      let{ code, data } =  res
      if (code === 200) {
        data.success.forEach((userId) => {
          context.commit('customerSelectListSplice', userId)
        })
        let type = 'warning'
        if (data.success.length === 0) {
          type = 'error'
        } else if (data.fail.length === 0) {
          type = 'success'
        }
        // 加载提示
        Message({
          showClose: true,
          message: '成功提交: ' + data.success.length + '条数据，失败: ' + data.fail.length + '条',
          type: type
        });
        context.commit('customerSelectListSubmitLoading', false)
        // 重新刷新所有用户列表
        let param = {
          page: context.getters.getAllCustomerListPage,
          mobile: ''
        }
        context.commit('customerAllListLoading', true)
        getALLCustomerListPage(param).then((res) => {
          let res_data = res.data.data
          context.commit('customerAllListTotal', res_data.total)
          context.commit('customerAllList', res_data.data)
          context.commit('customerAllListLoading', false)
        })
      }
    })
  },

  // -----------------------客服------------------------
  // 获取所有客服信息
  getAllWaiter (context) {
    getAllWaiter().then(res => {
      context.commit('waiterAllList', res.data)
    })
  }


}
