<template>
    <div class="discussionList">
          <ul class="DiscussionList-discussions">
              <li class="item">
                <div class="DiscussionListItem">
                  <div class="item-content">
                    <img class="author" src="https://b-ssl.duitang.com/uploads/item/201810/26/20181026082910_ldqkn.thumb.300_300_c.jpg" alt="">
                    <a href="#" class="item-main">
                      <h3 class="item-title">论坛激活功能</h3>
                      <ul class="item-info">
                        <li class="item-tag">
                          <span class="tags">求助</span>
                        </li>
                        <li class="item-time">
                          <span class="username">123456回复于20小时前</span>
                        </li>
                      </ul>
                    </a>
                    <span class="comments">评论：666条</span>
                  </div>
                </div>
              </li>
          </ul>
    </div>
</template>

<script>
    export default {
        name: "IndexArticle"
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
    padding-right: 80px;
  }
  .author{
    width: 50px;
    border-radius: 50%;
    float: left;
    margin-top: 13px;
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
    right: 120px;
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
    right: 25px;
    top: 25px;
    color: #667c99;
    font-size: 14px;
    padding-left: 21px;
  }
</style>
