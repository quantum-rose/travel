<template>
  <div>
    <home-header :scroll-y="scrollY"></home-header>
    <div class="scroll-wrapper" ref="homeScroll">
      <div class="content">
        <home-swiper></home-swiper>
        <home-local-nav></home-local-nav>
        <home-grid-nav></home-grid-nav>
        <home-subnav></home-subnav>
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
    let homeScroll = new BScroll(this.$refs.homeScroll, {
      probeType: 3,
      bounce: {
        top: false,
        bottom: false,
        left: false,
        right: false
      }
    })
    homeScroll.on('scroll', this.handleScroll)
  },
  data() {
    return {
      scrollY: 0
    }
  },
  methods: {
    handleScroll({ y }) {
      this.scrollY = y
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
