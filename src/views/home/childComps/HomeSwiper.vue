<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageload() {
      // 只要发送一次就好
      if(!this.isload) {
        this.$emit('swiperImageload')
        this.isload = true
      }
    }
  }
}
</script>

<style scoped>
</style>
