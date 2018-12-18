import  axios from 'axios'

let api_url  = 'http://localhost:9090'
axios.defaults.baseURL = api_url

axios.interceptors.request.use(
  config => {

    if (config.method === "post") {
      config.headers['Authorization'] = localStorage.getItem('jwt_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

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

//发送修改密码的信息
export function sendChangePassword(para) {
  return axios({
    method : 'post',
    url : '/sendChangePassword',
    data : para
  })
}

//发送修改邮箱的信息
export function sendChangeEmail(para) {
  return axios({
    method : 'post',
    url : '/sendChangeEmail',
    data : para
  })
}

//上传头像
export function uploadAvatar (para) {
  return axios({
    method : 'post',
    url : '/uploadAvatar',
    data : para
  })
}

//检查用户信息
export  function doCheckLogin(para) {
  return axios({
    method:'post',
    url:'/doCheckLogin',
    data:para
  })
}

//根据话题id获取所有回复
export  function getReplyByTopicId(para) {
  return axios({
    method:'get',
    url:'/getReplyByTopicId',
    params:para
  })
}

//添加话题回复
export function addReply(para) {
  return axios({
    method:'post',
    url:'/addReply',
    data:para
  })
}

//根据回复id获取回复内容
export function getShowEditReply(para) {
  return axios({
    method:'get',
    url:'/getShowEditReply',
    params:para
  })
}

//编辑回复
export function editReply(para) {
  return axios({
    method:'post',
    url:'/editReply',
    data:para
  })
}

//删除回复
export function deleteReplyById(para) {
  return axios({
    method:'get',
    url:'/deleteReplyById',
    params:para
  })
}

//根据文章id找到文章
export function getTopicById(para) {
  return axios({
    method:'get',
    url:'/getTopicById',
    params:para
  })
}
