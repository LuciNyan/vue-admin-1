export default {
  // --------用户相关--------
  admin: {
    loading: false,
    token: '',
  },

  // --------回访记录列表--------
  facilitateList: {
    loading: false,
    total: 0,
    data: [
      {
        id: 12,
        username: 'xjy.160154',
        mobile: '15527272727',
        name: 'meeto',
        inviter: 'xjy.160153',
        source: 'rongpuhui',
        reg_date: '2017-01-02',
        balance: '2222.03',
        invest_money: '1123.00',
        invest_date: '2017-08-09',
        deadline: '3',
        loan_name: '长青房屋抵押',
        follow_up_date: '2017-09-04',
        follow_up_content: '微信：昨天本来想约标，但是告知已经约不了标，要等到下个月。建议客户投2月标，加息2.5，客户询问2约标加息后是多少，告知是12.5%，客户会考虑。后来电让给他加息，投2月标。询问公司安不安全？如果公司好的话100万，200万都好说。现在在宁波上班，是仙桃人。询问投5万有奖励没？想让公司给他100块充话费，告知活动还在筹备中，出来会第一时间通知。',
        belong: 'fanhuan',
        call_duration: '6:20'
      },
    ]
  },

  // --------客户列表--------
  customer: {
    // 所有客户，集中展示列表
    allList: {
      page: 1,
      loading: false,
      total: 0,
      data: [
        // {
        //   id: 1,
        //   name: '',
        //   username: '',
        //   source: '',
        //   mobile: '',
        //   balance: '',
        //   inviter: '',
        //   frozen: '',
        //   open_area: '',
        //   total_received: '',
        //   register_time: '',
        //   belong: '',
        //   last_login_time: ''
        // }
      ]
    },
    // 选框中的数据
    selectList: {
      loading: false,
      submitLoading: false,
      total: 0,
      data: [
        // {
        //   id: 1,
        //   name: '',
        //   username: '',
        //   source: '',
        //   mobile: '',
        //   balance: '',
        //   inviter: '',
        //   frozen: '',
        //   open_area: '',
        //   total_received: '',
        //   register_time: '',
        //   belong: '',
        //   last_login_time: ''
        // }
      ],
    }
  },

  // --------客服列表--------
  waiter: {
    list: [
      {
        id: 1,
        username: 'xjycf.sa1123',
        name: '范欢',
      },
      {
        id: 2,
        username: 'xjycf.98123',
        name: '朱婷',
      },
      {
        id: 3,
        username: 'xjycf.98123',
        name: '双燕',
      }
    ]
  }
}