import axios from 'axios'

// 导出一个方法可以被调用
export function request(config) {
  // 1. 创建一个实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:800',
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.1请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.使用实例
  return instance(config)

}
