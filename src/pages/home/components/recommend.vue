<template>
  <div class="recommend">
    <div class="head">
      <div class="title">玩法研究院</div>
      <div class="more iconfont">更多&#xe62e;</div>
    </div>
    <div class="body">
      <div class="row">
        <div class="column">
          <div class="tag iconfont">旅行视频&#xe617;</div>
          <img src="upload/CggYHlXWwYCAWSf4AD7T3hxEde0314_D_500_250.jpg" />
          <div class="title">一分钟教你玩古都洛阳</div>
        </div>
        <div class="column">
          <img
            src="upload/d846f0a902264018b0bbf57410e6127a_D_250_250_Q90.jpg"
          />
          <div class="title">当地特色菜</div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img src="upload/100t10000000paws4EC47_C_250_250.jpg" />
          <p>龙门石窟</p>
          <p>当地必打卡</p>
        </div>
        <div class="column">
          <img src="upload/10020f0000007exdc99FE_C_250_250.jpg" />
          <p>名胜古迹</p>
          <p>当地必打卡</p>
        </div>
        <div class="column">
          <img src="upload/10040m000000dxiffB127_C_250_250.jpg" />
          <p>奇妙博物馆</p>
          <p>大家都爱去</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-recommend'
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
