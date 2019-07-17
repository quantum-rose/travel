<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <swiper-slide v-for="item in swiperImages" :key="item.id">
        <img class="swiper-img" :src="item.url" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'home-swiper',
  data() {
    return {
      // 轮播图配置
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        speed: 200
      },
      // 模拟 Ajax 数据
      swiperImages: [
        {
          id: 101,
          url: require('../../../assets/images/zg0516000000zifq4FC3C.jpg')
        },
        {
          id: 102,
          url: require('../../../assets/images/zg0a15000000ypf1tBC70.jpg')
        },
        {
          id: 103,
          url: require('../../../assets/images/zg0e15000000yqzweE43E.jpg')
        },
        {
          id: 104,
          url: require('../../../assets/images/zg0r16000000yrvpo1109.jpg')
        },
        {
          id: 105,
          url: require('../../../assets/images/zg0r16000000zx6hb0CB8.jpg')
        }
      ]
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
  height: 0;
  overflow: hidden;
  padding-bottom: 51.2%;

  .swiper {
    position: relative;

    .swiper-img {
      width: 100%;
      margin-top: -0.64rem;
    }

    .swiper-pagination {
      position: absolute;
      width: auto;
      right: 0.24rem;
      left: auto;
      bottom: 15vw;
    }
  }

  .swiper::before {
    content: '';
    z-index: 1000;
    position: absolute;
    top: 0;
    width: 100%;
    height: 0.88rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  .swiper::after {
    content: '';
    z-index: 1000;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    box-shadow: 0 0.6rem 0 0.6rem #fff;
    border-bottom-left-radius: 50% 0.6rem;
    border-bottom-right-radius: 50% 0.6rem;
  }
}</style>
