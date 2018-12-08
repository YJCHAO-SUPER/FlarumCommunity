<template>
  <div>
    <div class="disItems" v-if="index == 3">
      <span class="userTitle">嗨，我想了解一下你们使用什么邮箱最为smtp</span>
      <div class="disContent">
        <img src="http://discuss.flarum.org.cn/assets/avatars/ycg91duh2jas1tas.jpg" class="perAvatar" alt="">
        <div class="disHeader">
          <ul>
            <li class="disUser">
              <span class="disUserName">just</span>
            </li>
            <li class="disTime"><span class="disTimeItem">2018年12月3日</span></li>
          </ul>
        </div>
        <div class="disBody">
          <p><span class="mention">@大豆</span>大家都是绝大多数就卡了的骄傲了肯德基撒了肯德基</p>
        </div>
        <div class="disActions">
          <ul>
            <li class="disActionsReply" @click="showTopic"><a class="reply">回复</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "UserMention",
    data(){
      return{
        index:3
      }
    },
    methods: {
      showTopic(){
        this.$emit('topicBox',true)
      }
    },
    created:function(){


    }

  }
</script>

<style scoped>
  .mention{
    color: #4078c0;
    background-color: #e8ecf3;
    border-radius: 3px;
    padding: 3px;
    margin-right: 10px;
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
    margin-top: 15px;
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

