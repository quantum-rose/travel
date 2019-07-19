<template>
  <div class="city">
    <city-header :cityList="cityList"></city-header>
    <city-tabbar></city-tabbar>
    <city-list :hotCities="hotCities" :cityList="cityList" :letter="letter"></city-list>
    <city-alphabet :cityList="cityList" @change="changeLetter"></city-alphabet>
  </div>
</template>

<script>
import cityHeader from './components/header'
import cityTabbar from './components/tabbar'
import cityList from './components/cityList'
import cityAlphabet from './components/alphabet'

export default {
  name: 'city',
  created() {
    this.getCityList()
  },
  data() {
    return {
      hotCities: [],
      cityList: {},
      letter: ''
    }
  },
  methods: {
    async getCityList() {
      const { data: result } = await this.$http.get('data/city.json')
      if (!result.ret) return
      const data = result.data
      this.hotCities = data.hotCities
      this.cityList = data.cities
    },
    changeLetter(val) {
      this.letter = val
    }
  },
  components: {
    cityHeader,
    cityTabbar,
    cityList,
    cityAlphabet
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
  overflow: hidden;
}
</style>
