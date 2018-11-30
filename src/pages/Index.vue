<template>
    <div class="container">
      <Write :topic="topic" @topicBox="showTopicBox"></Write>
        <Main>
          <Aside>
            <Sidebar @topicBox="showTopicBox"></Sidebar>
          </Aside>
          <Article>
            <IndexArticle></IndexArticle>
          </Article>
        </Main>
    </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import IndexArticle from '@/components/IndexArticle'
  import Write from '@/components/Write'
    export default {
        name: "Index",
        data(){
          return {
            topic:false
          }
        },
        methods:{
          showTopicBox(value){
            this.topic = value
          }
        },
        components: {
            Sidebar,
            IndexArticle,
            Write
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

