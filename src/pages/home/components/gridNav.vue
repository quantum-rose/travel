<template>
  <div class="grid-nav">
    <div v-for="entry in gridNavs" :key="entry.id" :class="entry.name">
      <a v-for="item in entry.children" :key="item.id" href="javascript:;">
        <div>
          <span v-if="item.name" class="name">{{item.name}}</span>
          <span v-if="item.hot" class="hot">{{item.hot}}</span>
          <span v-if="item.tag" class="tag">{{item.tag}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-grid-nav',
  data() {
    return {
      // 模拟 Ajax 数据
      gridNavs: [
        {
          id: 11,
          name: 'grid-nav-hotel',
          children: [
            {
              id: 101,
              name: '酒店'
            },
            {
              id: 102,
              name: '民宿·客栈',
              tag: '大促'
            },
            {
              id: 103,
              name: '机票/火车票+酒店',
              hot: '方便又便宜'
            }
          ]
        },
        {
          id: 12,
          name: 'grid-nav-flight',
          children: [
            {
              id: 201,
              name: '机票'
            },
            {
              id: 202,
              name: '火车票',
              tag: '暑运'
            },
            {
              id: 203,
              name: '汽车·船票'
            },
            {
              id: 204,
              name: '打车·租车'
            }
          ]
        },
        {
          id: 13,
          name: 'grid-nav-travel',
          children: [
            {
              id: 301,
              name: '旅游',
              tag: '678月节'
            },
            {
              id: 302,
              name: '高铁游'
            },
            {
              id: 303,
              name: '邮轮游'
            },
            {
              id: 304,
              name: '定制游'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.grid-nav {
  height: 52.8vw;
  margin: 0 0.24rem;
  box-sizing: border-box;
  border-radius: 0.16rem;
  overflow: hidden;

  >div {
    height: 33.333%;
    display: flex;

    a {
      position: relative;
      display: flex;
      flex: 31;
      align-items: center;
      line-height: 100%;
      color: #fff;

      >div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .tag {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.02rem 0.24rem;
        background-color: #fff500;
        border-bottom-left-radius: 0.16rem;
        font-size: 0.24rem;
        color: #f54c45;
      }

      .hot {
        position: absolute;
        right 50%
        bottom: 50%;
        transform: translate(85%, -0.16rem);
        padding: 0.04rem 0.08rem;
        background-color: #f54c45;
        border-radius: 0.16rem;
        border-bottom-left-radius: 0;
        font-size: 0.24rem;
      }
    }

    a:nth-child(1) {
      .name {
        padding-left: 0.24rem;
      }
    }

    a+a {
      flex: 23;
      justify-content: center;
      border-left: 0.02rem solid #fff;

      >div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  div+div {
    border-top: 0.02rem solid #fff;
  }

  .grid-nav-hotel {
    background: linear-gradient(to right, #fa5956, #fb8650);

    a:nth-child(1) {
      background: url('../../../assets/images/grid-nav-items-hotel@v7.15.png') no-repeat;
    }

    a:nth-child(2) {
      background: url('../../../assets/images/grid-nav-items-minsu@v7.15.png') no-repeat;
    }

    a:nth-child(3) {
      flex: 46;
      background: linear-gradient(to right, #ffbc49, #ffd252);

      div {
        background: url('../../../assets/images/grid-nav-items-jhj@v7.15.png') no-repeat;
        background-size: 1.73rem auto;
        background-position: right bottom;

        .name {
          color: #a05416;
        }
      }
    }
  }

  .grid-nav-flight {
    background: linear-gradient(to right, #4b8fed, #53bced);

    a:nth-child(1) {
      background: url('../../../assets/images/grid-nav-items-flight@v7.15.png') no-repeat;
    }

    a:nth-child(2) {
      background: url('../../../assets/images/grid-nav-items-train.png') no-repeat;
    }
  }

  .grid-nav-travel {
    background: linear-gradient(to right, #34c2aa, #6cd557);

    a:nth-child(1) {
      background: url('../../../assets/images/grid-nav-items-travel@v7.15.png') no-repeat;
    }

    a:nth-child(2) {
      background: url('../../../assets/images/grid-nav-items-dingzhi@v7.15.png') no-repeat;
    }
  }

  .grid-nav-hotel, .grid-nav-flight, .grid-nav-travel {
    a:nth-child(1) {
      background-size: 1.46rem auto;
      background-position: right bottom;
    }

    a:nth-child(2) {
      background-size: 0.74rem auto;
      background-position: left bottom;
    }
  }
}
</style>
