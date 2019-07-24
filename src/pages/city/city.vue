<template>
  <div class="city">
    <city-search :cityList="cityList" @choose="chooseCity"></city-search>
    <city-tabbar></city-tabbar>
    <city-list
      :historyCity="historyCity"
      :hotCities="hotCities"
      :cityList="cityList"
      :letter="letter"
      @choose="chooseCity"
    ></city-list>
    <city-alphabet :cityList="cityList" @change="changeLetter"></city-alphabet>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import citySearch from './components/search'
import cityTabbar from './components/tabbar'
import cityList from './components/cityList'
import cityAlphabet from './components/alphabet'

export default {
  name: 'city',
  created() {
    this.getCityList()
  },
  activated() {
    // 从本地获得历史记录
    try {
      this.historyCity = JSON.parse(localStorage.historyCity)
    } catch (error) {}
  },
  data() {
    return {
      // 历史访问城市
      historyCity: [],
      // 热门城市列表
      hotCities: [],
      // 所有城市列表
      cityList: {},
      // 城市拼音首字母，用于快速定位
      letter: ''
    }
  },
  methods: {
    // 获取首页数据
    async getCityList() {
      const { data: result } = await this.$http.get('data/city.json')
      if (!result.ret) return
      const data = result.data
      this.hotCities = data.hotCities
      this.cityList = data.cities
    },
    // 保存当前选择的城市拼音首字母
    changeLetter(letter) {
      this.letter = letter
    },
    chooseCity(city) {
      // 更改当前城市
      this.changeCurrentCity(city)
      // 历史记录中是否已存在此城市
      let index = this.historyCity.findIndex(item => item.id === city.id)
      // 如果已存在，删除
      if (index !== -1) this.historyCity.splice(index, 1)
      // 在数组头部添加新的历史记录
      this.historyCity.unshift(city)
      // 如果历史记录多于3条，删除旧的记录
      if (this.historyCity.length > 3) this.historyCity.splice(3)
      // 将历史记录保存到本地
      try {
        localStorage.historyCity = JSON.stringify(this.historyCity)
      } catch (error) {}
      // 回到首页
      this.$router.push('/')
    },
    ...mapMutations(['changeCurrentCity'])
  },
  components: {
    citySearch,
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
