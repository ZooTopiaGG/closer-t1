<template>
    <transition name="fade" v-if="previewShow" @click="leave">
        <section class="lg-preview-wrapper"
        @click="leave"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @touchend="touchend"
        >
            <!-- <section class="lg-preview-loading" v-show="preview.loading"><section></section></section> -->
            <img
                class="lg-preview-img"
                v-if="previewList[index]"
                :src="previewList[index]"
            >
            <section class="lg-preview-title">
                {{parseInt(index) + 1}} / {{previewList.length}}
            </section>
        </section>
    </transition>
</template>

<script>
export default {
  name: "Preview",
  props: ["previewList", "previewIndex","previewShow"],
  data() {
    return {
      imglist: [],
      index: 0||this.previewIndex, // 记录当前图片index
      startX: 0, //开始触摸X的位置
      startY: 0, //开始触摸Y的位置
      moveX: 0, //滑动时x的位置
      moveY: 0, // 滑动时Yde位置
      endX: 0, //结束触摸的位置
      disX: 0, //移动距离
      disY: 0,
      slideEffect: "" //滑动时的效果,使用v-bind:style="deleteSlider"
    };
  },
  methods: {
    touchstart(ev) {
      this.disX = 0;
      this.disY = 0;
      ev = ev || event;
      this.startX = ev.touches[0].clientX;
      this.startY = ev.touches[0].clientY;
    },
    touchmove(ev) {
      ev = ev || event;
      //滑动时距离浏览器左侧的距离
      this.moveX = ev.touches[0].clientX;
      this.moveY = ev.touches[0].clientY;
      //实时的滑动的距离-起始位置=实时移动的位置
      // x轴距离
      this.disX = this.moveX - this.startX;
      // y轴距离
      this.disY = this.moveY - this.startY;
    },
    touchend() {
      // 横向偏移量 x
      let offsetX = Math.abs(this.disX),
        offsetY = Math.abs(this.disY);
      if (offsetX > offsetY) {
        // X>Y 横向切换
        if (this.disX < 0) {
          this.nextAction();
        } else if (this.disX > 0) {
          this.preAction();
        } else {
          return;
        }
      } else {
        // Y>=X 纵向滚动
      }
    },
    leave(e) {
      // 向父组件传递状态
      this.$emit("preview-show", false);
    },
    preAction() {
      if (this.index === 0) {
        return;
      }
      this.index--;
    },
    nextAction() {
      if (this.index === this.previewList.length - 1) {
        return;
      }
      this.index++;
    }
    
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.lg-preview-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 1);
  z-index: 10000;
}

.lg-preview-loading {
  position: absolute;
  width: 30px;
  height: 35px;
  top: 50%;
  left: 50%;
  margin-top: -17.5px;
  margin-left: -15px;
}

.lg-preview-loading > div {
  display: inline-block;
  height: 25px;
  width: 25px;
  background: transparent;
  border-radius: 100%;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: rotate 0.75s 0s linear infinite;
  animation: rotate 0.75s 0s linear infinite;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(0.6);
    transform: rotate(180deg) scale(0.6);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

.lg-preview-img {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.lg-preview-nav-arrow {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  background: rgba(0, 0, 0, 0);
  line-height: 40px;
  width: 20px;
  height: 20px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
}

.lg-preview-title {
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}
</style>
