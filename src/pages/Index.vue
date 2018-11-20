<template>
    <div class="container">
      <loginRegist v-if="loginBox" @login="showLogin"></loginRegist>
        <Header @login="showLogin"></Header>
        <Main>
          <Aside>
            <Sidebar></Sidebar>
          </Aside>
          <Article>
            <IndexArticle></IndexArticle>
          </Article>
        </Main>
    </div>
</template>

<script>
  import Header from '@/components/Header'
  import Sidebar from '@/components/Sidebar'
  import IndexArticle from '@/components/IndexArticle'
  import LoginRegist from '@/components/LoginRegist'
    export default {
        name: "Index",
        data(){
          return {
            loginBox: false
          }
        },
        methods:{
          showLogin(value){
            this.loginBox  = value
          }
        },
        components: {
            Header,
            Sidebar,
            IndexArticle,
            LoginRegist
       }
    }
</script>

<style scoped>
  .container {
    width: 100%;
    margin: 0 auto;
  }
  Main {
    width: 85%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    padding: 2.5% 2.5%;
  }
  Aside {
    width: 20%;
    float: left;
  }
  Article{
    width: 78%;
    float: right;
  }
</style>

