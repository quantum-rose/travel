<template>
  <div class="sight" :style="style">
    <img :src="sight.imgUrl" @load="onload" />
    <div class="text">
      <div class="title">{{ sight.name }}</div>
      <div class="shortFeatures" v-if="sight.shortFeatures.length > 0">
        <span v-for="feature in sight.shortFeatures" :key="feature">{{ feature }}</span>
      </div>
      <div class="sightCategoryInfo">{{ sight.sightCategoryInfo }}</div>
      <div class="about">
        <span class="price"
          >￥<span class="num">{{ sight.price }}</span
          >起</span
        >
        <span class="distanceStr">{{ sight.distanceStr }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';

const emit = defineEmits(['loaded']);

defineProps<{
  sight: {
    id: number;
    imgUrl: string;
    name: string;
    shortFeatures: string[];
    sightCategoryInfo: string;
    price: number;
    distanceStr: string;
  };
}>();

const loading = ref(true);

const style = computed<StyleValue>(() => {
  return {
    visibility: loading.value ? 'hidden' : 'visible',
  };
});

const onload = () => {
  loading.value = false;

  emit('loaded');
};
</script>

<style scoped lang="scss">
.sight {
  position: absolute;
  width: calc(50% - 0.1rem);
  border-radius: 0.08rem;
  overflow: hidden;
  background-color: #fff;

  img {
    width: 100%;
    vertical-align: middle;
  }

  .text {
    padding: 0.16rem;
    line-height: 0.48rem;

    .title {
      line-height: 0.48rem;
      font-size: 0.32rem;
    }

    .shortFeatures {
      display: flex;
      flex-wrap: wrap;

      > span {
        padding: 0.05rem 0.08rem;
        margin: 0.04rem 0.08rem 0.04rem 0;
        line-height: 1;
        font-size: 0.2rem;
        color: #0086f6;
        background-color: #ebf5ff;
        border-radius: 0.04rem;
      }
    }

    .sightCategoryInfo {
      font-size: 0.22rem;
      color: #666;
    }

    .about {
      .price {
        margin-right: 0.2rem;
        font-size: 0.22rem;
        color: #f60;

        .num {
          font-size: 0.36rem;
        }
      }

      .distanceStr {
        font-size: 0.22rem;
        color: #666;
      }
    }
  }
}
</style>
