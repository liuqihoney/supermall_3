<template>
  <div class="wrapper">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li v-for="n in 100" :key="n">列表{{n}}</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'TestBetterScroll',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 默认情况下BScroll是不可以实时的监听滚动位置
    // probe 侦测
    // 0,1都是不侦测实时位置
    // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
    // 3：只要滚动，都侦测
    // pullUpLoad: true 为了加载上拉加载更多
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3,
      click: true,
      pullUpLoad: true
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    })
    this.scroll.on('pullingUp', () => { // 监听上拉事件，到底部就会打印，可以去请求后台数据
      console.log("上拉加载更多")
      // 发送网络请求，请求更多页的数据

      //等数据请求完成，并且将新的数据展示出来后，
      //要让他再次调用这个方法，需要调用this.scroll.finishPullUp()
      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000);
    })
  },
  components: {

  },
  methods: {
    btnClick() {
      console.log("------")
    }
  }
}
</script>

<style>
.wrapper {
  height: 200px;
  background-color: sandybrown;
  overflow: hidden;
}
</style>
