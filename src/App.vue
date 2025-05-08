<template>
  <router-view v-slot="{ Component }">
    <transition :mode="transitionMode" :name="transitionName">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
const transitionMode = ref<'out-in' | 'default' | 'in-out'>();
const transitionName = ref('fade');

const route = useRoute();
watch(
  () => route,
  (to, from) => {
    if (to.name === 'city' && from.name === 'home') {
      transitionMode.value = 'in-out';
      transitionName.value = 'slide-up';
    } else if (to.name === 'home' && from.name === 'city') {
      transitionMode.value = 'in-out';
      transitionName.value = 'slide-down';
    } else {
      transitionMode.value = undefined;
      transitionName.value = '';
    }
  }
);
</script>

<style scoped lang="scss">
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
