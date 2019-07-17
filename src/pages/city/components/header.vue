<template>
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
</template>

<script>
export default {
  name: 'city-header'
}
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0.8rem;

  .close {
    width: 1rem;
    text-align: center;

    .iconfont {
      font-size: 12px;
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
</style>
