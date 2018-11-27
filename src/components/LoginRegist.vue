<template>
  <div style="height: 100vh;width: 100vw;position: fixed;z-index: 9">
    <div class="all"></div>
    <div class="wrapper">
      <input type="checkbox" name="flipper__checkbox" id="flipper__checkbox" class="flipper__checkbox" hidden />
      <div class="form__container" :class="{'round': statu==='login'}">
        <!-- Front side -->
        <div class="form__login" v-if="">
          <h1 class="form__header">Login</h1>
          <div id="loginForm" class="form">
            <div class="form__group">
              <label for="mail"><span class="label__icon"><i class="material-icons">person</i></span></label>
              <input id="mail" name="Lemail"  v-model="Lemail" class="form__element" type="email" placeholder="Email" required />
            </div>
            <div class="form__group">
              <label for="password"><span class="label__icon"><i class="material-icons">lock</i></span></label>
              <input id="password" name="Lpassword" v-model="Lpassword" class="form__element" type="password" placeholder="Password" required />
            </div>
            <div class="form__group">
              <label for="checkbox"><input id="checkbox" name="checkbox" class="checkbox--forget" type="checkbox" /><span class="icon--checkbox fa fa-check"></span> Remember me</label>
              <a class="form__link link--right" href="#">Forgot your password?</a>
            </div>
            <div class="form__group">
              <input class="form__button" @click="login" type="button" value="Login" />
            </div>
            <small>Not a member yet? <label for="flipper__checkbox" class="form__link" @click="statu='register'">Create your account</label>.</small>
          </div>
        </div>
        <!-- Back side -->
        <div class="form__signup">
          <h1 class="form__header">Sign Up</h1>
          <div id="signupForm" class="form">
            <div class="form__group">
              <label for="signUpName"><span class="label__icon"><i class="material-icons">person</i></span></label>
              <input id="signUpName" name="signUpName"  v-model="Rname" class="form__element" type="text" placeholder="Full Name" required />
            </div>
            <div class="form__group">
              <label for="signUpMail"><span class="label__icon"><i class="material-icons">email</i></span></label>
              <input id="signUpMail" name="signUpMail" v-model="Remail" class="form__element" type="email" placeholder="Email" required />
            </div>
            <div class="form__group">
              <label for="signUpPassword"><span class="label__icon"><i class="material-icons">lock</i></span></label>
              <input id="signUpPassword" name="signUpPassword" v-model="Rpassword" class="form__element" type="password" placeholder="Password" required />
            </div>
            <div class="form__group">
              <input class="form__button" @click="regist" type="button" value="Sign up" />
            </div>
            <small>Are you a member? <label for="flipper__checkbox" class="form__link" @click="statu='login'">Click here to login</label></small>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {sendRegisterInfo} from "../js/api";
  import {sendLoginInfo} from "../js/api";

  export default {
        name: "LoginRegist",
      data(){
          return{
            statu: 'login',
            Lemail:'',
            Lpassword:'',
            Rname:'',
            Remail:'',
            Rpassword:''
          }
      },
      methods:{
        login(){
          let para = {
            Lemail  : this.Lemail,
            Lpassword : this.Lpassword
          }
          sendLoginInfo(para).then((res)=>{
            if(res.data.code == 200){
              localStorage.setItem('jwt_token',res.data.ACCESS_TOKEN)
              this.$store.commit('setLogin', true)
                this.$emit('login',false)
            }else{
              alert(res.data.error)
            }
          })

        },
        regist(){
          let para  = {
            name:this.Rname,
            email:this.Remail,
            password:this.Rpassword
          }
          sendRegisterInfo(para).then((res)=>{
            this.statu = 'login'
          })
        }
      }
    }
</script>

<style scoped>
  .round {
    -webkit-transform: rotateY(0deg) !important;
  }
 .all{
    width: 100vw;
   height: 100vh;
   background-color: #000;
   position: fixed;
   opacity: 0.7;
   z-index: 2;
  }
  /**
 * Base
 */
  html,
  body {
    min-height: 100%;
  }

  a,
  input[type="submit"],
  .form__link {
    transition: all .25s ease;
  }

  /* Fallback for hidden attribute for older browsers - IE9 and lower */
  hidden {
    display: none;
  }

  small {
    display: block;
    margin-top: 1rem;
    font-size: 0.8125rem;
    text-align: center;
  }

  /**
   * Animation keyframes
   */
  @-webkit-keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  /**
   * Layout
   */
  .wrapper {
    position: relative;
    margin-top: 5rem;
    margin-right: auto;
    margin-left: auto;
    width: 23rem;
    background: #fff;
    box-shadow: 3px 3px 32px rgba(0, 0, 0, 0.25);
    -webkit-perspective: 1000;
    perspective: 1000;
    z-index: 2;
  }

  .flipper__checkbox:checked + .form__container {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .form__container {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: -webkit-transform .25s ease;
    transition: transform .25s ease;
    transition: transform .25s ease, -webkit-transform .25s ease;
  }

  .form__container--inner {
    padding: 2rem;
  }

  .form__login,
  .form__signup {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: #fff;
    box-shadow: 3px 3px 32px rgba(0, 0, 0, 0.25);
  }
  .form__login:after,
  .form__signup:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(270deg, #2196f3, #9acffa);
    background-size: 400% 400%;
    -webkit-animation: gradient 2s ease infinite;
    animation: gradient 2s ease infinite;
  }

  .form__login {
    z-index: 2;
    padding: 2rem;
    /* for firefox 31 */
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

 .form__signup {
   padding: 2rem;
   margin-left: -3.95rem;
   -webkit-transform: rotateY(180deg);
   transform: rotateY(180deg);
 }


 /**
  * Form default styling
  */
  .form__header {
    margin-bottom: 2rem;
    font-size: 1.618rem;
    font-weight: 700;
    text-align: center;
  }

  .form__group:nth-of-type(n+2) {
    margin-top: 1.5rem;
  }

  .label__icon {
    padding: 0.75rem 0;
    float: left;
    width: 3rem;
    font-size: 1.25rem;
    text-align: center;
    color: rgba(107, 141, 159, 0.25);
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    border-left: 1px solid #e1e1e1;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .form__element {
    padding-top: 1.11rem;
    padding-right: 1rem;
    padding-bottom: 1.11rem;
    width: 15.775rem;
    border-top: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    border-left: 0;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  .form__element:focus {
    outline: 0;
  }

  [type="checkbox"] {
    position: relative;
    margin-right: .5rem;
  }
  [type="checkbox"]:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #e1e1e1;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  label[for="checkbox"] {
    position: relative;
    font-size: .9rem;
    font-weight: 700;
  }

  .checkbox--forget:checked + .icon--checkbox {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .icon--checkbox {
    position: absolute;
    top: 4px;
    left: 6px;
    opacity: 0;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.91, 0.8, 0.84, 2.81);
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  .form__link {
    font-size: .8rem;
    font-weight: bold;
    text-decoration: underline;
    color: rgba(107, 141, 159, 0.75);
    cursor: pointer;
  }
  .form__link:focus, .form__link:hover {
    color: rgba(107, 141, 159, 0.95);
  }

  .link--right {
    float: right;
  }

  .form__button {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: inline-block;
    width: 100%;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    color: #fff;
    background-color: #2196f3;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
  }
  .form__button:focus, .form__button:hover {
    background-color: #0b74c7;
  }
</style>
