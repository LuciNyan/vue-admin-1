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
      @selection-change="selectChange"
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
      <el-button type="success" @click="export2Excel" :disabled="false">导出Excel</el-button>
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
          // 搜索时间
          s_date: '',
          e_date: '',
          mode: 'mine',
          page: 1
        },
        select: [],//列表选中列
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
      //获取用户列表
      getUsers () {
        this.$store.dispatch('getCustomerList', this.filters)
      },
      handleCurrentChange (val) {
        this.filters.page = val
        this.$store.dispatch('getCustomerList', this.filters)
      },
      export2Excel () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间'];
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
          const list = [{id: 12}, {id: 50}];
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel');
        })
      },
      // 整理导出数据
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      selectChange (sels) {
        this.select = sels
      },
    },
    created () {
      this.$store.dispatch('getCustomerList', this.filters)
    }
  }
</script>