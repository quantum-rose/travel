<template>
  <div>
    <home-header :scroll-y="scrollY"></home-header>
    <better-scroll
      class="home-scroll"
      :ref="'homeScroll'"
      :options="scrollOption"
      @scroll="handleScroll"
      @pullingUp="handlePullingUp"
    >
      <div class="content">
        <home-swiper :swiperImages="swiperImages"></home-swiper>
        <home-local-nav :localNavs="localNavs"></home-local-nav>
        <home-grid-nav :gridNavs="gridNavs"></home-grid-nav>
        <home-subnav :subnavs="subnavs"></home-subnav>
        <div class="welcome">
          <div class="weather">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconduoyun" />
            </svg>
            <span class="temperature">35℃</span>
          </div>
          您好,欢迎来到{{ currentCity.name }}
        </div>
        <home-popular></home-popular>
        <home-recommend></home-recommend>
        <home-waterfall
          :sight="sight"
          :pagenum="pagenum"
          :pagesize="pagesize"
        ></home-waterfall>
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
import homePopular from './components/popular'
import homeRecommend from './components/recommend'
import homeWaterfall from './components/waterfall'

export default {
  name: 'home',
  created() {
    this.getHomeData()
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
        },
        pullUpLoad: {
          threshold: 50
        }
      },
      // 滚动区域的y坐标
      scrollY: 0,
      // 景点信息列表
      sight: [],
      // 当前请求的页数
      pagenum: 1,
      // 每页数据条数
      pagesize: 10
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {
    // 当前城市变化后重新获得首页数据
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
      // 获取瀑布流数据
      this.getSightData()
    },
    async getSightData() {
      const { data: result } = await this.$http.get(
        `data/sight${(this.pagenum - 1) % 2}.json`,
        {
          params: {
            cityid: this.currentCity.id,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        }
      )
      this.sight = [...this.sight, ...result]
      this.pagenum++
    },
    // 页面滚动事件，获取y坐标
    handleScroll({ y }) {
      this.scrollY = Math.ceil(y)
    },
    // 处理上拉加载
    async handlePullingUp() {
      await this.getSightData()
      this.$refs.homeScroll.BScroll.finishPullUp()
    }
  },
  components: {
    homeHeader,
    homeSwiper,
    homeLocalNav,
    homeGridNav,
    homeSubnav,
    homePopular,
    homeRecommend,
    homeWaterfall
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
  background-color: #f8f8f8;

  .welcome {
    position: relative;
    margin-bottom: 0.2rem;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.64rem;

    .weather {
      position: absolute;
      left: 0.24rem;

      .icon {
        font-size: 0.5rem;
      }

      .temperature {
        font-size: 0.24rem;
      }
    }
  }
}
</style>
