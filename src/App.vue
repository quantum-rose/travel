<template>
  <div id="app">
    <transition :mode="mode" :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
      mode: ''
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'city' && from.name === 'home') {
        this.mode = 'in-out'
        this.transitionName = 'slide-up'
      } else if (to.name === 'home' && from.name === 'city') {
        this.mode = 'in-out'
        this.transitionName = 'slide-down'
      } else {
        this.mode = ''
        this.transitionName = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes slide {
  0% {
    top: 100%;
  }

  100% {
    top: 0;
  }
}

.slide-up-enter-active {
  animation: slide 0.45s;
}

.slide-down-leave-active {
  animation: slide 0.3s reverse;
}
</style>
