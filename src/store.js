import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isLogin:false,
    user: {}
  },
  mutations: {
    setLogin(state,value){
      state.isLogin = value
    },
    SET_USER(state,{id=null,avatar,name=null}){
      if (id != null){
        state.user.id = id
      }
      if(name != null){
        state.user.name = name
      }
      if(avatar !=null){
        state.user.avatar = avatar
      }
    }
  }
})
export  default  store
