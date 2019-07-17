<template>
  <div class="header" :style="headerStyle">
    <div class="header-left">
      <router-link to="/city" :style="cityStyle">
        郑州
        <i class="iconfont">&#xe62d;</i>
      </router-link>
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
      }
    }
  },
  methods: {
    handleScroll() {
      let scrollY = window.scrollY
      if (window.scrollY > 90) {
        scrollY = 90
        this.headerStyle.boxShadow = '0 0.04rem 0.04rem rgba(0,0,0,.2)'
      } else {
        this.headerStyle.boxShadow = 'none'
      }
      this.headerStyle.backgroundColor = `rgba(255,255,255,${scrollY / 90})`
      let rgb = 255 - (scrollY / 1350) * 255
      let color = `rgb(${rgb},${rgb},${rgb})`
      this.searchStyle.backgroundColor = color
      this.circleStyle.borderColor = color
      rgb = 255 - (scrollY / 150) * 255
      color = `rgb(${rgb},${rgb},${rgb})`
      this.cityStyle.color = color
      this.pointStyle.backgroundColor = color
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

    .iconfont {
      position: absolute;
      margin-left: 0.12rem;
      color: #00bcd4;
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
    width: 1rem;

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
