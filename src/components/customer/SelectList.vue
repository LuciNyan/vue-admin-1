<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <!--<el-form-item>-->
          <!--<el-input v-model="filters.mobile" placeholder="手机号"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
        <!--</el-form-item>-->
        <el-form-item>
          <span>分配至：</span>
          <el-select v-model="waiterId" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :label="item.name"
              :value="item.id"
              :key="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
            </el-option>
          </el-select>
          <span>&nbsp;&nbsp;&nbsp;当前用户总余额：{{ balanceSum }}</span>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="users"
              style="width: 100%"
              stripe v-loading="listLoading"
              @selection-change="selectChange"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="45">
      </el-table-column>
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
            <el-form-item label="上次登录">
              <span>{{ props.row.last_login_time }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" min-width="120">
      </el-table-column>
      <el-table-column label="手机号" prop="mobile" min-width="150">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="100">
      </el-table-column>
      <el-table-column label="来源" prop="source" width="150">
      </el-table-column>
      <el-table-column label="注册时间" prop="register_time" sortable width="150">
      </el-table-column>
      <el-table-column label="归属" prop="belong" sortable width="100">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button size="small" @click="delSelectList(scope.row.id)" :plain="true" type="danger">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="bulkDelSelectList" :disabled="this.select.length===0">批量移除</el-button>
      <el-button type="success" @click="submitDivide" :disabled="this.select.length===0 || this.waiterId===''" :loading="submitLoading">提交归属划分</el-button>
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

  export default {
    components: {

    },
    data () {
      return {
        filters: {
          mobile: ''
        },
        //列表选中列
        select: [],
        // 指派到客服
        waiterId: ''
      }
    },
    computed: {
      ...mapGetters({
        users: 'getSelectCustomerList',
        listLoading: 'getSelectCustomerListLoading',
        total: 'getSelectCustomerListTotal',
        balanceSum: 'getSelectCustomerListBalanceSum',
        cities: 'getWaiterList',
        submitLoading: 'getSubmitDivideLoading'
      })
    },
    methods: {
      //获取用户列表
      getUsers () {
        let para = {
          page: 1,
          mobile: this.filters.mobile
        }
        this.$store.dispatch('getAllCustomerList', para)
      },
      handleCurrentChange (val) {
        let para = {
          page: val,
          mobile: this.filters.mobile
        }
        this.$store.dispatch('getAllCustomerList', para)
      },
      delSelectList (userIds) {
        this.$store.dispatch('delSelectList', userIds)
      },
      bulkDelSelectList () {
        let ids = this.select.map(item => item.id)
        this.$store.dispatch('delSelectList', ids)
      },
      batchRemove () {

      },
      selectChange (sels) {
        this.select = sels;
      },
      // 提交归属划分
      submitDivide () {
        let waiter = this.cities.find(waiter => {
          return waiter.id === this.waiterId
        })
        this.$confirm('此操作将分配 ' + this.select.length + '位客户给 ' + waiter.name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = {
            ids: this.select.map(item => item.id),
            waiterId: this.waiterId
          }
          this.$store.dispatch('submitSelectList', para)
        })
      }
    },
    created () {
      // 获取所有客服信息
      this.$store.dispatch('getAllWaiter')
    }
  }
</script>