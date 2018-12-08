<template>
    <div>
      <header class="head">
        <loginRegist :loginBox="loginBox"  @showDologin="dologin"></loginRegist>
        <!--顶部导航-->
        <mu-appbar style="width: 100%;height: 52px;">
          <div class="container">
          <router-link :to="'/'"><span class="title">Flarum 中文社区</span></router-link>
          <div class="controls">
              <div class="Button Button--link">首页</div>
              <div class="Button Button--link">文档</div>
              <div class="Button Button--link">下载</div>
          </div>
          <div class="header-right">
            <ul class="header-con">
              <li class="search">
                  <input class="FormControl" placeholder="搜索其实很简单">
              </li>

              <el-popover
                placement="bottom"
                width="200"
                trigger="click">
                <div class="language"><i class="el-icon-check"></i><span>简体中文</span></div>
                <div class="language"><span>English</span></div>
                <li class="font" slot="reference">
                  <span class="wenzi">简体中文 <i class="el-icon-d-caret"></i></span>
                </li>
              </el-popover>

              <li class="local">
                <mu-button icon>
                  <mu-icon value="notifications"></mu-icon>
                </mu-button>
              </li>
              <el-popover
                v-if="$store.state.isLogin"
                placement="bottom"
                width="200"
                trigger="click">
                  <router-link :to="'/user/' + id "><div class="userSet"><i class="el-icon-menu"></i><span>我的资料</span></div></router-link>
                  <router-link :to="'/user/' + id  + '/userSetting'"><div class="userSet"><i class="el-icon-setting"></i><span>个人设置</span></div></router-link>
                  <hr>
                  <div class="userSet" @click="logout" ><i class="el-icon-caret-right"></i><span>退出</span></div>
                  <li class="selfinfo" slot="reference" >
                      <img class="avatar " :src="avatar">
                      <span class="username">{{name}}</span>
                  </li>
              </el-popover>
            <li class="login" v-if="!$store.state.isLogin">
              <span @click="dologin" class="loginRegister" >登录/注册</span>
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
              id: '',
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
              this.id = res.data.id
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
<style>
  .mu-appbar-title{
    height: 52px;
    line-height: 52px;
  }
</style>
<style scoped>
  .head{
    position: fixed;
    height: 52px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .container{
    margin: 0 auto;
    width: 80%;
    height: 52px;
  }
  .title{
    cursor: pointer;
    color: #426799;
    font-size: 18px;
    float: left;
    line-height: 52px;
    margin: 0 15px 0 0;
  }
  .controls{
    float: left;
    height: 52px;
  }
  .Button {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    line-height: 20px;
    padding: 8px 13px;
    color: #667c99;
    font-size: 14px;
  }
  .header-right{
    float: right;
    width: 469px;
    height: 36px;
  }
  .header-con{
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 520px;
    height: 36px;
  }
  .search{
    display: inline-block;
    vertical-align: middle;
    width: 235px;
    height: 36px;
    position: absolute;
    bottom: 7px;
    margin-right: 10px;
    float: left;
  }
  .FormControl {
    display: block;
    height: 36px;
    width: 235px;
    padding: 8px 13px;
    font-size: 13px;
    line-height: 1.5;
    color: #667c99;
    background-color: #e8ecf3;
    border: 2px solid transparent;
    border-radius: 4px;
  }
  .font{
    display: inline-block;
    vertical-align: middle;
    width: 99px;
    height: 36px;
    position: absolute;
    bottom: 7px;
    right: 305px;
    cursor: pointer;
  }
  .wenzi{
    display: block;
    width: 99px;
    height: 36px;
    padding: 8px 13px;
    font-size: 14px;
    line-height: 1.5;
    color: #667c99;
  }
  .local{
    display: inline-block;
    vertical-align: middle;
    width: 36px;
    height: 36px;
    position: absolute;
    bottom: 13px;
    right: 265px;
  }
  .mu-appbar {
    background-color: #fff;
  }
.login{
  display: inline-block;
  vertical-align: middle;
  height: 36px;
  width: 98px;
  position: absolute;
  bottom: 25px;
  right: 150px;
  cursor: pointer;
}
.loginRegister{
  display: block;
  height: 36px;
  width: 98px;
  padding: 8px 13px;
  font-size: 14px;
  color: #667c99;
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
  .selfinfo{
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    bottom: 7px;
    right: 140px;
    width: 100px;
    height: 36px;
  }
  .selfinfo:hover{
    background-color: #e8ecf3;
    border-radius: 20px;
  }
  .userSet{
    font-size: 16px;
    padding: 5px;
    color: #667c99;
  }
  .userSet:hover{
    background-color: #e8ecf3;
    border-radius: 3px;
    cursor: pointer;
  }
  .userSet > i{
    margin-right: 10px;
    font-weight: 600;
  }
  .language{
    text-align: center;
    border-radius: 5px;
  }
  .language:hover{
    background-color: #e8ecf3;
  }
  .language > i{
    font-weight: 600;
  }
  .language > span{
    padding: 18px;
    font-size: 18px;
  }
</style>
