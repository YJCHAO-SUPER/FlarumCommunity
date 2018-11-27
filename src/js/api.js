import  axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'
axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_token')
//获取分类
export function getCategory(para) {
  return axios({
    method:'get',
    url:'/api/category',
    params:para
  })
}

//获取文章分类信息
export function getArticleInfo(para) {
  return axios({
    method: 'get',
    url: '/api/article',
    params: para
  })
}

//发送注册信息
export  function sendRegisterInfo(para) {
  return axios({
    method: 'post',
    url: '/sendRegisterInfo',
    data: para
  })
}

//发送登录信息
export function sendLoginInfo(para) {
  return axios({
    method: 'post',
    url: '/sendLoginInfo',
    data: para
  })
}

//发送添加话题信息
export function sendTopicInfo(para) {
  return axios({
    method:'post',
    url:'sendTopicInfo',
    data:para
  })
}

//根据话题id 获取一篇话题信息
export function getTopicByIdInfo(para) {
  return axios({
    method:'get',
    url:'getTopicByIdInfo',
    params:para
  })
}

//根据用户id获取用户信息
export function getUserInfoById(para) {
  return axios({
    method:'get',
    url:'getUserInfoById',
    params:para
  })
}
