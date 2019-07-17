<template>
  <div class="wrapper">
    <ul class="local-nav">
      <li v-for="item in localNavs" :key="item.id">
        <a href="javascript:;">
          <div></div>
          <p>{{item.name}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home-local-nav',
  data() {
    return {
      // 模拟 Ajax 数据
      localNavs: [
        {
          id: 101,
          name: '攻略·景点'
        },
        {
          id: 102,
          name: '门票·玩乐'
        },
        {
          id: 103,
          name: '美食林'
        },
        {
          id: 104,
          name: '周边游'
        },
        {
          id: 105,
          name: '一日游'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 0.44rem;

  .local-nav {
    position: absolute;
    z-index: 1000;
    top: -1.04rem;
    left: 0.24rem;
    right: 0.24rem;
    height: 1.04rem;
    padding: 0.12rem 0;
    background-color: #fff;
    border-radius: 0.16rem;
    box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.2);

    for num in 0 1 2 3 4 {
      li:nth-child({num + 1}) {
        width: 20%;
        height: 100%;
        float: left;
        box-sizing: border-box;

        a {
          font-size: 0.24rem;
          text-align: center;

          div {
            width: 0.8rem;
            height: 0.8rem;
            margin: 0 auto;
            background: url('../../../assets/images/home-fivemain-sprite2x@v7.15.png') no-repeat 0 (num * -0.8rem);
            background-size: 0.8rem auto;
          }
        }
      }
    }
  }
}
</style>
