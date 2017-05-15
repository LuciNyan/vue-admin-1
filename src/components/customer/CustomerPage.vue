<template>
  <div>
    <el-col :span="24" class="breadcrumb-container">
      <strong class="title">{{ title }}</strong>
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item>
          <el-switch
            v-model="switchModel"
            on-text="专属"
            off-text=""
            @change="switch2">
          </el-switch>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>

<style scoped lang="scss" rel="stylesheet/scss">
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
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .35s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }
</style>

<script>
  import VCustomerList from './CustomerList'
  import VMyCustomerList from './MyCustomerList'

  export default {
    components: {
      VCustomerList,
      VMyCustomerList,
    },
    data () {
      return {
        switchModel: true,
        view: VMyCustomerList,
        title: '我的用户'
      }
    },
    methods: {
      switch2 (newValue) {
        if (newValue === true) {
          this.view = VMyCustomerList
          this.title = '我的用户'
        } else {
          this.view = VCustomerList
          this.title = '所有用户'
        }
      }
    },
  }
</script>