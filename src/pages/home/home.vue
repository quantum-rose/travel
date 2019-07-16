<template>
  <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-local-nav></home-local-nav>
    <home-grid-nav></home-grid-nav>
    <home-subnav></home-subnav>
    <div>fsdfas</div>
  </div>
</template>

<script>
import homeHeader from './components/header'
import homeSwiper from './components/swiper'
import homeLocalNav from './components/localNav'
import homeGridNav from './components/gridNav'
import homeSubnav from './components/subnav'

export default {
  name: 'home',
  components: {
    homeHeader,
    homeSwiper,
    homeLocalNav,
    homeGridNav,
    homeSubnav
  }
}
</script>

<style lang="stylus" scoped></style>
