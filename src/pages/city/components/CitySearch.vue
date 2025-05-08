<template>
  <div class="search" :style="style">
    <div class="header">
      <div class="close" v-show="!isFocus">
        <router-link to="/">
          <i class="iconfont">&#xe624;</i>
        </router-link>
      </div>
      <div class="input">
        <i class="iconfont">&#xe632;</i>
        <input
          v-model.trim="keyword"
          type="search"
          placeholder="搜索全球城市"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="cancel" v-show="isFocus" @click="cancelSearch">取消</div>
    </div>
    <!-- 结果显示条件：输入框中有非空值 -->
    <div v-show="keyword" class="result-scroll" ref="resultScroll">
      <ul class="result">
        <div class="no-result" v-if="noResult"></div>
        <li v-for="item in searchResult" :key="item.id" @click="chooseCity(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ICity {
  id: number;
  name: string;
  spell: string;
}

const emit = defineEmits<{
  (e: 'choose', city: ICity): void;
}>();

const props = defineProps<{
  cityList: {
    [key: string]: ICity[];
  };
}>();

const keyword = ref('');
const isFocus = ref(false);
const searchResult = ref<ICity[]>([]);
const style = ref('');

const noResult = computed(() => {
  return keyword.value !== '' && searchResult.value.length === 0;
});

watch(
  () => keyword.value,
  (newVal) => {
    // 如果为空，清空搜索结果并直接退出
    if (!newVal) {
      searchResult.value = [];
      return;
    }
    const tempArr: ICity[] = [];

    // 遍历每一个城市
    for (let key in props.cityList) {
      props.cityList[key].forEach((item) => {
        // 如果城市的拼音或名称包含关键词，push进临时数组
        if (item.name.indexOf(newVal) !== -1 || item.spell.indexOf(newVal) !== -1) {
          tempArr.push(item);
        }
      });
    }
    searchResult.value = tempArr;
  }
);

const handleFocus = () => {
  // 使最外层元素扩大至全屏，成为半透明的遮罩层，滚动区域也会随父元素扩大
  style.value = 'bottom:0;';
  isFocus.value = true;
};

const handleBlur = () => {
  // 如果关键词为空重置之前的改变
  if (!keyword.value) {
    style.value = '';
    isFocus.value = false;
  }
};

const cancelSearch = () => {
  keyword.value = '';
  handleBlur();
};

const chooseCity = (city: ICity) => {
  emit('choose', city);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/varibles' as *;

.search {
  position: absolute;
  z-index: 1020;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .header {
    position: relative;
    z-index: 1040;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.8rem;
    background-color: #fff;

    .close {
      text-align: center;

      .iconfont {
        padding: 0 0.14rem 0 0.38rem;
        line-height: 0.56rem;
        font-size: 12px;
        font-weight: 700;
      }
    }

    .input {
      display: flex;
      align-items: center;
      flex: 1;

      .iconfont {
        position: absolute;
        margin-left: 0.36rem;
      }

      input {
        flex: 1;
        margin: 0 0.24rem;
        padding: 0 0.24rem 0 0.56rem;
        line-height: 0.56rem;
        border-radius: 0.08rem;
        background-color: #eee;
      }
    }

    .cancel {
      line-height: 0.56rem;
      padding-right: 0.24rem;
    }
  }

  .result-scroll {
    position: absolute;
    z-index: 1030;
    top: 0.8rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    &::before {
      content: '';
      position: absolute;
      z-index: 1040;
      left: 0;
      right: 0;
      height: 0.02rem;
      background-color: #eee;
    }

    > ul {
      background-color: #fff;

      > li {
        padding: 0 0.4rem;
        line-height: 0.84rem;

        &:active {
          background-color: #f8f8f8;
        }

        &::after {
          content: '';
          display: block;
          height: 0.01rem;
          margin-bottom: -0.01rem;
          background-color: #eee;
        }
      }

      .no-result {
        width: 4rem;
        height: 4rem;
        margin: 0 auto;
        background: url('~images/no-result.png') no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
