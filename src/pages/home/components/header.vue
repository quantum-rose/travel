<template>
  <div class="header" :style="headerStyle">
    <div class="header-left">
      <router-link to="/city" :style="cityStyle">
        <div class="city">{{ currentCity.name }}</div>
        <i class="iconfont">&nbsp;&#xe62d;</i>
      </router-link>
    </div>
    <div class="search">
      <i class="iconfont">&#xe632;</i>
      <input
        type="search"
        placeholder="洛阳攻略·游记·精选酒店"
        :style="searchStyle"
      />
    </div>
    <div class="header-right">
      <div class="circle" :style="circleStyle">
        <span :style="pointStyle"></span>
        <span :style="pointStyle"></span>
        <span :style="pointStyle"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home-header',
  mounted() {
    window.onscroll = this.handleScroll
  },
  props: {
    scrollY: Number
  },
  data() {
    return {
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none'
      },
      searchStyle: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      circleStyle: {
        borderColor: 'rgb(255,255,255)'
      },
      pointStyle: {
        backgroundColor: 'rgb(255,255,255)'
      },
      cityStyle: {
        color: 'rgb(255,255,255)'
      },
      // 滚动区域y坐标为-90时的样式是否已设置的标识
      flag: false
    }
  },
  computed: {
    // 当前选择的城市
    ...mapState(['currentCity'])
  },
  watch: {
    scrollY(y) {
      // y坐标超过-90
      if (y <= -90) {
        // 重置y为-90
        y = -90
        // 为头部设置下方阴影
        this.headerStyle.boxShadow = '0 0.04rem 0.04rem rgba(0,0,0,.1)'
      } else {
        // y坐标不足-90，恢复标识变量、取消头部阴影
        this.flag = false
        this.headerStyle.boxShadow = 'none'
      }
      // 根据y坐标的值，实时设置头部样式，实现渐变效果
      this.headerStyle.backgroundColor = `rgba(255,255,255,${y / -90})`
      let rgb = 255 + (y / 1350) * 255
      let color = `rgb(${rgb},${rgb},${rgb})`
      this.searchStyle.backgroundColor = color
      this.circleStyle.borderColor = color
      rgb = 255 + (y / 150) * 255
      color = `rgb(${rgb},${rgb},${rgb})`
      this.cityStyle.color = color
      this.pointStyle.backgroundColor = color
      // 本次样式设置完毕后，如果y坐标为-90，改变标识变量
      if (y === -90) this.flag = true
    },
    // 标识变量改变后，向外触发事件，传递标志变量的值
    flag(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.header {
  display: flex;
  position: fixed;
  z-index: 1001;
  top: 0;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;

  .header-left {
    padding: 0 0.21rem;

    a {
      display: flex;

      .city {
        max-width: 4em;
        ellipsis();
      }

      .iconfont {
        font-size: 0.24rem;
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    flex: 1;

    .iconfont {
      position: absolute;
      margin-left: 0.12rem;
      color: $themeColor;
    }

    input {
      flex: 1;
      padding: 0 0.28rem 0 0.56rem;
      line-height: 0.64rem;
      border-radius: 0.32rem;
    }
  }

  .header-right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.2rem;

    .circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.6rem;
      height: 0.48rem;
      border-radius: 0.48rem;
      border: 0.01rem solid rgb(255, 255, 255);
      box-sizing: border-box;

      span {
        display: inline-block;
        margin: 0 0.04rem;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 0.04rem;
      }
    }
  }
}
</style>
