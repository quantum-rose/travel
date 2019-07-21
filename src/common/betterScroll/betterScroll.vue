<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'better-scroll',
  mounted() {
    const { $refs, $attrs, $listeners } = this
    // 创建better-scroll实例
    this.BScroll = new BScroll($refs.scroll, $attrs.options)
    // 绑定事件
    Object.keys($listeners).forEach(item =>
      this.BScroll.on(item, params => this.$emit(item, params))
    )
    // 挂载方法
    Object.keys(BScroll.prototype).forEach(item => {
      if (item[0] !== '_') {
        this[item] = function() {
          this.BScroll[item](...arguments)
        }
      }
    })
  }
}
</script>

<style lang="stylus" scoped></style>
