<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  v-show="tabIsFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageload="swiperImageload"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"></tab-control>
      <goods-list :goods="showgoods"></goods-list>

      <!-- 暂时要加这段，不然滚动不了,就是因为再图片加载前计算可滚动区域问题 -->
      <!-- <ul>
        <li v-for="n in 247" :key="n">列表{{n}}</li>
      </ul> -->
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMutidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      tabIsFixed: false,
      saveY: 0
    }
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.获取轮播图和推荐数据
    this.getHomeMutidata()
    // 2.获取商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1.图片加载完成的事件监听
    //防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // 这里有可能报错，没有定义refresh属性，因为写在created中时，元素还没有创建，this.$refs找不到scroll
      // this.$refs.scroll.refresh();
      refresh()
    })
  },
  destroyed() { // 组件销毁时调用
    console.log('Home destroyed')
  },
  activated() { // 组件活跃时调用用
    // 进来时，把保存的值赋给scroll对象，滚动到这个位置，事件为0
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() // 滚动到那个位置后，刷新下，不然会出现不能滚动的情况
  },
  deactivated() { // 组件不活跃时调用
    // 离开时保存滚动的位置
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /**这些是自定义事件 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    topClick() {
      // 拿到这个组件的scroll属性，再调用这个属性的scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500); // 调用new BScroll的scrollTo方法，在500ms内直接回到顶部
      this.$refs.scroll.scrollTo(0, 0)
      // console.log(this.$refs.scroll)
    },
    contentScroll(position) { // 如果y值大于1000，就让它显示
      // 监听返回顶部图标的显隐
      this.isShowBackTop = (-position.y) > 1000

      // 监听tabControl是否吸顶
      this.tabIsFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType) // 再次去请求数据
      // 刷新下次可以继续下拉加载更多
       this.$refs.scroll.finishPullUp()
    },
    swiperImageload() { //监听轮播图加载完成
      // 把轮播图完成后，offsetTop的值保存
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**这些是网络请求的方法 */
    getHomeMutidata() {
      getHomeMutidata().then(res => {
        this.banners = res.data.banner.list; // 保存banner的数据
        this.recommends = res.data.recommend.list; // 保存recommend的数据
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1 // 每次请求，page+1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list) // 把获取到的list数据解构再push到原有数组中
        this.goods[type].page += 1 // 请求完数据后，page已经有一页了，数组中+1
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /**在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /**原生滚动，这样可以让这个组件固定 */
  /* position: sticky;
  top: 44px; */

  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* .content {
  height: 524px;
  overflow: hidden;
  margin-top: 44px;
} */
</style>
