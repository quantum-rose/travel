<template>
  <div class="home-swiper">
    <VanSwipe v-if="swipeImages.length" :autoplay="3000">
      <VanSwipeItem v-for="item in swipeImages" :key="item.id">
        <img class="swiper-img" :src="item.url" />
      </VanSwipeItem>
    </VanSwipe>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  swipeImages: { id: number; url: string }[];
}>();
</script>

<style scoped lang="scss">
.home-swiper {
  width: 100%;
  height: 51.2vw;
  overflow: hidden;
  background-color: #eee;

  .swiper-img {
    width: 100%;
    height: 59.765625vw;
    margin-top: -0.64rem;
  }
}

.home-swiper:deep(.van-swipe__indicators) {
  position: absolute;
  width: auto;
  right: 0.24rem;
  left: auto;
  bottom: 16vw;
  transform: none;
}

.home-swiper:deep(.van-swipe__indicator) {
  width: 0.16rem;
  height: 0.16rem;
  margin: 0 0.06rem;
  border-radius: 0.08rem;
  transition: all 0.3s;
}

.home-swiper:deep(.van-swipe__indicator.van-swipe__indicator--active) {
  background-color: #fff;
  width: 0.32rem;
}

.home-swiper:deep(.van-swipe) {
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 0.88rem;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    box-shadow: 0 0.6rem 0 0.6rem #f8f8f8;
    border-bottom-left-radius: 50% 0.6rem;
    border-bottom-right-radius: 50% 0.6rem;
  }
}
</style>
