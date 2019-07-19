<template>
  <div>
    <home-header :scroll-y="scrollY" @change="flagChanged"></home-header>
    <div class="scroll-wrapper" ref="homeScroll">
      <div class="content">
        <home-swiper></home-swiper>
        <home-local-nav></home-local-nav>
        <home-grid-nav></home-grid-nav>
        <home-subnav></home-subnav>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
        <div>c</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import homeHeader from './components/header'
import homeSwiper from './components/swiper'
import homeLocalNav from './components/localNav'
import homeGridNav from './components/gridNav'
import homeSubnav from './components/subnav'

export default {
  name: 'home',
  mounted() {
    this.homeScroll = new BScroll(this.$refs.homeScroll, {
      probeType: 3,
      bounce: {
        top: false,
        bottom: false,
        left: false,
        right: false
      }
    })
    this.homeScroll.on('scroll', this.handleScroll)
  },
  updated() {
    // 组件更新后刷新betterScroll
    this.homeScroll.refresh()
  },
  data() {
    return {
      scrollY: 0,
      // 滚动区域y坐标为-90时的样式是否已设置的标识
      flag: false
    }
  },
  methods: {
    handleScroll({ y }) {
      // 如果y坐标超过-90且标识变量为真，说明头部渐变已完成，直接退出，避免触发无意义的updated生命周期钩子
      if (y <= -90 && this.flag) return
      this.scrollY = Math.ceil(y)
    },
    // 感知头部子组件flag变化的函数，并保存
    flagChanged(flag) {
      this.flag = flag
    }
  },
  components: {
    homeHeader,
    homeSwiper,
    homeLocalNav,
    homeGridNav,
    homeSubnav
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .content {
    width: 100%;
  }
}
</style>
