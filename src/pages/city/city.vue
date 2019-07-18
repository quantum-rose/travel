<template>
  <div class="city">
    <city-header></city-header>
    <city-list :hotCities="hotCities" :cityList="cityList"></city-list>
  </div>
</template>

<script>
import cityHeader from './components/header'
import cityList from './components/cityList'

export default {
  name: 'city',
  created() {
    this.getCityList()
  },
  data() {
    return {
      hotCities: [],
      cityList: {}
    }
  },
  methods: {
    async getCityList() {
      const { data: result } = await this.$http.get('data/city.json')
      if (!result.ret) return
      const data = result.data
      this.hotCities = data.hotCities
      this.cityList = data.cities
    }
  },
  components: {
    cityHeader,
    cityList
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
