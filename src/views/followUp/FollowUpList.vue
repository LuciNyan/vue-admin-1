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
      <el-form-item>
        <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
      </el-form-item>
    </el-form>
  </el-col>
  <el-table :data="users" style="width: 100%" stripe v-loading="listLoading">
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
          <el-form-item label="手机" min-width="500" >
            <span>{{ props.row.mobile }}</span>
          </el-form-item>
          <el-form-item label="注册日期">
            <span>{{ props.row.reg_date }}</span>
          </el-form-item>
          <el-form-item label="余额">
            <span>{{ props.row.balance }}</span>
          </el-form-item>
          <el-form-item label="邀请人">
            <span>{{ props.row.inviter }}</span>
          </el-form-item>
          <el-form-item label="QQ号">
            <span>{{ props.row.qq }}</span>
          </el-form-item>
          <el-form-item label="标的名称">
            <span>{{ props.row.loan_name }}</span>
          </el-form-item>
          <el-form-item label="微信号">
            <span>{{ props.row.wx }}</span>
          </el-form-item>
          <el-form-item label="投资日期">
            <span>{{ props.row.invest_date }}</span>
          </el-form-item>
          <el-form-item label="通话时长">
            <span>{{ props.row.call_duration }}</span>
          </el-form-item>
          <el-form-item label="投资金额">
            <span>{{ props.row.invest_money }}</span>
          </el-form-item>
          <el-form-item label="回访日期">
            <span>{{ props.row.follow_up_date }}</span>
          </el-form-item>
          <el-form-item label="投标期限">
            <span>{{ props.row.deadline }}</span>
          </el-form-item>
          <el-form-item label="归属">
            <span>{{ props.row.belong }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="用户名" prop="username" min-width="100">
    </el-table-column>
    <el-table-column label="手机号" prop="mobile" min-width="110">
    </el-table-column>
    <el-table-column label="姓名" prop="name" min-width="80">
    </el-table-column>
    <el-table-column label="QQ号" prop="qq" min-width="100">
    </el-table-column>
    <el-table-column label="微信" prop="wx" min-width="100">
    </el-table-column>
    <el-table-column label="回访日期" prop="follow_up_date" width="120">
    </el-table-column>
    <el-table-column label="通话时长" prop="call_duration" width="100">
    </el-table-column>
    <el-table-column label="回访记录" width="100">
      <template scope="scope">
        <el-popover trigger="click" placement="top" width="300">
          <div >回访记录：{{ scope.row.follow_up_content }}</div>
          <div slot="reference" class="name-wrapper">
            <el-tag>查看记录</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!--<el-table-column label="操作" width="150">-->
      <!--<template scope="scope">-->
        <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
      <!--</template>-->
    <!--</el-table-column>-->
  </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="export2Excel" :disabled="this.filters.s_date===''" :loading="exportLoading">导出Excel</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>

<style>
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
</style>

<script>
  import { mapGetters } from 'vuex'
  import { getCustomerVisitRecords } from '../../api/api';

  export default {
    data () {
      return {
        filters: {
          mobile: '',
          s_date: '',
          e_date: '',
          mode: 'mine',
          page: 1,
          is_export: false
        },
        date: '',
        exportLoading: false,
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
      }
    },
    computed: {
      ...mapGetters({
        users: 'getFacilitateList',
        listLoading: 'getFacilitateListLoading',
        total: 'getFacilitateListTotal'
      })
    },
    methods: {
      //获取用户列表
      getUsers () {
        this.$store.dispatch('getFacilitateList', this.filters)
      },
      handleCurrentChange(val) {
        this.filters.page = val
        this.$store.dispatch('getFacilitateList', this.filters)
      },
      // 改变时间选择
      changeDate (newValue) {
        const Date = newValue.split(' - ')
        this.filters.s_date = Date[0]
        this.filters.e_date = Date[1]
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
          getCustomerVisitRecords(this.filters).then(res => {
            this.filters.is_export = false
            require.ensure([], () => {
              const { export_json_to_excel } = require('../../vendor/Export2Excel')
              const tHeader = ['ID', '用户名', '手机号', '姓名', '注册时间', 'QQ号', '微信号', '余额', '投标名称', '投标时间', '投标金额', '投标期限', '邀请人', '回访日期', '通话时长', '回访内容']
              const filterVal = ['id', 'username', 'mobile', 'name', 'reg_date', 'qq', 'wx', 'balance', 'loan_name', 'invest_date', 'invest_money', 'deadline', 'inviter', 'follow_up_date', 'call_duration', 'follow_up_content']
              const list = res.data
              const data = this.formatJson(filterVal, list)
              const excelName = new Date()
              export_json_to_excel(tHeader, data, this.$store.getters.getName + ' 的回访记录Excel  导出日期:' + excelName.toLocaleDateString())
              this.exportLoading = false
            })
          }).catch(err => {
            this.exportLoading = false
            this.$message.error(err)
          })
        }).catch(err => {console.log(err)})
      },
      // 整理导出数据
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },
    created () {
      this.$store.dispatch('getFacilitateList', this.filters)
    }
  }
</script>