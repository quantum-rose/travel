<template>
  <div>
    <home-header :scroll-y="scrollY"></home-header>
    <home-local-hot
      :localHot="localHot"
      v-show="topLocalHotVisible"
    ></home-local-hot>
    <better-scroll
      class="home-scroll"
      :ref="'homeScroll'"
      :options="scrollOption"
      @scroll="handleScroll"
      @pullingUp="getSightData"
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
        <home-popular :popularList="popularList"></home-popular>
        <home-recommend :recommend="recommend"></home-recommend>
        <home-local-hot :localHot="localHot" ref="localHot"></home-local-hot>
        <home-waterfall
          :sight="sight"
          :pagenum="pagenum"
          :pagesize="pagesize"
          @finishPullUp="finishPullUp"
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
import homeLocalHot from './components/lovalHot'
import homeWaterfall from './components/waterfall'

export default {
  name: 'home',
  created() {
    this.getHomeData()
  },
  activated() {
    this.$refs.homeScroll.refresh()
  },
  updated() {
    this.localHotOffsetTop = this.$refs.localHot.$el.offsetTop
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
      // 排行榜数据
      popularList: [],
      // 玩法研究院数据
      recommend: [],
      // 当地热门数据
      localHot: [],
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
      // 当地热门的offsetTop
      localHotOffsetTop: Infinity,
      // 景点信息列表
      sight: [],
      // 当前请求的页数(初始为0)
      pagenum: 0,
      // 每页数据条数
      pagesize: 10
    }
  },
  computed: {
    // 顶部的当地热门是否可见的标识
    topLocalHotVisible() {
      return -this.scrollY > this.localHotOffsetTop
    },
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
      this.popularList = data.popularList
      this.recommend = data.recommend
      this.localHot = data.localHot
      this.getSightData()
    },
    // 获取景点列表数据
    async getSightData() {
      this.pagenum++
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
    },
    // 页面滚动事件，获取y坐标
    handleScroll({ y }) {
      this.scrollY = Math.ceil(y)
    },
    // 上拉数据加载完成
    finishPullUp() {
      this.$refs.homeScroll.finishPullUp()
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
    homeLocalHot,
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
