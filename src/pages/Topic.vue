<template>
    <div class="person">
      <Write :topic="topic" @topicBox="replyTopicBox"></Write>
        <Header></Header>
        <Main class="perContent">
            <div class="theme">
              <div class="container">
                  <ul class="perItems">
                    <li class="itemCategory"><a href="#">{{ categoryName }}</a></li>
                    <li class="itemTitle"><h2>{{ title }}</h2></li>
                  </ul>
              </div>
            </div>
            <div class="container">
              <div class="discussion">
                  <div class="disItems" v-for="(v,k) in discussionItem">
                      <div class="disContent">
                        <a href=""><img :src="v.avatar" class="perAvatar" alt=""></a>
                        <div class="disHeader">
                          <ul>
                            <li class="disUser">
                              <a href="#"><span class="disUserName">{{ v.author }}</span></a>
                            </li>
                            <li class="disTime"><span class="disTimeItem">{{ v.created_at }}</span></li>
                          </ul>
                        </div>
                        <div class="disBody">
                          <p>{{ v.content }}</p>
                        </div>
                        <div class="disActions">
                          <ul>
                            <li class="disActionsReply"><a @click="replyTopicBox" class="reply">回复</a></li>
                            <li class="disActionsMore">
                            <el-popover
                              placement="right"
                              width="180"
                              trigger="click">
                              <el-row>
                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle></el-button>
                                <el-button type="info" icon="el-icon-message" circle></el-button>
                              </el-row>
                              <i class="el-icon-more"  slot="reference"></i>
                            </el-popover>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                  <div class="disItems">
                    <div class="disSay">
                      <img class="disSayAvatar" src="http://discuss.flarum.org.cn/assets/avatars/krzlf5jgw0xc6s9u.jpg" alt="">
                      <span class="disSayContent" @click="replyTopicBox">说点什么. . .</span>
                    </div>
                  </div>
              </div>
              <div class="disRight">
                <button class="disRightReply" @click="replyTopicBox"><span>回复</span></button>
                <button class="disRightFollow"><span><i class="el-icon-star-off"></i>&nbsp;关注</span></button>
                <button class="disRightDown" trigger="click">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                          <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item class="clearfix">
                            <span><i class="el-icon-check"></i></span>
                            <i class="el-icon-star-off"></i>
                            常规
                            <span>仅在有人@提到我时提醒我</span>
                          </el-dropdown-item>
                          <el-dropdown-item class="clearfix">
                            <span></span>
                            <i class="el-icon-star-on"></i>
                            关注
                            <span>当有人回复此话题时提醒我</span>
                          </el-dropdown-item>
                          <el-dropdown-item class="clearfix">
                            <span></span>
                            <i class="el-icon-view"></i>
                            忽视
                            <span>不接收任何提醒并隐藏话题</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </button>
              </div>
            </div>
        </Main>
    </div>
</template>

<script>
  import Header from '@/components/Header'
  import Write from '@/components/Write'
  import {getTopicByIdInfo} from "../js/api";

  export default {
        name: "Topic",
        data(){
          return{
            topic:false,
            categoryName:'',
            title:'',
            discussionItem:[]
          }
        },
      created:function(){
        // alert(this.$route.params.id)
        let para = {
          id : this.$route.params.id
        }
        getTopicByIdInfo(para).then((res)=>{
            console.log(res.data)
          this.categoryName  = res.data.get_category_by_article_id.category_name
          this.title   = res.data.title
          this.discussionItem.push({
            created_at: res.data.created_at,
            content:res.data.content,
            avatar:res.data.get_user_by_article_id.avatar,
            author:res.data.get_user_by_article_id.name
          })
        })
      },
      methods:{
        replyTopicBox(value){
          this.topic = value
        }
      },
        components:{
          Header,
          Write
        }
    }
</script>

<style scoped>
  .person{
    position: relative !important;
    /*padding-top: 52px;*/
    padding-bottom: 50px;
    overflow-x: hidden;
    min-height: 100vh;
  }
  .perContent{
    border-top: 1px solid #e8ecf3;
  }
  .theme{
    background-color: rgb(208, 150, 150);
    color: #fff;
    text-align: center;
    height: 172.83px;
  }
  .theme .container{
    padding-top: 40px;
    padding-bottom: 30px;
  }
  .container {
    overflow: hidden;
    padding: 2.5% 2.5%;
    width: 85%;
    margin: 0 auto;
  }
  .perItems{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .itemCategory a{
    color: rgb(208, 150, 150);
    background-color: #fff;
    padding: 5px 7px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
  }
  .itemTitle{
    display: block;
    margin-top: 15px;
  }
  .itemTitle h2{
    font-size: 25px;
    font-weight: normal;
    line-height: 1.5em;
  }
  .discussion{
    margin-right: 225px;
    display: inline-block;
    width: 70%;
  }
  .disItems{
    margin-top: 10px;
  }
  .disContent{
    border-bottom: 1px solid #e8ecf3;
    height: 146.8px;
  }
  .disContent:hover .disActions {
    opacity: 1;
  }
  .perAvatar{
    width: 80px;
    border-radius: 50%;
    height: 80px;
    float: left;
  }
  .disHeader{
    margin-bottom: 15px;
  }
  .disHeader >ul >li {
    display: inline;
    margin-right: 10px;
  }
  .disUser{
    margin-left: 30px;
  }
  .disUserName{
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }
  .disTimeItem{
    font-size: 16px;
  }
  .disBody{
    font-size: 18px;
    padding-left: 110px;
    font-weight: 500;
  }
  .disActions{
    margin-top: -5px;
    float: right;
    position: relative;
    font-size: 16px;
    opacity: 0;
  }
  .disActions > ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .disActions > ul >li {
    margin-right: 0;
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .reply{
    color: #426799;
  }
  .disSay{
    margin-top: 50px;
    border: 2px dashed #e8ecf3;
    color: #667c99;
    border-radius: 10px;
    height: 104px;
  }
  .disSayAvatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
  }
  .disSayContent{
    font-size: 16px;
    color: #426799;
    padding-left: 20px;
    line-height: 104px;
  }
  .disRight{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    float: right;
    right: 206px;
  }
  .disRightReply{
    border: none;
    background-color: #426799;
    color: #fff;
    border-radius: 4px;
    width: 160px;
    height: 36px;
    display: list-item;
    margin-bottom: 10px;
  }
  .disRightFollow{
    border: none;
    background-color: #e8ecf3;
    color: #426799;
    border-radius: 4px;
    width: 110px;
    height: 36px;
  }
  .disRightDown{
    border: none;
    background-color: #e8ecf3;
    color: #426799;
    border-radius: 4px;
    width: 43px;
    height: 36px;
  }
</style>
