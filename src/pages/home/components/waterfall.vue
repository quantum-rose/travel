<template>
  <div class="waterfall" ref="waterfall">
    <!-- 避免key值相同触发vue警告，仅开发模式 -->
    <div class="item" v-for="(item, i) in sight" :key="item.id + i">
      <img :src="item.imgUrl" @load="imageLoaded" />
      <div class="text">
        <div class="title">{{ item.name }}</div>
        <div
          class="shortFeatures clearfix"
          v-if="item.shortFeatures.length > 0"
        >
          <span v-for="feature in item.shortFeatures" :key="feature">{{
            feature
          }}</span>
        </div>
        <div class="sightCategoryInfo">{{ item.sightCategoryInfo }}</div>
        <div class="about clearfix">
          <span class="price"
            >￥<span class="num">{{ item.price }}</span
            >起</span
          >
          <span class="distanceStr">{{ item.distanceStr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-waterfall',
  props: {
    // 景点列表
    sight: Array,
    // 页码
    pagenum: Number,
    // 当前页数据条数
    pagesize: Number
  },
  updated() {
    this.waterfall = this.$refs.waterfall
    this.items = this.waterfall.children
    this.itemWidth = this.items[0].offsetWidth
  },
  data() {
    return {
      // 视口高度
      viewHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      // 瀑布流父盒子
      waterfall: null,
      // 瀑布流中的每一个元素
      items: null,
      // 瀑布流元素的宽度
      itemWidth: 0,
      // 瀑布流元素之间的间隙(px)
      gap: 10,
      // 瀑布流每一列的高度
      columns: [],
      // 加载完毕的图片数量
      loadedImagesCount: 0
    }
  },
  watch: {
    // 监听加载完毕的图片数量
    loadedImagesCount(count) {
      // 如果全部加载完毕，渲染为瀑布流
      if (count === this.sight.length) {
        this.renderWaterFall()
        this.$emit('finishPullUp')
      }
    }
  },
  methods: {
    // 图片加载完毕
    imageLoaded() {
      this.loadedImagesCount++
    },
    // 渲染瀑布流布局
    renderWaterFall() {
      // 元素之间的间隙
      let gap = this.gap
      // 遍历当前未被渲染为瀑布流的元素，起始位置和pagenum、pagesize有关
      for (
        let i = (this.pagenum - 1) * this.pagesize;
        i < this.items.length;
        i++
      ) {
        if (i < 2) {
          /* 每列第一个元素的位置 */
          // top为0
          this.items[i].style.top = 0
          // left为 (元素宽度 + 间隙) × 索引
          this.items[i].style.left = (this.itemWidth + gap) * i + 'px'
          // 保存每一列的高度 (刚好是当前元素的高度)
          this.columns.push(this.items[i].offsetHeight)
        } else {
          /* 之后所有元素的位置 */
          // 查找高度最小的列的高度及其索引
          let minHeight = this.columns[0]
          let index = 0
          for (let j = 0; j < this.columns.length; j++) {
            if (minHeight > this.columns[j]) {
              minHeight = this.columns[j]
              index = j
            }
          }
          // top为高度最小列的高度再加上间隙
          this.items[i].style.top = this.columns[index] + gap + 'px'
          // left为高度最小列的left (每一列高度的索引和第一行所有元素的索引相同)
          this.items[i].style.left = this.items[index].offsetLeft + 'px'
          // 修改最小列的高度 = 当前高度 + 当前元素高度 + 间隙
          this.columns[index] =
            this.columns[index] + this.items[i].offsetHeight + gap
          // 查找高度最大的列的高度
          let maxHeight = this.columns[0]
          for (let j = 0; j < this.columns.length; j++) {
            if (maxHeight < this.columns[j]) {
              maxHeight = this.columns[j]
            }
          }
          // 父容器的高度等于这个最高的列的高度
          this.waterfall.style.height = maxHeight + 'px'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.waterfall {
  position: relative;
  margin: 0 0.2rem;

  .item {
    position: absolute;
    width: calc(50% - 0.1rem);
    border-radius: 0.08rem;
    overflow: hidden;
    background-color: #fff;

    img {
      width: 100%;
      vertical-align: middle;
    }

    .text {
      padding: 0.16rem;
      line-height: 0.48rem;

      .title {
        line-height: 0.48rem;
        font-size: 0.32rem;
      }

      .shortFeatures {
        >span {
          float: left;
          padding: 0.05rem 0.08rem;
          margin: 0.04rem 0.08rem 0.04rem 0;
          line-height: 1;
          font-size: 0.2rem;
          color: #0086f6;
          background-color: #ebf5ff;
          border-radius: 0.04rem;
        }
      }

      .sightCategoryInfo {
        font-size: 0.22rem;
        color: #666;
      }

      .about {
        .price {
          margin-right: 0.2rem;
          font-size: 0.22rem;
          color: #f60;

          .num {
            font-size: 0.36rem;
          }
        }

        .distanceStr {
          font-size: 0.22rem;
          color: #666;
        }
      }
    }
  }
}
</style>
