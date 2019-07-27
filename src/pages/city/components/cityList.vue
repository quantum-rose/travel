<template>
  <better-scroll
    class="city-scroll"
    ref="cityScroll"
    :options="scrollOption"
    @scroll="handleScroll"
  >
    <div class="content">
      <div class="area">
        <div class="title active" ref="#">#</div>
        <div class="sub-title">当前定位</div>
        <ul class="clearfix">
          <li>
            <button @click="chooseCity(currentCity)">
              <i class="iconfont">&#xe65e;</i>
              {{ currentCity.name }}
            </button>
          </li>
        </ul>
        <div class="sub-title">历史访问城市</div>
        <ul class="clearfix">
          <li v-for="item in historyCity" :key="item.id">
            <button @click="chooseCity(item)">{{ item.name }}</button>
          </li>
        </ul>
        <div class="sub-title">热门城市</div>
        <ul class="clearfix">
          <li v-for="item in hotCities" :key="item.id">
            <button @click="chooseCity(item)">{{ item.name }}</button>
          </li>
        </ul>
      </div>
      <!-- 按拼音首字母排列的城市列表 -->
      <ul class="area" v-for="(item, key) in cityList" :key="key">
        <li class="title" :ref="key">{{ key }}</li>
        <li v-for="entry in item" :key="entry.id" @click="chooseCity(entry)">
          {{ entry.name }}
        </li>
      </ul>
    </div>
    <div class="sticky" v-show="isScrolled" :style="stickyTop">
      {{ currentTitle }}
    </div>
  </better-scroll>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'city-list',
  props: {
    // 历史访问城市
    historyCity: Array,
    // 热门城市列表
    hotCities: Array,
    // 所有城市列表
    cityList: Object,
    // 城市拼音首字母，用于快速定位
    letter: String
  },
  activated() {
    this.$refs.cityScroll.BScroll.refresh()
  },
  data() {
    return {
      // better-scroll配置
      scrollOption: {
        probeType: 3,
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LI)$/
        }
      },
      // 滚动区域的y坐标
      scrollY: 0,
      // 每个字母标题的offsetTop
      titlePositionArr: [],
      // 当前列表显示的标题字母
      currentTitle: '',
      // sticky元素的top
      stickyTop: 'top:0'
    }
  },
  computed: {
    // 当前选择的城市
    ...mapState(['currentCity']),
    // 页面是否已向上滚动的标识
    isScrolled() {
      return this.scrollY < 0
    },
    // 提取字母列表，不包括#
    letterArr() {
      const arr = []
      for (let key in this.cityList) {
        arr.push(key)
      }
      return arr
    }
  },
  watch: {
    // 监听y坐标的变化，实时改变sticky元素的内容，实现类似粘性定位效果
    scrollY(y) {
      // 先获取每一个字母标题的offsetTop，数组为空时才执行
      if (this.titlePositionArr.length === 0) {
        this.titlePositionArr.push({
          letter: '#',
          offsetTop: this.$refs['#'].offsetTop
        })
        this.letterArr.forEach(item => {
          // 采用向头部插入新元素的方式，即得到一个逆序的字母表，因为这样更方便，代码相关row111,row123
          this.titlePositionArr.unshift({
            letter: item,
            offsetTop: this.$refs[item][0].offsetTop
          })
        })
      }
      // 用于实现标题切换时的特效，24(row111)为标题的高度
      let temp = this.titlePositionArr.find(
        item => y + item.offsetTop <= 24 && y + item.offsetTop > 0
      )
      if (temp) {
        // 如果有符合条件的结果，改变sticky元素的top值
        let offsetTop = y + temp.offsetTop - 24
        this.stickyTop = `top:${offsetTop}px;`
      } else {
        // 没有则重置
        this.stickyTop = 'top:0;'
      }
      // 用于更改sticky元素的内容，即根据不同情况显示不同的字母
      /**
       * 随着页面向上滚动，y会逐渐变小，或者说y的绝对值-y会越来越大
       * 而find的特性是返回第一个符合条件的元素
       * 所以我们的条件应该是找到第一个符合offsetTop值小于-y的项
       * 所以数组中每一项的offsetTop值应该按降序排列
       * 因此row103采用逆序的方法
       */
      let currentTitle = this.titlePositionArr.find(
        item => -y >= item.offsetTop
      )
      if (currentTitle) this.currentTitle = currentTitle.letter
    },
    // 监听字母的变化，滚动页面到指定位置
    letter(val) {
      this.$refs.cityScroll.scrollToElement(
        this.$refs[this.letter][0] || this.$refs[this.letter]
      )
    }
  },
  methods: {
    // 向上取整，保存y坐标
    handleScroll({ y }) {
      this.scrollY = Math.ceil(y)
    },
    // 点击选择城市
    chooseCity(city) {
      this.$emit('choose', city)
    }
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

  .sticky {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-left: 0.4rem;
    line-height: 0.48rem;
    background-color: #eee;
    font-size: 0.24rem;
    color: $themeColor;
  }
}
</style>
