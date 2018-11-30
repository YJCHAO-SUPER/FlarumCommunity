<template>
    <div>
      <header>
        <loginRegist :loginBox="loginBox"  @showDologin="dologin"></loginRegist>
        <!--顶部导航-->
        <mu-appbar style="width: 100%;">
          <div class="container">
          <router-link :to="'/'"><a class="title">Flarum 中文社区</a></router-link>
          <div class="controls">
            <ul class="header-con">
              <li><div class="Button Button--link">首页</div></li>
              <li><div class="Button Button--link">文档</div></li>
              <li><div class="Button Button--link">下载</div></li>
              <li v-if="$store.state.isLogin">
                <input @click="logout" type="button" value="退出">
              </li>
              <li v-else>
                <a @click="dologin" class="Button Button--link" >登录/注册</a>
              </li>
            </ul>
          </div>
          <div class="header-right">
            <ul class="header-con">
              <li class="search">
                <div class="Search-input">
                  <input class="FormControl" placeholder="搜索其实很简单">
                </div>
              </li>
              <li class="local">
                <mu-button icon>
                  <mu-icon value="notifications"></mu-icon>
                </mu-button>
              </li>
              <li class="selfinfo">
                <div class="my">
                  <img class="avatar " :src="avatar">
                  <span class="username">{{name}}</span>
                </div>
              </li>
            </ul>
          </div>
          </div>
        </mu-appbar>

      </header>
    </div>
</template>

<script>
  import LoginRegist from '@/components/LoginRegist'
  import {mapState,mapMutations} from 'vuex'
  import {doCheckLogin} from "../js/api";

  export default {
        name: "Header",
        data(){
            return {
              name: '',
              avatar: '',
              loginBox:false
            }
        },
        computed:{
          ...mapState(['user'])
        },
        mounted:function(){
            if(localStorage.getItem('jwt_token')){
              this.$store.commit('setLogin',true)
            }
            let para = {
              jwtToken : localStorage.getItem('jwt_token')
            }
            doCheckLogin(para).then((res)=>{
              this.avatar = 'http://localhost:9090'+this.user.avatar
              this.name = this.user.name
              this.SET_USER({'id':res.data.id,'avatar':'http://localhost:9090' + res.data.avatar,'name':res.data.name})
            })

        },
        methods:{
          ...mapMutations(['SET_USER']),
          logout(){
             localStorage.removeItem('jwt_token')
            this.$store.commit('setLogin',false)

            console.log(   this.$store.state.isLogin )
          },
          dologin(value){
              //子组件给父组件传值
              this.loginBox = value
          }
        },
        components: {
          LoginRegist
        }
    }
</script>

<style scoped>
  .container{
    margin: 0 auto;
    width: 80%;
  }
  .title{
    cursor: pointer;
    color: #426799;
    text-decoration: none;
    font-size: 18px;
    margin-right: 20px;
    float: left;
    line-height: 77px;
  }
  .controls{
    float: left;
  }
  .header-con{
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .header-con > li {
    display: inline-block;
    vertical-align: middle;
  }
  .Button {
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    white-space: nowrap;
    line-height: 20px;
    padding: 8px 13px;
    border-radius: 4px;
    user-select: none;
    color: #667c99;
    border: 0;
    font-size: 14px;
  }
  .header-right{
    float: right;
  }
  .search{
    height: 5px;
    padding-bottom: 20px;
  }
  .FormControl {
    display: block;
    height: 36px;
    padding: 8px 13px;
    font-size: 13px;
    line-height: 1.5;
    color: #667c99;
    background-color: #e8ecf3;
    border: 2px solid transparent;
    border-radius: 4px;
  }
  .mu-appbar {
    background-color: #fff;
  }
  .Search-input input {
    float: left;
    width: 225px;
    position: absolute;
    top: 10px;
    right: 530px;
    height: 40px;
  }
  .Search-input{
    margin-right: 10px;
  }
  .news{
    color: #667c99;
    font-size: 14px;
  }
  .my{
    position: relative;
  }
  .avatar{
    display: inline-block;
    box-sizing: content-box;
    color: #fff;
    text-align: center;
    background-color: #e8ecf3;
    font-weight: normal;
    margin: -2px 5px -2px -6px;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    font-size: 12px;
    line-height: 24px;
  }
  .username{
    color: #667c99;
    font-size: 14px;
  }
</style>
