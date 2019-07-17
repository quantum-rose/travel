<template>
  <div class="header" :style="headerStyle">
    <div class="header-left">
      郑州
      <i class="iconfont">&#xe62d;</i>
    </div>
    <div class="search">
      <i class="iconfont">&#xe632;</i>
      <input type="text" placeholder="郑州热搜景点：郑州方特水上乐园" :style="searchStyle" />
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
export default {
  name: 'home-header',
  mounted() {
    window.onscroll = this.handleScroll
  },
  data() {
    return {
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
        color: '#fff'
      },
      searchStyle: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      circleStyle: {
        borderColor: 'rgba(255,255,255,.2)'
      },
      pointStyle: {
        backgroundColor: 'rgb(255,255,255)'
      }
    }
  },
  methods: {
    handleScroll(e) {
      if (window.scrollY > 90) {
        this.headerStyle.boxShadow = '0 0.04rem 0.04rem rgba(0,0,0,.2)'
      } else {
        this.headerStyle.boxShadow = 'none'
      }
      let scrollY = window.scrollY > 90 ? 90 : window.scrollY

      let opacity = scrollY / 90
      this.headerStyle.backgroundColor = `rgba(255,255,255,${opacity})`

      let color = 255 - (scrollY / 150) * 255
      this.headerStyle.color = `rgb(${color},${color},${color})`
      this.circleStyle.borderColor = `rgba(${color},${color},${color},.2)`
      this.pointStyle.backgroundColor = `rgb(${color},${color},${color})`

      let bgc = 255 - (scrollY / 810) * 255
      this.searchStyle.backgroundColor = `rgb(${bgc},${bgc},${bgc})`
    }
  }
}
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  position: fixed;
  top: 0;
  z-index: 1001;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;

  .header-left {
    float: left;
    width: 1.3rem;

    .iconfont {
      font-size: 0.24rem;
    }
  }

  .search {
    display: flex;
    align-items: center;
    flex: 1;
    height: 0.88rem;

    .iconfont {
      float: left;
      position: absolute;
      margin-left: 0.12rem;
      color: #00bcd4;
    }

    input {
      flex: 1;
      padding: 0 0.28rem 0 0.56rem;
      height: 0.64rem;
      line-height: 0.64rem;
      border-radius: 0.32rem;
    }
  }

  .header-right {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    width: 1rem;

    .circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.6rem;
      height: 0.48rem;
      border-radius: 0.48rem;
      border: 0.02rem solid rgba(255, 255, 255, 0.2);
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
