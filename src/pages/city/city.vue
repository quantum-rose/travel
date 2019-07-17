<template>
  <div class="city">
    <city-header></city-header>
    <div>lalalalala</div>
  </div>
</template>

<script>
import cityHeader from './components/header'

export default {
  name: 'city',
  components: {
    cityHeader
  }
}
</script>

<style lang="stylus" scoped>
.city {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #fff;
}
</style>
