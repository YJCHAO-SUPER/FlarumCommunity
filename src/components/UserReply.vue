<template>
    <div>
      <div class="disItems" v-for="(v,k) in userDiscussion" :key="k"  v-if="index == 1">
        <span class="userTitle">{{ v.title }}</span>
        <div class="disContent">0
          <img :src="avatar" class="perAvatar" alt="">
          <div class="disHeader">
            <ul>
              <li class="disUser">
                <span class="disUserName">{{ username }}</span>
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
    </div>
</template>

<script>
  import {getUserInfoById,uploadAvatar} from "../js/api"
    export default {
        name: "userReply",
      data(){
        return{
          index: 1,
          avatar: '',
          username: '',
          signature:'',
          time:'',
          userDiscussion:[],
          topics:[],
          fileList: []
        }
      },
      methods: {
        uploadAvatar(files) {
          this.fileList = []
          let img = files.raw
          let formData = new FormData()
          formData.append('avatar',img)
          uploadAvatar(formData).then((res) => {

          })
        }
      },
      created:function(){

        let para = {
          userId : this.$route.params.id
        }
        getUserInfoById(para).then((res)=>{
          // console.log(res.data)
          this.avatar = 'http://localhost:9090' + res.data.avatar
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
        })

      }

    }
</script>

<style scoped>
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
