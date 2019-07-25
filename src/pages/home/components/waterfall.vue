<template>
  <div class="waterfall"></div>
</template>

<script>
export default {
  name: 'home-waterfall',
  created() {
    // this.getData()
  },
  data() {
    return {
      queryInfo: {
        Index: 1,
        Count: 20,
        SortType: 0,
        DistrictId: 198,
        TagIds: [],
        zoneIds: [],
        CategoryId: 0,
        displayType: 0,
        lat: 0,
        lon: 0,
        showTodayUse: false,
        showCircuml: false,
        aroundDistance: 0,
        themeId: 0,
        level2ThemeId: 0,
        productType: [],
        head: {
          cid: '09031089111773688353',
          ctok: '',
          cver: '1.0',
          lang: '01',
          sid: '4590',
          syscode: '09',
          auth: null,
          extension: [{ name: 'protocal', value: 'https' }]
        },
        contentType: 'json'
      },
      sightRecreationList: [],
      imgsArr: []
    }
  },
  methods: {
    async getData() {
      const { data: result } = await this.$http.post(
        'https://m.ctrip.com/restapi/soa2/13342/json/getSightRecreationList?_fxpcqlniredt=09031089111773688353&__gw_appid=99999999&__gw_ver=1.0&__gw_from=214062&__gw_platform=H5',
        this.queryInfo
      )
      this.sightRecreationList = result.result.sightRecreationList
      this.sightRecreationList.forEach(item => {
        this.imgsArr.push({
          src: item.coverImageUrl,
          href: item.h5Url
        })
      })
      console.log(result)
      console.log(this.imgsArr)
      this.queryInfo.Index++
    }
  }
}
</script>

<style lang="stylus" scoped>
.waterfall {
  img {
    width: 100%;
  }
}
</style>
