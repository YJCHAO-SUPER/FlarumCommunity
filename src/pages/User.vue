<template>
    <div>
      <Header></Header>
      <Main class="userContent">
        <div class="introduce">
          <div class="container">
            <img class="userAvatar" :src="avatar" alt="">
            <div class="userCard">
              <h2>
                <span class="username">{{ username }}</span>
              </h2>
              <ul class="userDescription">
                <li class="userSignature">
                  <P class="signature">{{ signature }}</P>
                </li>
                <li class="userComing">
                  加入于{{ time }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="Tips">
            <ul class="userNav">
              <li class="userReply" @click="index=1">
                <a >
                  <i class="el-icon-star-on"></i>
                  <span>回复</span>
                </a>
              </li>
              <li class="userTopic" @click="index=2">
                <a >
                  <i class="el-icon-star-off"></i>
                  <span>话题</span>
                </a>
              </li>
              <li class="MentionUsers" @click="index=3">
                <a >
                  <i>@&nbsp;</i>
                  <span>提到用户</span>
                </a>
              </li>
              <li class="userSet" @click="index=4">
                <a >
                  <i class="el-icon-setting"></i>
                  <span>个人设置</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="userAllTopic">
            <div class="disItems" v-for="(v,k) in userDiscussion" :key="k"  v-if="index == 1">
              <a href=""><span class="userTitle">{{ v.title }}</span></a>
              <div class="disContent">
                <a href=""><img :src="avatar" class="perAvatar" alt=""></a>
                <div class="disHeader">
                  <ul>
                    <li class="disUser">
                      <a href="#"><span class="disUserName">{{ username }}</span></a>
                    </li>
                    <li class="disTime"><span class="disTimeItem">{{ v.created_at }}</span></li>
                  </ul>
                </div>
                <div class="disBody">
                  <p>{{ v.content }}</p>
                </div>
                <div class="disActions">
                  <ul>
                    <li class="disActionsReply"><a class="reply">回复</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <UserTopic :topics = "topics" v-if="index==2"></UserTopic>
            <UserSetting v-if="index==4"></UserSetting>
          </div>
        </div>
      </Main>
    </div>
</template>

<script>
  import Header from '@/components/Header'
  import UserSetting from '@/components/UserSetting'
  import UserTopic from '@/components/UserTopic'
  import {getUserInfoById} from "../js/api"

  export default {
        name: "User",
      data(){
          return{
              index: 1,
              avatar:'',
              username:'',
              signature:'',
              time:'',
              userDiscussion:[],
             topics:[]
          }
      },
      created:function(){
        let para = {
          userId : this.$route.params.id
        }
        getUserInfoById(para).then((res)=>{
          console.log(res.data)
          this.avatar = res.data.avatar
          this.username = res.data.name
          this.signature = res.data.signature
          this.time = res.data.created_at
          for (let i=0;i<res.data.get_topic_by_user_id.length;i++){
            this.userDiscussion.push({
              title : res.data.get_topic_by_user_id[i].title,
              created_at : res.data.get_topic_by_user_id[i].created_at,
              content : res.data.get_topic_by_user_id[i].content
            })
          }
          this.topics = res.data
          // console.log(this.topics)
        })
      },
      components:{
        Header,
        UserSetting,
        UserTopic
      }
    }
</script>

<style scoped>
.userContent{
  border-top: 1px solid #e8ecf3;
}
  .introduce{
    background-color: rgb(47, 78, 107);
    color: #fff;
    text-align: center;
    height: 172.83px;
  }
  .introduce .container{
    padding-top: 40px;
    padding-bottom: 30px;
    height: 172.82px;
  }
.container {
  overflow: hidden;
  padding: 2.5% 2.5%;
  width: 85%;
  margin: 0 auto;
}
  .userAvatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    border: 4px solid #fff;
    margin-right: 40px;
  }
  .userCard{
    text-align: left;
    padding-left: 130px;
    max-width: 800px;
  }
  h2,p{
    margin: 0;
    padding: 0;
  }
  .username{
    font-size: 22px;
  }
  .userDescription{
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
    font-weight: 500;
  }
  .signature{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .Tips{
    width: 190px;
    float: left;
  }
  .userNav{
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 30px;
  }
  .userNav li{
    margin-bottom: 15px;
  }
  .userNav >li > a{
    color: #4d698e;
    font-weight: bold;
    padding: 8px 0 8px 30px;
  }
  .userNav >li > a > i{
    font-size: 15px;
    margin-left: 8px;
  }
  .userNav >li > a > span{
    font-size: 16px;
  }
  .userAllTopic{
    margin-top: 30px;
    margin-left: 240px;
  }
  .disItems{
    margin-top: 10px;
  }
  .userTitle{
    color: #667c99;
    font-size: 16px;
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
</style>
