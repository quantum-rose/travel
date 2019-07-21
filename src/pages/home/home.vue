<template>
  <div>
    <home-header :scroll-y="scrollY" @change="flagChanged"></home-header>
    <better-scroll
      class="home-scroll"
      :ref="'homeScroll'"
      :options="scrollOption"
      @scroll="handleScroll"
    >
      <div class="content">
        <home-swiper :swiperImages="swiperImages"></home-swiper>
        <home-local-nav :localNavs="localNavs"></home-local-nav>
        <home-grid-nav :gridNavs="gridNavs"></home-grid-nav>
        <home-subnav :subnavs="subnavs"></home-subnav>
        <div :ref="'div'+i" v-for="(item, i) in Array(100)" :key="i">{{i}}</div>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import homeHeader from './components/header'
import homeSwiper from './components/swiper'
import homeLocalNav from './components/localNav'
import homeGridNav from './components/gridNav'
import homeSubnav from './components/subnav'

export default {
  name: 'home',
  created() {
    this.getHomeData()
  },
  updated() {
    this.$refs.homeScroll.refresh()
  },
  data() {
    return {
      // 轮播图数据
      swiperImages: [],
      // 本地导航数据
      localNavs: [],
      // 格子导航数据
      gridNavs: [],
      // 子导航数据
      subnavs: [],
      // better-scroll配置
      scrollOption: {
        probeType: 3,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      },
      // 滚动区域的y坐标
      scrollY: 0,
      // 滚动区域y坐标为-90时的样式是否已设置的标识
      flag: false
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {
    currentCity() {
      this.getHomeData()
    }
  },
  methods: {
    // 获取首页数据
    async getHomeData() {
      const { data: result } = await this.$http.get(
        'data/home.json?cityid=' + this.currentCity.id
      )
      if (!result.ret) return
      const data = result.data
      this.swiperImages = data.swiperImages
      this.localNavs = data.localNavs
      this.gridNavs = data.gridNavs
      this.subnavs = data.subnavs
    },
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
.home-scroll {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>