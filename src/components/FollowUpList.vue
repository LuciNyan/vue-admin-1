<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.mobile" placeholder="手机号"></el-input>
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
    <el-table-column type="selection" width="45">
    </el-table-column>
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="编号">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="用户名" min-width="500" >
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="手机号" min-width="500" >
            <span>{{ props.row.mobile }}</span>
          </el-form-item>
          <el-form-item label="姓名" >
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="邀请人">
            <span>{{ props.row.inviter }}</span>
          </el-form-item>
          <el-form-item label="注册日期">
            <span>{{ props.row.reg_date }}</span>
          </el-form-item>
          <el-form-item label="余额">
            <span>{{ props.row.balance }}</span>
          </el-form-item>
          <el-form-item label="投资金额">
            <span>{{ props.row.invest_money }}</span>
          </el-form-item>
          <el-form-item label="投资日期">
            <span>{{ props.row.invest_date }}</span>
          </el-form-item>
          <el-form-item label="期限">
            <span>{{ props.row.deadline }}</span>
          </el-form-item>
          <el-form-item label="标的名称">
            <span>{{ props.row.loan_name }}</span>
          </el-form-item>
          <el-form-item label="回访日期">
            <span>{{ props.row.follow_up_date }}</span>
          </el-form-item>
          <el-form-item label="归属">
            <span>{{ props.row.belong }}</span>
          </el-form-item>
          <el-form-item label="通话时长">
            <span>{{ props.row.call_duration }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="用户名" prop="username" min-width="120">
    </el-table-column>
    <el-table-column label="手机号" prop="mobile" min-width="150">
    </el-table-column>
    <el-table-column label="姓名" prop="name" min-width="100">
    </el-table-column>
    <el-table-column label="回访日期" prop="followUpDate" sortable width="150">
    </el-table-column>
    <el-table-column label="回访记录" width="180">
      <template scope="scope">
        <el-popover trigger="focus" placement="top" width="300">
          <div >回访记录：{{ scope.row.follow_up_content }}</div>
          <div slot="reference" class="name-wrapper">
            <el-tag>查看记录</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
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
    data () {
      return {
        filters: {
          mobile: ''
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
        let para = {
          page: 1,
          mobile: this.filters.mobile
        }
        this.$store.dispatch('getFacilitateList', para)
      },
      handleCurrentChange(val) {
        let para = {
          page: val,
          mobile: this.filters.mobile
        }
        this.$store.dispatch('getFacilitateList', para)
      },
    },
    created () {
      this.$store.dispatch('getFacilitateList')
    }
  }
</script>