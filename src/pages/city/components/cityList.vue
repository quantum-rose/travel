<template>
  <better-scroll class="city-scroll" ref="cityScroll" :options="scrollOption">
    <div class="content">
      <div class="area">
        <div class="title active" ref="#">#</div>
        <div class="sub-title">当前定位</div>
        <ul class="clearfix">
          <li>
            <button>
              <i class="iconfont">&#xe65e;</i> 郑州
            </button>
          </li>
        </ul>
        <div class="sub-title">历史访问城市</div>
        <ul class="clearfix">
          <li>
            <button>郑州</button>
          </li>
          <li>
            <button>洛阳</button>
          </li>
          <li>
            <button>上海</button>
          </li>
        </ul>
        <div class="sub-title">热门城市</div>
        <ul class="clearfix">
          <li v-for="item in hotCities" :key="item.id">
            <button @click="chooseCity(item)">{{item.name}}</button>
          </li>
        </ul>
      </div>
      <!-- 按拼音首字母排列的城市列表 -->
      <ul class="area" v-for="(item, key) in cityList" :key="key">
        <li class="title" :ref="key">{{key}}</li>
        <li v-for="entry in item" :key="entry.id" @click="chooseCity(entry)">{{entry.name}}</li>
      </ul>
    </div>
  </better-scroll>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'city-list',
  props: {
    // 热门城市列表
    hotCities: Array,
    // 所有城市列表
    cityList: Object,
    // 城市拼音首字母，用于快速定位
    letter: String
  },
  updated() {
    this.$refs.cityScroll.refresh()
  },
  data() {
    return {
      // better-scroll配置
      scrollOption: {
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LI)$/
        }
      }
    }
  },
  watch: {
    // 监听字母的变化，滚动页面到指定位置
    letter(val) {
      this.$refs.cityScroll.scrollToElement(
        this.$refs[this.letter][0] || this.$refs[this.letter]
      )
    }
  },
  methods: {
    // 点击选择城市
    chooseCity(city) {
      this.changeCurrentCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCurrentCity'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.city-scroll {
  position: absolute;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 1.68rem;
  background-color: #f8f8f8;

  .content {
    background-color: #fff;

    .area {
      .title {
        padding-left: 0.4rem;
        line-height: 0.48rem;
        background-color: #eee;
        font-size: 0.24rem;

        &.active {
          color: $themeColor;
        }
      }

      .sub-title {
        padding: 0 0.4rem;
        line-height: 0.84rem;
        color: #999;
      }

      >ul {
        margin: 0 0.3rem;

        >li {
          float: left;
          display: flex;
          width: 33.33%;
          padding: 0 0.1rem 0.2rem 0.1rem;
          box-sizing: border-box;

          >button {
            flex: 1;
            background-color: #fff;
            line-height: 0.64rem;
            text-align: center;
            box-sizing: border-box;
            border: 0.02rem solid #eee;
            border-radius: 0.08rem;

            &:active {
              border-color: $themeColor;
            }

            .iconfont {
              font-size: 0.28rem;
              color: $themeColor;
            }
          }
        }
      }

      >li {
        padding: 0 0.4rem;
        line-height: 0.84rem;

        +li:active {
          background-color: #f8f8f8;
        }

        &:nth-child(n+3)::before {
          content: '';
          display: block;
          height: 0.01rem;
          margin-bottom: -0.01rem;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
