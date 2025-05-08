<template>
  <div class="local-hot">
    <div v-if="!hideTitle" class="title">当地热门</div>
    <ul>
      <li v-for="item in localHot" :key="item.id">
        <a href="javascript:;">
          <img :src="item.img" />
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  localHot: { id: number; img: string; title: string }[];
  hideTitle?: boolean;
}>();
</script>

<style scoped lang="scss">
.local-hot {
  position: relative;
  top: 0;
  margin-bottom: 0.2rem;
  background-color: #fff;
  box-shadow: 0 0 0.12rem rgba(0, 0, 0, 0.1);

  .title {
    padding: 0.24rem 0.48rem;
    line-height: 0.4rem;
    font-size: 0.36rem;
  }

  > ul {
    position: relative;
    display: flex;
    justify-content: space-around;
    height: 1.2rem;
    border-bottom: 0.02rem solid #eee;
    background-color: #fff;

    > li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      text-align: center;

      img {
        width: 0.6rem;
        background-color: #fff;
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: -0.12rem;
      height: 0.12rem;
      background-color: #fff;
    }
  }
}
</style>
