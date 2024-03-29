import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载导入组件
const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Cart = () => import('../views/cart/Cart.vue');
const Profile = () => import('../views/profile/Profile.vue');
const Detail = () => import('../views/detail/Detail.vue');

// 1.安装插件
Vue.use(VueRouter)

//创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
];

// 2.创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history' // 让url为html5的history格式
})

// 3.导出路由对象
export default router
