<template>
  <div class="waterfall" ref="waterfall">
    <!-- 避免key值相同触发vue警告，真实生产环境应保证id唯一 -->
    <HomeWaterfallItem
      v-for="(sight, i) in sights"
      :key="`${sight.id}_${i}`"
      :sight="sight"
      @loaded="handleItemLoaded(i)"
    />
  </div>
</template>

<script setup lang="ts">
import HomeWaterfallItem from './HomeWaterfallItem.vue';

const emit = defineEmits(['rendered']);

const props = defineProps<{
  /** 景点列表 */
  sights: {
    id: number;
    imgUrl: string;
    name: string;
    shortFeatures: string[];
    sightCategoryInfo: string;
    price: number;
    distanceStr: string;
  }[];
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}>();

const waterfall = ref<HTMLDivElement>(); // 瀑布流父盒子
const gap = 10; // 瀑布流元素之间的间隙(px)
const columns: number[] = [0, 0]; // 瀑布流每一列的高度

// 渲染瀑布流布局
const renderToWaterFall = (index: number) => {
  if (!waterfall.value) {
    return;
  }

  const currentItem = waterfall.value.children[index] as HTMLElement; // 当前元素
  const itemWidth = currentItem.offsetWidth; // 元素宽度，宽度相同

  // 找到最短的列
  let minHeight = columns[0];
  let minIndex = 0;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i] < minHeight) {
      minHeight = columns[i];
      minIndex = i;
    }
  }

  // 设置当前元素的 top 和 left
  currentItem.style.top = minHeight + 'px';
  currentItem.style.left = minIndex * (itemWidth + gap) + 'px';

  // 更新当前列的高度
  columns[minIndex] += currentItem.offsetHeight + gap;

  // 找到最长的列
  let maxHeight = columns[0];
  for (let i = 0; i < columns.length; i++) {
    if (columns[i] > maxHeight) {
      maxHeight = columns[i];
    }
  }

  // 设置父容器的高度
  waterfall.value.style.height = maxHeight + 'px';
};

let loadedCount = 0; // 加载完毕的图片数量
const handleItemLoaded = (index: number) => {
  loadedCount++;

  renderToWaterFall(index);

  if (loadedCount === props.sights.length) {
    emit('rendered');
  }
};
</script>

<style scoped lang="scss">
.waterfall {
  position: relative;
  margin: 0 0.2rem;
}
</style>
