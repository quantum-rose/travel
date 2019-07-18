<template>
  <div class="city-scroll" ref="cityScroll">
    <div class="content">
      <div class="area">
        <div class="title active">#</div>
        <div class="sub-title">当前定位</div>
        <ul class="clearfix">
          <li>
            <a href="javascript:;">
              <i class="iconfont">&#xe65e;</i> 郑州
            </a>
          </li>
        </ul>
        <div class="sub-title">历史访问城市</div>
        <ul class="clearfix">
          <li>
            <a href="javascript:;">郑州</a>
          </li>
          <li>
            <a href="javascript:;">洛阳</a>
          </li>
          <li>
            <a href="javascript:;">上海</a>
          </li>
        </ul>
        <div class="sub-title">热门城市</div>
        <ul class="clearfix">
          <li v-for="item in hotCities" :key="item.id">
            <a href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <!-- 按拼音首字母排列的城市列表 -->
      <div class="area" v-for="(item, key) in cityList" :key="key">
        <div class="title">{{key}}</div>
        <a href="javascript:;" v-for="entry in item" :key="entry.id">{{entry.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'city-list',
  props: {
    hotCities: Array,
    cityList: Object
  },
  mounted() {
    let cityScroll = new BScroll(this.$refs.cityScroll, {
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
      }
    })
  },
  methods: {
    heightLightBorder() {}
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/varibles.styl';

.city-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 1.68rem;

  .content {
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

          >a {
            flex: 1;
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

      >a {
        display: block;
        padding: 0 0.4rem;
        line-height: 0.84rem;

        &:active {
          background-color: #f8f8f8;
        }

        &+a::before {
          content: '';
          display: block;
          border-top: 0.01rem solid #eee;
        }
      }
    }
  }
}
</style>
