<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="changeDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="users"
      style="width: 100%"
      stripe v-loading="listLoading"
      element-loading-text="拼命加载中">
      <!--<el-table-column type="selection" width="45">-->
      <!--</el-table-column>-->
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="姓名" >
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="用户名" min-width="500" >
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="来源">
              <span>{{ props.row.source }}</span>
            </el-form-item>
            <el-form-item label="手机号" min-width="500" >
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="余额">
              <span>{{ props.row.balance }}</span>
            </el-form-item>
            <el-form-item label="邀请人">
              <span>{{ props.row.inviter }}</span>
            </el-form-item>
            <el-form-item label="冻结">
              <span>{{ props.row.frozen }}</span>
            </el-form-item>
            <el-form-item label="开户地">
              <span>{{ props.row.open_area }}</span>
            </el-form-item>
            <el-form-item label="待收">
              <span>{{ props.row.total_received }}</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ props.row.register_time }}</span>
            </el-form-item>
            <el-form-item label="归属">
              <span>{{ props.row.belong }}</span>
            </el-form-item>
            <el-form-item label="最近投标时间">
              <span>{{ props.row.last_invest_time }}</span>
            </el-form-item>
            <el-form-item label="最近投标金额">
              <span>{{ props.row.last_invest_money }}</span>
            </el-form-item>
            <el-form-item label="上次登录">
              <span>{{ props.row.last_login_time }}</span>
            </el-form-item>
            <el-form-item label="回访次数">
              <span>{{ props.row.follow_up_frequency }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" min-width="100">
      </el-table-column>
      <el-table-column label="手机号" prop="mobile" min-width="110">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="100">
      </el-table-column>
      <el-table-column label="余额" prop="balance" min-width="100">
      </el-table-column>
      <el-table-column label="来源" prop="source" width="80">
      </el-table-column>
      <el-table-column label="注册时间" prop="register_time" width="150">
      </el-table-column>
      <el-table-column label="回访次数" prop="follow_up_frequency" width="100">
      </el-table-column>
        <el-table-column label="回访记录" width="100">
          <template scope="scope">
            <el-button size="small" @click="popFollowUpList(scope.row)" :plain="true" type="success">录入</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="export2Excel" :disabled="this.filters.s_date===''" :loading="exportLoading">导出Excel</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--弹出框-->
    <el-dialog title="录入回访记录" v-model="dialogForm.visible">
      <el-form :model="dialogForm.form">
        <el-form-item label="手机号" :label-width="dialogForm.labelWidth">
          <el-input v-model="dialogForm.mobile" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="dialogForm.labelWidth">
          <el-input v-model="dialogForm.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="dialogForm.labelWidth">
          <el-input v-model="dialogForm.form.qq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="dialogForm.labelWidth">
          <el-input v-model="dialogForm.form.wx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通话时长" :label-width="dialogForm.labelWidth">
          <el-input v-model="dialogForm.form.call_duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通话内容" :label-width="dialogForm.labelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="dialogForm.form.follow_up_content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="updateFollowUpList()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss" rel="stylesheet/scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .breadcrumb-container {
    //margin-bottom: 15px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<script>
  import { mapGetters, mapActions} from 'vuex'
  import { getALLCustomerListPage, createCustomerVisitRecords } from '../../api/api';

  import VSelectList from './SelectList'

  export default {
    components: {
      VSelectList
    },
    data () {
      return {
        // 搜索，查询相关
        filters: {
          mobile: '',
          // 搜索时间
          s_date: '',
          e_date: '',
          mode: 'mine',
          page: 1,
        },
        exportLoading: false,
        // 日期选择器
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // 录入回访记录弹出框
        dialogForm: {
          visible: false,
          form: {
            customer_user_id: '',
            qq: '',
            wx: '',
            call_duration: '',
            follow_up_content: '',
          },
          mobile: '',
          name: '',
          labelWidth: '120px',
        },
        date: ''
      }
    },
    computed: {
      ...mapGetters({
        users: 'getMyCustomerList',
        listLoading: 'getMyCustomerListLoading',
        total: 'getMyCustomerListTotal',
        role: 'getRole',
      })
    },
    methods: {
      ...mapActions({
        addSelectList: 'addSelectList'
      }),
      // 改变时间选择
      changeDate (newValue) {
        const Date = newValue.split(' - ')
        this.filters.s_date = Date[0]
        this.filters.e_date = Date[1]
      },
      // 获取用户列表
      getUsers () {
        this.$store.dispatch('getCustomerList', this.filters)
      },
      // 翻页
      handleCurrentChange (val) {
        this.filters.page = val
        this.$store.dispatch('getCustomerList', this.filters)
      },
      // 导出Excel
      export2Excel () {
        this.$confirm('此操作将导出 ' + this.filters.s_date + '日至 ' + this.filters.e_date + '日注册的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.exportLoading = true
          this.filters.is_export = true
          getALLCustomerListPage(this.filters).then(res => {
            this.filters.is_export = false
            require.ensure([], () => {
              const { export_json_to_excel } = require('../../vendor/Export2Excel')
              const tHeader = ['ID', '用户名', '手机号', '姓名', '来源', '上次登录', '余额', '冻结', '待收', '邀请人', '开户地', '注册时间', '最近投标时间', '最近投标金额', '归属', '回访次数']
              const filterVal = ['id', 'username', 'mobile', 'name', 'source', 'last_login_time', 'balance', 'frozen', 'total_received', 'inviter', 'open_area', 'register_time', 'last_invest_time', 'last_invest_money', 'belong', 'follow_up_frequency']
              const list = res.data
              const data = this.formatJson(filterVal, list)
              const excelName = new Date()
              export_json_to_excel(tHeader, data, this.$store.getters.getName + ' 的个人用户Excel 导出日期:' + excelName.toLocaleDateString())
              this.exportLoading = false
            })
          }).catch(err => {
            this.exportLoading = false
            this.$message.error(err);
          })
        }).catch(err => {console.log(err)})
      },
      // 整理导出数据
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 录入回访记录
      popFollowUpList (user) {
        this.dialogForm.form.customer_user_id = user.id
        this.dialogForm.name = user.name
        this.dialogForm.mobile = user.mobile
        // 显示弹出层
        this.dialogForm.visible = true
      },
      // 提交回访列表
      updateFollowUpList () {
        createCustomerVisitRecords(this.dialogForm.form).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '回访记录添加成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '警告',
              message: '添加回访记录失败，' + res.msg,
            })
          }
        })
        this.dialogForm.visible = false
        this.dialogForm.form = {customer_user_id: '', qq: '', wx: '', call_duration: '', follow_up_content: ''}
      },
    },
    created () {
      this.$store.dispatch('getCustomerList', this.filters)
    }
  }
</script>