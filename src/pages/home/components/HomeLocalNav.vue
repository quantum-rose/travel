<template>
  <div class="local-nav-wrapper">
    <ul class="local-nav">
      <li v-for="item in localNavs" :key="item.id">
        <a href="javascript:;">
          <div></div>
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  localNavs: { id: number; title: string }[];
}>();
</script>

<style scoped lang="scss">
.local-nav-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 0.44rem;

  .local-nav {
    position: absolute;
    top: -1.04rem;
    left: 0.24rem;
    right: 0.24rem;
    display: flex;
    height: 1.04rem;
    padding: 0.12rem 0;
    background-color: #fff;
    border-radius: 0.16rem;
    box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.2);

    @for $num from 0 through 4 {
      li:nth-child(#{$num + 1}) {
        width: 20%;
        height: 100%;
        box-sizing: border-box;

        a {
          font-size: 0.24rem;
          text-align: center;

          div {
            width: 0.8rem;
            height: 0.8rem;
            margin: 0 auto;
            background: url('@/assets/images/home-fivemain-sprite2x@v7.15.png')
              no-repeat
              0
              ($num * -0.8rem);
            background-size: 0.8rem auto;
          }
        }
      }
    }
  }
}
</style>
