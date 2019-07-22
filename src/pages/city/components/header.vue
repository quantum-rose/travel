<template>
  <div class="wrapper" :style="wrapperStyle">
    <div class="header">
      <div class="close" v-show="!isFocus">
        <router-link to="/">
          <i class="iconfont">&#xe624;</i>
        </router-link>
      </div>
      <div class="search">
        <i class="iconfont">&#xe632;</i>
        <input
          v-model.trim="keyword"
          type="text"
          placeholder="搜索全球城市"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="cancel" v-show="isFocus" @click="cancelSearch">取消</div>
    </div>
    <!-- 结果显示条件：输入框中有非空值 -->
    <better-scroll
      class="result-scroll"
      ref="resultScroll"
      :options="scrollOption"
      v-show="keyword"
    >
      <ul class="result">
        <img v-if="noResult" src="~images/no-city-min.png" />
        <li v-for="item in result" :key="item.id" @click="chooseCity(item)">{{item.name}}</li>
      </ul>
    </better-scroll>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'city-header',
  props: {
    cityList: Object
  },
  updated() {
    this.$refs.resultScroll.refresh()
  },
  activated() {
    // 组件激活时，重置一些变量，初始化
    this.isFocus = false
    this.keyword = ''
    this.wrapperStyle = ''
  },
  data() {
    return {
      // better-scroll配置
      scrollOption: {
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LI)$/
        }
      },
      // 输入的关键词
      keyword: '',
      // 输入框是否获得焦点
      isFocus: false,
      // 搜索结果
      result: [],
      // 包装纸样式
      wrapperStyle: ''
    }
  },
  computed: {
    // 搜索结果为空的标识
    noResult() {
      return this.keyword && !this.result.length
    }
  },
  watch: {
    // 监听输入关键词的变化
    keyword(keyword) {
      // 如果为空，清空搜索结果并直接退出
      if (!keyword) {
        this.result = []
        return
      }
      const tempArr = []
      // 遍历每一个城市
      for (let key in this.cityList) {
        this.cityList[key].forEach(item => {
          // 如果城市的拼音或名称包含关键词，push进临时数组
          if (
            item.name.indexOf(keyword) !== -1 ||
            item.spell.indexOf(keyword) !== -1
          ) {
            tempArr.push(item)
          }
        })
      }
      this.result = tempArr
    }
  },
  methods: {
    // 输入框获得焦点时
    handleFocus() {
      // 使包装纸扩大至全屏，成为半透明的遮罩层，滚动区域也会随父元素扩大
      this.wrapperStyle = 'bottom:0;'
      this.isFocus = true
    },
    // 输入框失去焦点时
    handleBlur() {
      // 如果关键词为空重置之前的改变
      if (!this.keyword) {
        this.wrapperStyle = ''
        this.isFocus = false
      }
    },
    // 点击取消
    cancelSearch() {
      this.keyword = ''
      this.handleBlur()
    },
    // 点击选择城市
    chooseCity(city) {
      this.$emit('choose', city)
    },
    ...mapMutations(['changeCurrentCity'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.wrapper {
  position: absolute;
  z-index: 1020;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .header {
    position: relative;
    z-index: 1040;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.8rem;
    background-color: #fff;

    .close {
      text-align: center;

      .iconfont {
        padding: 0 0.14rem 0 0.38rem;
        line-height: 0.56rem;
        font-size: 12px;
        font-weight: 700;
      }
    }

    .search {
      display: flex;
      align-items: center;
      flex: 1;

      .iconfont {
        position: absolute;
        margin-left: 0.36rem;
      }

      input {
        flex: 1;
        margin: 0 0.24rem;
        padding: 0 0.24rem 0 0.56rem;
        line-height: 0.56rem;
        border-radius: 0.08rem;
        background-color: #eee;
      }
    }

    .cancel {
      line-height: 0.56rem;
      padding-right: 0.24rem;
    }
  }

  .result-scroll {
    position: absolute;
    z-index: 1030;
    top: 0.8rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    &::before {
      content: '';
      position: absolute;
      z-index: 1040;
      left: 0;
      right: 0;
      height: 0.02rem;
      background-color: #eee;
    }

    >ul {
      background-color: #fff;

      >li {
        padding: 0 0.4rem;
        line-height: 0.84rem;

        &:active {
          background-color: #f8f8f8;
        }

        &::after {
          content: '';
          display: block;
          height: 0.01rem;
          margin-bottom: -0.01rem;
          background-color: #eee;
        }
      }

      img {
        display: block;
        margin: 0 auto;
        width: 50%;
      }
    }
  }
}
</style>
