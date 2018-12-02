import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Topic from '@/pages/Topic'
import User from '@/pages/User'
import UserSetting from '@/components/UserSetting'
import UserTopic from '@/components/UserTopic'
import UserReply from '@/components/UserReply'
import UserMention from '@/components/UserMention'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/topic/:id(\\d+)',
      name: 'topic',
      component: Topic
    },
    {
      path: '/user/:id(\\d+)',
      name: 'user',
      component: User,
      children : [
        {
          path:'userTopic',
          name:'user-userTopic',
          component:UserTopic
        },
        {
          path:'userSetting',
          name:'user-userSetting',
          component:UserSetting
        },
        {
          path:'/',
          name:'user-userReply',
          component:UserReply
        },
        {
          path:'userMention',
          name:'user-userMention',
          component:UserMention
        }
      ]
    },

  ]
})
