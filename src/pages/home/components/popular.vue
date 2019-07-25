<template>
  <div class="popular">
    <div class="head">
      <div class="title">排行榜</div>
      <div class="more iconfont">更多&#xe62e;</div>
    </div>
    <div class="attractions">
      <img
        src="upload/2dcda4e400ace9f993835fbb.jpg_250x250_d841fd57.jpg"
        alt="景点"
      />
      <div class="list">
        <div>景点人气榜</div>
        <p>
          <span>1</span>
          龙门石窟
        </p>
        <p>
          <span>2</span>
          老君山景区
        </p>
        <p>
          <span>3</span>
          隋唐洛阳城国家遗址公园天堂名堂景区
        </p>
      </div>
      <div class="more iconfont">&#xe62e;</div>
    </div>
    <div class="hotel">
      <img
        src="upload/200u0j000000aw3xuE230_C_360_360_Q50.jpg_.webp"
        alt="酒店"
      />
      <div class="list">
        <div>酒店人气榜</div>
        <p>
          <span>1</span>
          伊川丽都国际酒店
        </p>
        <p>
          <span>2</span>
          栾川智选假日酒店
        </p>
        <p>
          <span>3</span>
          洛阳华阳广场国际大饭店
        </p>
      </div>
      <div class="more iconfont">&#xe62e;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-popular'
}
</script>

<style lang="stylus" scoped>
.popular {
  margin: 0 0.24rem 0.24rem;
  padding: 0.2rem;
  background-color: #fff;
  border-radius: 0.16rem;
  box-shadow: 0 0 0.12rem rgba(0, 0, 0, 0.1);

  .head, .attractions, .hotel {
    display: flex;
    align-items: center;

    .more {
      font-size: 0.24rem;
      color: #999;
    }
  }

  .head {
    justify-content: space-between;

    .title {
      font-size: 0.36rem;
    }
  }

  .attractions, .hotel {
    margin-top: 0.32rem;

    >img {
      width: 1.6rem;
      height: 1.6rem;
      background-color: #eee;
    }

    .list {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      flex: 1;
      height: 1.6rem;
      padding-left: 0.2rem;

      &::before {
        content: '';
        position: absolute;
        left: -0.23rem;
        top: 50%;
        transform: translateY(-50%);
        border: 0.12rem solid transparent;
        border-right-color: #fff;
      }

      >div {
        font-size: 0.32rem;
      }

      >p {
        font-size: 0.24rem;
        color: #666;

        span {
          color: #ff3838;
        }
      }

      p+p>span {
        color: #ff9f33;
      }
    }
  }
}
</style>
