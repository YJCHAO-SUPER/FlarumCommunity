<template>
    <div class="topic">
      <ul class="DiscussionList-discussions">
        <li class="item"  v-for="(topicItem, index) in topics.get_topic_by_user_id" :key="index">
          <div class="DiscussionListItem">
            <div class="item-content">
              <img class="author" :src="'http://localhost:9090' + topics.avatar " alt="">
              <a href="#" class="item-main">
                <h3 class="item-title">{{ topicItem.title }}</h3>
                <ul class="item-info">
                  <li class="item-tag">
                    <span class="tags">{{ topicItem.get_category_by_article_id.category_name }}</span>
                  </li>
                  <li class="item-time">
                    <span class="username">{{ topics.name }}发布于20小时前</span>
                  </li>
                </ul>
              </a>
              <span class="comments">评论  8</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
    export default {
        name: "UserTopic",
        props:['topics'],
        data(){
            return{
              topicAvatar:''
            }
        },
        computed:{
          ...mapState(['user'])
        },
        mounted: function () {
          this.topicAvatar = this.user.avatar
          // console.log( this.topics.get_topic_by_user_id[0])
        }
    }
</script>

<style scoped>
  .topic{
    width: 100%;
  }
  .DiscussionList-discussions{
    margin: 0;
    padding: 0;
    list-style-type: none;
    position: relative;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .item:hover{
    background-color: #eee;
    border-radius: 5px;
  }
  .DiscussionListItem {
    position: relative;
    margin-right: -15px;
    padding-right: 25px;
    padding-left: 15px;
    margin-left: -15px;
    border-radius: 4px;
    transition: background .2s;
  }
  .item-content{
    padding-left: 52px;
    padding-right: 52px;
  }
  .author{
    width: 50px;
    border-radius: 50%;
    float: left;
    margin-top: 20px;
    height: 50px;
  }
  .item-title{
    margin: 0 0 3px;
    line-height: 1.3;
    color: black;
    font-weight: normal;
    overflow: hidden;
    display: inline-block;
  }
  .item-info{
    padding: 0;
    margin: 0;
    font-size: 14px;
    list-style-type: none;
  }
  .item-main{
    display: inline-block;
    padding: 20px 25px;
  }
  .username{
    line-height: 1.3;
    color: #a3a3a3;
  }
  .item-tag{
    position: absolute;
    right: 170px;
    top: 23px;
    background-color: orange;
    border-radius: 5px;
    padding: 2px 5px;
  }
  .tags{
    font-size: 14px;
    color: black;
  }
  .comments{
    position: absolute;
    right: 78px;
    top: 25px;
    color: #667c99;
    font-size: 14px;
    padding-left: 21px;
  }
</style>
