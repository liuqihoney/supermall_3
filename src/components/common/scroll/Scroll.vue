<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 设置这个为true,一些div,span等都可以点击
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }
    // 3.监听下拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

    // 查看可滚动的高度
    // console.log(this.scroll.scrollerHeight)
  },
  methods: {
    scrollTo(x, y, time=500) { //回到某个位置
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() { // 刷新继续上拉加载更多
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() { // 刷新，为了重新计算可滚动高度
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
