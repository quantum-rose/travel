<template>
  <div class="wrapper">
    <div class="header">
      <div class="close">
        <router-link to="/">
          <i class="iconfont">&#xe624;</i>
        </router-link>
      </div>
      <div class="search">
        <i class="iconfont">&#xe632;</i>
        <input type="text" placeholder="搜索全球城市" />
      </div>
    </div>
    <div class="tab-bar">
      <div>
        <a href="javascript:;" class="active">国内</a>
      </div>
      <div>
        <a href="javascript:;">国际/地区</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city-header'
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/varibles.styl';

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1010;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.8rem;

    .close {
      text-align: center;

      .iconfont {
        padding: 0 0.38rem;
        line-height: 0.56rem;
        font-size: 12px;
        font-weight: 700;
      }
    }

    .search {
      display: flex;
      align-items: center;
      flex: 1;

      .iconfont {
        position: absolute;
        margin-left: 0.12rem;
      }

      input {
        flex: 1;
        margin-right: 0.24rem;
        padding: 0 0.24rem 0 0.56rem;
        line-height: 0.56rem;
        border-radius: 0.08rem;
        background-color: #eee;
      }
    }
  }

  .tab-bar {
    display: flex;

    >div {
      flex: 1;
      text-align: center;

      a {
        display: inline-block;
        color: #999;
        font-size: 0.32rem;
        height: 0.88rem;
        line-height: 0.88rem;
      }

      .active {
        color: #222;

        &::after {
          content: '';
          display: block;
          width: 0.6rem;
          height: 0.06rem;
          margin: -0.06rem auto 0;
          border-radius: 0.03rem;
          background-color: $themeColor;
        }
      }
    }
  }
}
</style>
