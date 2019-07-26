<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <swiper-slide v-for="item in swiperImages" :key="item.id">
        <img class="swiper-img" :src="item.url" />
      </swiper-slide>
      <template #pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'home-swiper',
  props: {
    swiperImages: Array
  },
  data() {
    return {
      // 轮播图配置
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        speed: 200
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background-color: #fff;
  width: 0.32rem;
  border-radius: 0.16rem;
}

.wrapper >>> .swiper-pagination-bullet {
  margin: 0 0.06rem !important;
}

.wrapper {
  width: 100%;
  height: 51.2vw;
  overflow: hidden;
  background-color: #eee;

  .swiper {
    position: relative;

    .swiper-img {
      width: 100%;
      height: 59.765625vw;
      margin-top: -0.64rem;
    }

    .swiper-pagination {
      position: absolute;
      width: auto;
      right: 0.24rem;
      left: auto;
      bottom: 15vw;
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 1000;
      top: 0;
      width: 100%;
      height: 0.88rem;
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
    }

    &::after {
      content: '';
      position: absolute;
      z-index: 1000;
      bottom: 0;
      width: 100%;
      height: 0.88rem;
      box-shadow: 0 0.6rem 0 0.6rem #f8f8f8;
      border-bottom-left-radius: 50% 0.6rem;
      border-bottom-right-radius: 50% 0.6rem;
    }
  }
}
</style>
