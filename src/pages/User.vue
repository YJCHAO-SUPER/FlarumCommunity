<template>
    <div>
      <Write :topic="topic" @topicBox="showTopicBox"></Write>
      <Main class="userContent">
        <div class="introduce">
          <div class="container">
            <div class="upload">
              <img class="userAvatar" :src="avatar" alt="">
              <el-popover
                v-if="user.id == $route.params.id"
                placement="right"
                width="100"
                trigger="click">
                <ul class="uploadBox">

                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    :on-change="uploadAvatar"
                    :file-list="fileList"
                    action=""
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>

                </ul>
                <a class="newAvatar" slot="reference">
                  <i class="el-icon-plus avatar-uploader-icon avatarIcon"></i>
                </a>
              </el-popover>
            </div>
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
            <ul class="userNav" >
              <router-link :to="'/user/' + id " class="label">
                <li class="userReply" @click="index=1">
                    <i class="el-icon-star-on"></i>
                    <span>回复</span>
                </li>
              </router-link>
              <router-link :to="'/user/' + id  + '/userTopic'" class="label">
                <li class="userTopic" @click="index=2">
                    <i class="el-icon-star-off"></i>
                    <span>话题</span>
                </li>
              </router-link>
              <router-link :to="'/user/' + id  +'/userMention'" class="label">
                <li class="MentionUsers" @click="index=3">
                    <i>@&nbsp;</i>
                    <span>提到用户</span>
                </li>
              </router-link>
              <router-link :to="'/user/' + id  + '/userSetting'" class="label">
                <li class="userSet" @click="index=4" v-if="user.id == $route.params.id">
                    <i class="el-icon-setting"></i>
                    <span>个人设置</span>
                </li>
              </router-link>
            </ul>
          </div>
          <div class="userAllTopic">
            <router-view  :topics = "topics"  @topicBox="showTopicBox"></router-view>
          </div>
        </div>
      </Main>
    </div>
</template>

<script>
  import UserSetting from '@/components/UserSetting'
  import UserTopic from '@/components/UserTopic'
  import UserMention from '@/components/UserMention'
  import UserReply from '@/components/UserReply'
  import {getUserInfoById,uploadAvatar} from "../js/api"
  import Write from '@/components/Write'
  //引入vuex
  import {mapState,mapMutations} from 'vuex'
  export default {
        name: "User",
      //在计算的属性中使用store的状态值
      computed:{
        ...mapState(['user'])
      },
      data(){
          return{
              index: 1,
              avatar: '',
              username: '',
              signature:'',
              time:'',
              userDiscussion:[],
              topics:[],
              fileList: [],
              id:'',
             topic:false
          }
      },
      methods: {
        //  把值加入方法
        ...mapMutations(['SET_USER']),
        uploadAvatar(files) {
          this.fileList = []
          let img = files.raw
          let formData = new FormData()
          formData.append('avatar',img)
          uploadAvatar(formData).then((res) => {
            // this.avatar = 'http://localhost:9090' + res.data
          this.SET_USER({'id':null,'avatar':'http://localhost:9090' + res.data,'name':null})
          })
        },
        showTopicBox(value){
          this.topic = value
        }
      },
      created:function(){
          // console.log(this.user)

          let para = {
              userId : this.$route.params.id
            }
            getUserInfoById(para).then((res)=>{
              // console.log(res.data)
              this.id = res.data.id
              this.avatar = 'http://localhost:9090' + res.data.avatar
              this.username = res.data.name
              //把头像和名字传给store
              // this.avatar = res.data.avatar
              // this.username = this.user.name
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
        UserSetting,
        UserTopic,
        UserMention,
        Write,
        UserReply
      }
    }
</script>

<style scoped>
  .label{
    color: #667c99;
  }
.userContent{
  border-top: 1px solid #e8ecf3;
  margin-top: 50px;
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
  .upload:hover .newAvatar{
    opacity: 1;
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
  .upload{
    float: left;
    position: relative;
  }
  .newAvatar{
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background: rgba(0,0,0,0.6);
    text-align: center;
    text-decoration: none;
    border: 0;
    margin: 4px;
    line-height: 96px;
    font-size: 26px;
    width: 92px;
    height: 92px;
  }
  .avatarIcon{
    font-size: inherit;
    color: #fff;
  }
  .uploadBox{
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .uploadBox >li > i{
    font-weight: bold;
    font-size: 17px;
    margin-right: 10px;
  }
.uploadBox >li {
  margin: 0;
  padding: 0;
  cursor:pointer;
}
.uploadBox >li > span{
  font-size: 17px;
  font-weight: 500;
}
.uploadBox >li:hover {
  background-color: #e8ecf3;
  border-radius: 5px;
}
</style>
