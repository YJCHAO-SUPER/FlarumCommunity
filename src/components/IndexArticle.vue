<template>
    <div class="discussionList">
          <ul class="DiscussionList-discussions">
              <router-link :to="'/topic/'+indexItem.id" v-for="indexItem in showIndex" :key="indexItem.id">
                <li class="item">
                <div class="DiscussionListItem">
                  <div class="item-content">
                    <router-link :to="'/user/'+indexItem.userId"><img class="author" :src="indexItem.avatar " alt=""></router-link>
                    <div class="item-main">
                      <router-link :to="'/topic/'+indexItem.id"><h3 class="item-title">{{ indexItem.title }}</h3></router-link>
                      <ul class="item-info">
                        <li class="item-tag">
                          <span class="tags">{{ indexItem.categoryName }}</span>
                        </li>
                        <li class="item-time">
                          <span class="username">{{ indexItem.name }}发布于20小时前</span>
                        </li>
                      </ul>
                    </div>
                    <span class="comments">评论：666条</span>
                  </div>
                </div>
              </li>
              </router-link>
          </ul>
    </div>
</template>

<script>
  import {getArticleInfo} from '@/js/api'
    export default {
        name: "IndexArticle",
        data(){
          return{
            showIndex:[]
          }
        },
      created:function () {
        // console.log(123)
      },
      mounted:function () {
        getArticleInfo({}).then((res)=>{
          // console.log(res.data)
          for (let i=0;i<res.data.length;i++){
            this.showIndex.push({
                   id:res.data[i].id,
                   avatar:'http://localhost:9090' + res.data[i].get_user_by_article_id.avatar,
                   userId : res.data[i].get_user_by_article_id.id,
                  title:res.data[i].title,
                  categoryName:res.data[i].get_category_by_article_id.category_name,
                  name: res.data[i].get_user_by_article_id.name,
            })
          }
        })
      }
    }
</script>

<style scoped>
    .discussionList{
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
