<template>
  <transition 
    @before-enter="beforeEnter"
    @enter="enter" 
    @leave="leave" 
    :class="false"
    >
  <section v-if="display" class="preview" @click="handleClick">
    <div v-if="showCount" class="count">{{currentIndex+1}}/{{list.length}}</div>
    <div class="name"></div>
    <div class="container" ref="con" :style="aniStyle">
      <mt-swipe :auto="0" :show-indicators="false" :speed=100 :defaultIndex="currentIndex" @change="handleChange">
        <mt-swipe-item v-for="(item, index) in list" :key="index">
          <div class="item">
            <img v-if="imgUrls[index]" class="img" :src="imgUrls[index]">
            <img v-else-if="imgError[index]" class="error" :src="imgError[index]">
            <div v-else class="loading-box">
              <svg class="loading"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
                <circle cx="50" cy="50" fill="none" stroke="#fbd60a" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(244.435 50 50)">
                  <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                </circle>
              </svg>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </section>
  </transition>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
import loadingImg from "../../assets/images/loading.gif";
import errorImg from "../../assets/images/error.png";
export default {
  name: "preview",
  components: {
    Swipe,
    SwipeItem
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    current: Object,
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      img: null,
      currentIndex: 0,
      showCount: false,
      imgUrls: [],
      imgError: [],
      ww: window.innerWidth,
      wh: window.innerHeight,
      aniStyle: {},
      loadingImg: loadingImg
    };
  },
  watch: {
    display: function(newVal) {
      if (newVal) {
        let i = this.findIndex(this.current, this.list);
        this.showCurrentImg(i);
        this.showCount = this.list.length > 1;
      }
    }
  },
  methods: {
    beforeEnter(el) {
      let trans = this.getTranslate();
      el.style.opacity = 0;
      this.$refs.con.style.transform = `translate(${trans.dx}px, ${
        trans.dy
      }px) scale(${trans.rate})`;
    },
    enter(el) {
      setTimeout(() => {
        el.style.opacity = 1;
        this.$refs.con.style.transform = `translate(0, 0) scale(1)`;
      }, 0);
    },
    leave(el) {
      let trans = this.getTranslate();
      el.style.opacity = 0;
      this.$refs.con.style.transform = `translate(${trans.dx}px, ${
        trans.dy
      }px) scale(${trans.rate})`;
    },
    getSrc(img) {
      return img.dataset["src"] || img.src;
    },
    getTranslate() {
      let img = this.list[this.currentIndex],
        rect = img.getBoundingClientRect();
      return {
        rate: rect.width / this.ww,
        dx: rect.left + (rect.width - this.ww) / 2,
        dy: rect.top + (rect.height - this.wh) / 2
      };
    },
    findIndex(item, list) {
      return list.indexOf(item);
    },
    handleClick() {
      this.display = false;
    },
    handleChange(index) {
      this.showCurrentImg(index);
    },
    showCurrentImg(i) {
      this.currentIndex = i;
      this.img.dataset["i"] = i;
      this.img.src = this.getSrc(this.list[i]);
    },
    loadImg(flag) {
      let i = this.img.dataset["i"],
        src = this.img.src;
      i &&
        (flag
          ? this.$set(this.imgUrls, i, src)
          : this.$set(this.imgError, i, errorImg));
    }
  },
  mounted() {
    this.img = new Image();
    this.img.onload = this.loadImg.bind(this, true);
    this.img.onerror = this.loadImg.bind(this, false);
  }
};
</script>
<style lang="less" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: #000;
  transition: all 0.2s ease;
  .container {
    height: 100%;
    transition: all 0.2s ease;
  }
  .count {
    position: absolute;
    left: 50pr;
    bottom: 40pr;
    padding: 5pr 20pr;
    border: 1px solid #fff;
    border-radius: 50pr;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    z-index: 9;
  }
  .item {
    position: relative;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    max-height: 100%;
    overflow: auto;
  }
  .img {
    width: 100%;
  }
  .loading-box, .error {
    position: relative;
    left: 50%;
  }
  .loading-box {
    width: 128pr;
    height: 128pr;
    margin-left: -64pr;
  }
  .error {
    width: 200pr;
    margin-left: -100pr;
  }
  .loading {
    display: block;
    width: 100%;
    height: 100%;
  }
}
@keyframes loadingAni {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>