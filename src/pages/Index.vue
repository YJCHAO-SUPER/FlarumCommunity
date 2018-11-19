<template>
    <div class="container">
        <Header></Header>
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
    export default {
        name: "Index",
        components: {
            Header,
            Sidebar,
            IndexArticle
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

