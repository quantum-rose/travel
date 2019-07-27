<template>
  <div class="recommend">
    <div class="head">
      <div class="title">玩法研究院</div>
      <div class="more iconfont">更多&#xe62e;</div>
    </div>
    <div class="body">
      <div class="row" v-for="(row, i) in recommend" :key="i">
        <div class="column" v-for="(column, i) in row" :key="i">
          <div class="tag iconfont" v-if="column.tag">
            {{ column.tag }}&#xe617;
          </div>
          <img :src="column.img" />
          <div class="title" v-if="column.title">{{ column.title }}</div>
          <p v-if="column.sight">{{ column.sight }}</p>
          <p v-if="column.about">{{ column.about }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-recommend',
  props: {
    recommend: Array
  }
}
</script>

<style lang="stylus" scoped>
.recommend {
  margin: 0 0.24rem 0.24rem;
  padding-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 0.16rem;
  box-shadow: 0 0 0.12rem rgba(0, 0, 0, 0.1);

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.24rem;

    .title {
      font-size: 0.36rem;
    }

    .more {
      font-size: 0.24rem;
      color: #999;
    }
  }

  .body {
    overflow: hidden;

    .row {
      display: flex;

      .column {
        position: relative;

        .tag {
          position: absolute;
          top: 0;
          left: 0;
          padding: 0.08rem 0.1rem;
          background-color: #ff7700;
          font-size: 0.22rem;
          color: #fff;
          border-bottom-right-radius: 0.04rem;
        }

        img {
          display: block;
          width: 100%;
          height: calc(((100vw - 0.48rem) / 3));
        }

        .title {
          position: absolute;
          display: flex;
          flex-direction: column-reverse;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          padding: 0 0.24rem 0.24rem;
          color: #fff;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
        }

        p {
          text-align: center;
          line-height: 0.4rem;
        }

        p+p {
          font-size: 0.24rem;
          color: #666;
        }
      }

      .column+.column {
        border-left: 0.02rem solid #fff;
      }
    }

    .row:nth-child(1) {
      .column {
        margin-right: -0.02rem;
        flex: 2;
      }

      .column+.column {
        flex: 1;
      }
    }

    .row:nth-child(2) {
      border-top: 0.02rem solid #fff;

      .column {
        margin: 0;
        flex: 1;

        img {
          margin-bottom: 0.12rem;
        }
      }
    }
  }
}
</style>
