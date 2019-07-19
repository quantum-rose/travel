<template>
  <ul class="alphabet">
    <li
      v-for="item in letterArr"
      :key="item"
      :ref="item"
      @click="handleClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'city-alphabet',
  props: {
    cityList: Object
  },
  updated() {
    // 组件更新后，计算#的offsetTop
    this.startY = this.$refs['#'][0].offsetTop
    // 计算每一个字母的高度
    this.letterHeight = this.$refs['#'][0].offsetHeight
  },
  data() {
    return {
      // 触摸开始的标识
      isTouched: false,
      // #的offsetTop
      startY: 0,
      // 字母的高度
      letterHeight: 0,
      // 触摸的字母索引
      touchIndex: 0
    }
  },
  computed: {
    // 提取字母列表，且第一个元素为#
    letterArr() {
      const arr = ['#']
      for (let key in this.cityList) {
        arr.push(key)
      }
      return arr
    }
  },
  watch: {
    // 索引变化后，向外触发事件，传递触摸的字母
    touchIndex(i) {
      // 索引值最小为0，最大为数组长度-1
      if (i >= 0 && i < this.letterArr.length) {
        this.$emit('change', this.letterArr[i])
      }
    }
  },
  methods: {
    // 点击字母列表后，向外触发事件，传递点击的字母
    handleClick(e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart() {
      this.isTouched = true
    },
    handleTouchMove(e) {
      e.preventDefault()
      if (this.isTouched) {
        this.touchIndex = Math.floor(
          (e.touches[0].clientY - this.startY) / this.letterHeight
        )
      }
    },
    handleTouchEnd() {
      this.isTouched = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.alphabet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  width: 0.4rem;
  padding: 35% 0 20%;

  li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
  }
}
</style>
