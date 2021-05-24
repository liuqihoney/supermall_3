import {request} from './request'

// 请求首页轮播图数据
export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}
