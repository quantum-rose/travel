<template>
  <ul class="subnav">
    <li v-for="item in subnavs" :key="item.id">
      <a href="javascript:;">
        <div></div>
        <p>{{item.title}}</p>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'home-subnav',
  data() {
    return {
      // 模拟 Ajax 数据
      subnavs: [
        {
          id: 101,
          title: '自由行'
        },
        {
          id: 102,
          title: 'WiFi电话卡'
        },
        {
          id: 103,
          title: '保险·签证'
        },
        {
          id: 104,
          title: '换钞·购物'
        },
        {
          id: 105,
          title: '当地向导'
        },
        {
          id: 106,
          title: '特价机票'
        },
        {
          id: 107,
          title: '礼品卡'
        },
        {
          id: 108,
          title: '申卡·借钱'
        },
        {
          id: 109,
          title: '旅拍'
        },
        {
          id: 110,
          title: '更多'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.subnav {
  height: 110px;
  margin: 0 12px 12px;

  li {
    float: left;
    width: 20%;
    height: 50%;

    div {
      width: 28px;
      height: 28px;
      margin: 10px auto 5px;
    }

    p {
      font-size: 0.24rem;
      text-align: center;
      color: #222;
    }
  }

  for num in 0 1 2 3 4 5 6 7 8 9 {
    li:nth-child({num + 1}) {
      >a>div {
        background: url('../../../assets/images/un_ico_subnav2x@v7.152.png') no-repeat 0 (num * -28px);
        background-size: 28px auto;
      }
    }
  }
}
</style>
