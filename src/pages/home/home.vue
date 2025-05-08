<template>
  <div class="home">
    <div class="top-view">
      <HomeHeader :scroll-top="scrollTop" />
      <HomeLocalHot v-show="topLocalHotVisible" :local-hot="homeData.localHot" hide-title />
    </div>

    <div class="scroll-container" @scroll="onScroll">
      <VanList class="list" :loading="loading" @load="onLoad">
        <HomeSwiper :swipe-images="homeData.swipeImages" />
        <HomeLocalNav :local-navs="homeData.localNavs" />
        <HomeGridNav :grid-navs="homeData.gridNavs" />
        <HomeSubnav :subnavs="homeData.subnavs" />
        <div class="welcome">
          <div class="weather">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconduoyun" />
            </svg>
            <span class="temperature">35℃</span>
          </div>
          您好,欢迎来到{{ currentCity.name }}
        </div>
        <HomePopular :popular-list="homeData.popularList" />
        <HomeRecommend :recommend="homeData.recommend" />
        <HomeLocalHot ref="localHot" :local-hot="homeData.localHot" />
        <HomeWaterfall
          :sights="sights"
          :page-num="pageNum"
          :page-size="pageSize"
          @rendered="onRendered"
        />
      </VanList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store';
import HomeGridNav from './components/HomeGridNav.vue';
import HomeHeader from './components/HomeHeader.vue';
import HomeLocalHot from './components/HomeLocalHot.vue';
import HomeLocalNav from './components/HomeLocalNav.vue';
import HomePopular from './components/HomePopular.vue';
import HomeRecommend from './components/HomeRecommend.vue';
import HomeSubnav from './components/HomeSubnav.vue';
import HomeSwiper from './components/HomeSwiper.vue';
import HomeWaterfall from './components/HomeWaterfall.vue';

const settingsStore = useSettingsStore();
const currentCity = computed(() => {
  return settingsStore.currentCity;
});

const localHot = ref<InstanceType<typeof HomeLocalHot>>();

const loading = ref(false);
const scrollTop = ref(0);
const localHotOffsetTop = ref(Infinity);
const topLocalHotVisible = computed(() => {
  return scrollTop.value > localHotOffsetTop.value;
});

const homeData = ref<any>({
  swipeImages: [],
  localNavs: [],
  gridNavs: [],
  subnavs: [],
  popularList: [],
  recommend: [],
  localHot: [],
});

const getHomeData = async () => {
  const res = await fetch('data/home.json?cityid=' + currentCity.value.id);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await res.json();
  if (json.code !== 0) {
    throw new Error('Data fetch error');
  }
  homeData.value = json.data;
};

watch(
  currentCity,
  () => {
    getHomeData();
  },
  { immediate: true }
);

const pageNum = ref(1);
const pageSize = ref(10);
const sights = ref<any[]>([]);

const getSights = async () => {
  const params = {
    cityId: currentCity.value.id.toString(),
    pageNum: pageNum.value.toString(),
    pageSize: pageSize.value.toString(),
  };
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`data/sight${(pageNum.value - 1) % 2}.json?${queryString}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await res.json();
  if (json.code !== 0) {
    throw new Error('Data fetch error');
  }
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  sights.value.push(...json.data);
  pageNum.value++;
};

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
};

const onLoad = () => {
  loading.value = true;

  getSights();
};

const onRendered = () => {
  loading.value = false;
};

onUpdated(() => {
  localHotOffsetTop.value = localHot.value?.$el.offsetTop ?? Infinity;
});
</script>

<style scoped lang="scss">
.home {
  position: relative;
  width: 100%;
  height: 100%;

  .top-view {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .scroll-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .list {
    width: 100%;
    background-color: #f8f8f8;
    overflow: hidden;

    .welcome {
      position: relative;
      margin-bottom: 0.2rem;
      font-size: 0.32rem;
      text-align: center;
      line-height: 0.64rem;

      .weather {
        position: absolute;
        left: 0.24rem;

        .icon {
          font-size: 0.5rem;
        }

        .temperature {
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
