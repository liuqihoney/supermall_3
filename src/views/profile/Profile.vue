<template>
  <div>
    <scroll class="content">
      <ul>
        <button>按钮</button>
        <li v-for="n in 100" :key="n">列表{{n}}</li>
      </ul>
    </scroll>
    <h2>我的</h2>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Profile',
  data() {
    return {
      scroll: null
    }
  },
  components: {
    Scroll
  },
  mounted() {

  }
}
</script>

<style scoped>
.content {
  height: 300px;
  background-color: sandybrown;
  overflow: hidden;
}
</style>
