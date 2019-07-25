<template>
  <ul class="subnav">
    <li v-for="item in subnavs" :key="item.id">
      <a href="javascript:;">
        <div class="subnav-image"></div>
        <p class="subnav-title">{{ item.title }}</p>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'home-subnav',
  props: {
    subnavs: Array
  }
}
</script>

<style lang="stylus" scoped>
.subnav {
  height: 2.2rem;
  margin: 0 0.24rem 0.24rem;

  li {
    float: left;
    width: 20%;
    height: 50%;

    .subnav-image {
      width: 0.56rem;
      height: 0.56rem;
      margin: 0.2rem auto 0.1rem;
    }

    .subnav-title {
      font-size: 0.24rem;
      text-align: center;
    }
  }

  for num in 0 1 2 3 4 5 6 7 8 9 {
    li:nth-child({num + 1}) {
      .subnav-image {
        background: url('~images/un_ico_subnav2x@v7.152.png') no-repeat 0 (num * -0.56rem);
        background-size: 0.56rem auto;
      }
    }
  }
}
</style>
