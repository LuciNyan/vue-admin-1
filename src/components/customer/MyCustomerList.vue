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
    <el-table
      :data="users"
      style="width: 100%"
      stripe v-loading="listLoading"
      @selection-change="selectChange"
      element-loading-text="拼命加载中">
      <!--<el-table-column type="selection" width="45" v-if="role === 'CSM'">-->
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
            <el-form-item label="上次登录">
              <span>{{ props.row.last_login_time }}</span>
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
      <el-table-column label="注册时间" prop="register_time" sortable width="150">
      </el-table-column>
      <el-table-column label="归属" prop="belong" width="100">
      </el-table-column>
        <!--<el-table-column label="操作" width="100" v-if="role === 'CSM'">-->
          <!--<template scope="scope">-->
            <!--<el-button size="small" @click="addSelectList(scope.row.id)" :plain="true" type="info">添加</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
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
  import VSelectList from './SelectList'

  export default {
    components: {
      VSelectList
    },
    data () {
      return {
        filters: {
          mobile: '',
        },
        select: [],//列表选中列
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
      //获取用户列表
      getUsers () {
        let para = {
          page: 1,
          mobile: this.filters.mobile,
          mode: 'mine'
        }
        this.$store.dispatch('getCustomerList', para)
      },
      handleCurrentChange (val) {
        let para = {
          page: val,
          mobile: this.filters.mobile,
          mode: 'mine'
        }
        this.$store.dispatch('getCustomerList', para)
      },
      bulkAddSelectList () {
        let ids = this.select.map(item => item.id)
        this.$store.dispatch('addSelectList', ids)
      },
      selectChange (sels) {
        this.select = sels
      },
    },
    created () {
      let para = {
        page: 1,
        mobile: '',
        mode: 'mine'
      }
      this.$store.dispatch('getCustomerList', para)
    }
  }
</script>