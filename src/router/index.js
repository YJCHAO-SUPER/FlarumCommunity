import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Topic from '@/pages/Topic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/topic',
      name: 'topic',
      component: Topic
    },
  ]
})
