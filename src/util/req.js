import axios from 'axios'
import {HOST, ENV} from './config'

// 创建axios实例
const BaseUrl = HOST[ENV];
// const token = store.state.token
const token = window.localstorage.getItem('token') || 'as5df6asd5f6asdf5asd6f523232212k562000112';

const instance = axios.create({
  baseURL: BaseUrl, // config的BaseUrl
  timeout: 10 * 1000 // 请求超时时间
})

// request拦截器
instance.interceptors.request.use((config) => {
  if (token) {
    config.headers['token'] = token
    config.headers['Authorization'] = 'Bearer' + ' ' + token // 让每个请求携带token -- ['Authorization']为自定义key;
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use((response) => {
  const res = response.data
  if (res && (res.status !== 'success')) {
    return Promise.reject(res.error)
  }
  return response
}, error => {
  Promise.reject(error)
})

// 定义请求
const request = async (url = '', type = 'get', data = {}, isQ = true) => {
  let result = null
  if (type.toLowerCase === 'get') {
    await instance.get(url, { params: data }).then((res) => {
      result = res
    })
  }
  if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
    if (isQ) {
      await instance.post(url, qs.stringify(data)).then(res => {
        result = res
      })
    } else {
      await instance.post(url).then(res => {
        result = res
      })
    }
  }
  return result
}

export default request