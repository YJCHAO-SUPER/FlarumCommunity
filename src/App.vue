<template>
  <div id="app">
    <Header></Header>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  import Header from '@/components/Header'

export default {
  name: 'App',
  // 提供reload方法
  provide: function () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    // 刷新方法
    reload: function () {
      this.isRouterAlive = false;
      // 该方法会在dom更新后执行
      this.$nextTick(function () { this.isRouterAlive = true })
    }
  },
  components:{
    Header
  }
}
</script>

<style>
  ul{
    margin: 0 !important;
    padding: 0 !important;
  }
  body{
    background-color: #fff;
  }
  * {
    font-family: "QingNingYouYuan",sans-serif;
  }
</style>
