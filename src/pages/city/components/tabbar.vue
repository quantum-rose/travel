<template>
  <div class="tab-bar">
    <div>
      <div class="active">国内</div>
    </div>
    <div>
      <div>国际/地区</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city-tabbar'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.tab-bar {
  position: absolute;
  z-index: 1010;
  top: 0.8rem;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;

  >div {
    flex: 1;
    text-align: center;

    >div {
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
</style>
