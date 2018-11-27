import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Topic from '@/pages/Topic'
import User from '@/pages/User'

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
      component: User
    },
  ]
})
