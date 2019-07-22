export default {
  // 更改当前城市
  changeCurrentCity(state, city) {
    state.currentCity = city
    try {
      localStorage.currentCity = JSON.stringify(city)
    } catch (error) {}
  }
}
