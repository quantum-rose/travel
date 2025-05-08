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
        :placeholder="currentCity.name + '攻略·游记·精选酒店'"
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

<script setup lang="ts">
import { useSettingsStore } from '@/store';

const props = defineProps<{ scrollTop: number }>();

const settingsStore = useSettingsStore();
const currentCity = computed(() => {
  return settingsStore.currentCity;
});

const headerStyle = reactive({
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxShadow: 'none',
});

const cityStyle = reactive({
  color: 'rgb(255,255,255)',
});

const searchStyle = reactive({
  backgroundColor: 'rgba(255, 255, 255, 1)',
});

const circleStyle = reactive({
  borderColor: 'rgb(255,255,255)',
});

const pointStyle = reactive({
  backgroundColor: 'rgb(255,255,255)',
});

let flag = false; // 滚动高度为90时的样式是否已设置的标识

watch(
  () => props.scrollTop,
  (newVal) => {
    let scrollTop = newVal;
    if (newVal >= 90) {
      // 如果滚动高度超过90且标识变量为真，说明头部渐变已完成，直接退出
      if (flag) return;
      // 重置为90
      scrollTop = 90;
      // 为头部设置下方阴影
      headerStyle.boxShadow = '0 0.04rem 0.04rem rgba(0,0,0,.1)';
    } else {
      // 滚动高度不足90，恢复标识变量、取消头部阴影
      flag = false;
      headerStyle.boxShadow = 'none';
    }
    // 根据滚动高度的值，实时设置头部样式，实现渐变效果
    headerStyle.backgroundColor = `rgba(255,255,255,${scrollTop / 90})`;
    let rgb = 255 - (scrollTop / 1350) * 255;
    let color = `rgb(${rgb},${rgb},${rgb})`;
    searchStyle.backgroundColor = color;
    circleStyle.borderColor = color;
    rgb = 255 - (scrollTop / 150) * 255;
    color = `rgb(${rgb},${rgb},${rgb})`;
    cityStyle.color = color;
    pointStyle.backgroundColor = color;
    // 本次样式设置完毕后，如果滚动高度为90，改变标识变量
    if (scrollTop === 90) flag = true;
  }
);
</script>

<style scoped lang="scss">
@use '@/assets/styles/varibles' as *;
@use '@/assets/styles/mixins' as *;

.header {
  display: flex;
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
        @include ellipsis;
      }

      .iconfont {
        font-size: 0.24rem;
      }
    }
  }

  .search {
    position: relative;
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
