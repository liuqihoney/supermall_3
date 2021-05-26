import {request} from './request'

// 请求首页轮播图数据
export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求商品的数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
