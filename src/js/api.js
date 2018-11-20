import  axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'

//获取分类
export function getCategory(para) {
  return axios({
    methods:'get',
    url:'/api/category',
    params:para
  })
}

//获取文章分类信息
export function getArticleInfo(para) {
  return axios({
    methods: 'get',
    url: '/api/article',
    params: para
  })
}
