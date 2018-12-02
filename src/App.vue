<template>
  <div id="app">

    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/Header'

export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{

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
