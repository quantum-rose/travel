// 当前选择的城市
let currentCity = {
  id: 28,
  spell: 'luoyang',
  name: '洛阳'
}
try {
  if (localStorage.currentCity) {
    currentCity = JSON.parse(localStorage.currentCity)
  }
} catch (error) {}

export default {
  currentCity
}
