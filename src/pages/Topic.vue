<template>
    <div class="person">
      <Write  :topic="topic" @topicBox="showTopicBox" :topicId="topicId"></Write>
        <Main class="perContent">
            <div class="theme">
              <div class="container">
                  <ul class="perItems">
                    <li class="itemCategory">{{ categoryName }}</li>
                    <li class="itemTitle"><h2>{{ title }}</h2></li>
                  </ul>
              </div>
            </div>
            <div class="container">
              <div class="discussion">
                <!--话题-->
                  <div class="disItems" v-for="(v,k) in discussionItem">
                      <div class="disContent">
                        <router-link :to="'/user/'+userId"><img :src="v.avatar" class="perAvatar" alt=""></router-link>
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
                            <li class="disActionsReply" @click="AuthorReply(v.author,userId)"><div class="reply">回复</div></li>
                            <li class="disActionsMore">
                            <el-popover
                              placement="right"
                              width="150"
                              trigger="click">
                              <el-row>
                                <el-button type="primary" icon="el-icon-edit" circle @click="showEditTopic()"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle></el-button>
                              </el-row>
                              <i class="el-icon-more"  slot="reference"></i>
                            </el-popover>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                <!--话题回复-->
                  <div class="replyItems" v-for="(item,index) in replyItem" :key="index">
                  <div class="disContent">
                    <router-link :to="'/user/'+item.id"><img :src="item.avatar" class="perAvatar" alt=""></router-link>
                    <div class="disHeader">
                      <ul>
                        <li class="disUser">
                          <a><span class="disUserName">{{ item.name}}</span></a>
                        </li>
                        <li class="disTime"><span class="disTimeItem">{{ item.created_at }}</span></li>
                      </ul>
                    </div>
                    <div class="disBody">
                      <p> <span class="replyWith"><i class="el-icon-refresh"></i>{{ item.name }}</span> {{ item.reply_content }}</p>
                    </div>
                    <div class="disActions">
                      <ul>
                        <li class="disActionsReply" @click="AuthorReply(item.name,item.id)"><div class="reply">回复</div></li>
                        <li class="disActionsMore">
                          <el-popover
                            placement="right"
                            width="150"
                            trigger="click">
                            <el-row>
                              <el-button type="primary" icon="el-icon-edit" circle @click="EditAuthorReply(item.name,item.id,item.replyId)"></el-button>
                              <el-button type="danger" icon="el-icon-delete" circle @click="deleteReply(item.replyId)"></el-button>
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
                      <img class="disSayAvatar" :src="myselfAvatar" alt="">
                      <span class="disSayContent"  @click="dialogFormVisible = true">说点什么. . .</span>
                    </div>
                  </div>
              </div>
              <div class="disRight">
                <button class="disRightReply" @click="dialogFormVisible = true"><span>回复</span></button>
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

          <!--回复框-->
          <el-dialog title="回复" :visible.sync="dialogFormVisible">
            <el-form>
              <p class="formTitle">{{ title }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回复给：
                  <span class="formname" v-model="sendReplyId">{{ sendrelyname }}</span>
              </p>
              <img class="formimg" :src="myselfAvatar" alt="">
              <el-form-item :label-width="formLabelWidth">
                <el-input type="textarea" v-model="desc"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sendReply">发表回复</el-button>
            </div>
          </el-dialog>

          <!--编辑回复框-->
          <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit">
            <el-form>
              <p class="formTitle">{{ title }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回复给：
                <span class="formname" v-model="editUserId">{{ editAuthor }}</span>
              </p>
              <img class="formimg" :src="myselfAvatar" alt="">
              <el-form-item :label-width="formLabelWidth">
                <el-input type="textarea" v-model="descEdit"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="sendEditReply">编辑回复</el-button>
            </div>
          </el-dialog>

        </Main>
    </div>
</template>

<script>
  import {getTopicByIdInfo,getReplyByTopicId,addReply,getShowEditReply,editReply,deleteReplyById} from "../js/api";
  import {mapState,mapMutations} from 'vuex'
  import Write from '@/components/Write'

  export default {
        name: "Topic",
        // 注入reload, AppVue中注册
        inject: ['reload'],
        data(){
          return{
            topic:false,
            categoryName:'',
            title:'',
            discussionItem:[],
            myselfAvatar:'',
            userId:'',
            dialogFormVisible: false,
            desc: '',
            formLabelWidth: '120px',
            replyItem:[],
            replyUserId:'',
            sendrelyname:'',
            articleId:'',
            sendReplyId:'',
            dialogFormVisibleEdit:false,
            descEdit: '',
            replyId:'',
            editAuthor:'',
            editUserId:'',
            topicId:''
          }
        },
        computed:{
          ...mapState(['user'])
        },
       created:function(){
       this.myselfAvatar = this.user.avatar
         this.topicId = this.$route.params.id
        let para = {
          id : this.$route.params.id
        }
        //加载文章
        getTopicByIdInfo(para).then((res)=>{
            // console.log(res.data)
          this.articleId = res.data.id
          this.categoryName  = res.data.get_category_by_article_id.category_name
          this.title   = res.data.title
          this.userId = res.data.user_id
          this.discussionItem.push({
            created_at: res.data.created_at,
            content:res.data.content,
            avatar: 'http://localhost:9090' + res.data.get_user_by_article_id.avatar,
            author:res.data.get_user_by_article_id.name
          })
        })
        // 加载回复
        getReplyByTopicId(para).then((res)=>{
          // console.log(res.data)
          for(let i=0;i<res.data.length;i++){
            this.replyItem.push({
              replyId:res.data[i].id,
              created_at:res.data[i].created_at,
              reply_content:res.data[i].reply_content,
              name:res.data[i].get_user_by_reply_user_id.name,
              id:res.data[i].get_user_by_reply_user_id.id,
              avatar:'http://localhost:9090' + res.data[i].get_user_by_reply_user_id.avatar,
              count:res.data.length
            })
          }
        })
       },
       methods:{
         showTopicBox(value){
           this.topic = value
         },
        //  点击显示回复框
        AuthorReply(author,userId) {
          this.dialogFormVisible = true
          this.sendrelyname = author
          this.sendReplyId = userId
        },
        // 点击显示编辑回复框
        EditAuthorReply(editAuthor,editUserId,replyId){
          this.dialogFormVisibleEdit = true
          this.replyId = replyId
          this.editAuthor = editAuthor
          this.editUserId = editUserId

          let para = {
            editReplyId : this.replyId
          }
          //显示编辑内容
          getShowEditReply(para).then((res) => {
            // console.log(res.data)
            this.descEdit  = res.data.reply_content
          })
        },
        // 发表回复
        sendReply(){
          let para = {
            topicId : this.$route.params.id,
            replyContent : this.desc,
            replyWithId : this.sendReplyId,
          }
          addReply(para).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200){
              this.$notify({
                title: '提示',
                message: res.data.msg,
                type: 'success'
              });
              this.dialogFormVisible = false
              // 刷新当前页面
              this.reload();
            }else{
              this.$notify.error({
                title: '提示',
                message: res.data.msg
              });
            }
          })
        },
        //编辑回复
         sendEditReply(){
           let para = {
             topicId : this.$route.params.id,
             replyEditContent : this.descEdit,
             replyWithId : this.editUserId,
             replyId : this.replyId
           }
           editReply(para).then((res)=>{
             // console.log(res.data)
             if(res.data.code == 200){
               this.$notify({
                 title: '提示',
                 message: res.data.msg,
                 type: 'success'
               });
               this.dialogFormVisible = false
               // 刷新当前页面
               this.reload();
             }else{
               this.$notify.error({
                 title: '提示',
                 message: res.data.msg
               });
             }
           })
         },
       //  删除回复
         deleteReply(replyId){
           let para = {
            replyId : replyId
           }
          deleteReplyById(para).then((res) =>{
            if(res.data.code == 200){
              this.$notify({
                title: '提示',
                message: res.data.msg,
                type: 'success'
              });
              // 刷新当前页面
              this.reload();
            }else{
              this.$notify.error({
                title: '提示',
                message: '删除回复失败~'
              });
            }
           })
         },
       //  点击显示编辑话题
         showEditTopic(){
           this.topic = true
         },
       },
      components: {
        Write
      }
    }
</script>

<style scoped>
  .person{
    margin-top: 50px;
    position: relative !important;
    /*padding-top: 52px;*/
    padding-bottom: 50px;
    overflow-y: hidden;
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
  .replyItems{
    margin-top: 30px;
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
    cursor: pointer;
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
    cursor: pointer;
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
  .formimg{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
  }
  .formTitle{
    font-size: 14px;
    display: inline-grid;
    padding-left: 20px;
  }
  .formname{
    display: contents;
  }
  .replyWith{
    background-color: #e8ecf3;
    color: #4078c0;
    border-radius: 5px;
    margin-right: 10px;
    padding-left: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
</style>
