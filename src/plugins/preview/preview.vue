<template>
  <section v-if="display" class="preview" @click="handleClick">
    <div v-if="showCount" class="count">{{currentIndex+1}}/{{list.length}}</div>
    <div class="name"></div>
    <div class="container" :style="aniStyle">
      <mt-swipe :auto="0" :show-indicators="false" :defaultIndex="currentIndex" @change="handleChange">
        <mt-swipe-item v-for="(item, index) in list" :key="index">
          <div class="item">
            <img v-if="imgUrls[index]" class="img" :src="imgUrls[index]">
            <img v-else class="loading" :src="imgError[index] || loadingImg">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </section>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import loadingImg from '../../assets/images/loading.gif'
  import errorImg from '../../assets/images/error.png'
  export default {
    name: 'preview',
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
        imgUrls: [],
        imgError: [],
        ww: window.innerWidth,
        wh: window.innerHeight,
        aniStyle: {},
        loadingImg: loadingImg
      }
    },
    computed: {
      showCount() {
        return this.list.length > 1
      },
      currentStyle() {
        if (this.current) {
          let rect = this.current.getBoundingClientRect();
          let rate = rect.width / this.ww;
          let dx = rect.x + (rect.width - this.ww) / 2;
          let dy = rect.y + (rect.height - this.wh) / 2;
          this.aniStyle = {
            opacity: 0,
            transform: `translate(${dx}px, ${dy}px) scale(${rate})`
          }
          this.$nextTick(function() {
            this.aniStyle = {}
          })
        }
      }
    },
    watch: {
      display: function(newVal) {
        if (newVal) {
          let i = this.findIndex(this.current, this.list)
          console.log(i,newVal, this.list)
          this.showCurrentImg(i);
        }
      }
    },
    methods: {
      getSrc(img) {
        return img.dataset['src'] || img.src
      },
      findIndex(item, list) {
        return list.indexOf(item)
      },
      handleClick() {
        this.display = false;
      },
      handleChange(index) {
        this.showCurrentImg(index);
      },
      showCurrentImg(i) {
        this.currentIndex = i;
        this.img.dataset['i'] = i;
        this.img.src = this.getSrc(this.list[i]);
      },
      show() {
        let rect = this.current.getBoundingClientRect();
        let rate = rect.width / this.ww;
        let dx = rect.x + (rect.width - this.ww) / 2;
        let dy = rect.y + (rect.height - this.wh) / 2;
        this.aniStyle = {
          opacity: 0.5,
          transform: `translate(${dx}px, ${dy}px) scale(${rate})`
        }
        setTimeout(() => {
          this.aniStyle = {
            opacity: 1,
            transform: `translate(0, 0) scale(1)`
          }
        }, 50) 
        this.display = true;
      },
      hide() {
        this.display = false;
      },
      loadImg(flag) {
        let i = this.img.dataset['i'],
          src = this.img.src;
        i && (flag ? this.$set(this.imgUrls, i, src) : this.$set(this.imgError, i, errorImg))

      }
    },
    mounted() {
      this.img = new Image();
      this.img.onload = this.loadImg.bind(this, true)
      this.img.onerror = this.loadImg.bind(this, false)
    }
  }
</script>
<style lang="less" scoped>
  .preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    animation: fadeIn .1s linear .1s 1 forwards;
    .container {
      height: 100%;
      transition: all .2s ease-out;
    }
    .count {
      position: absolute;
      left: 50pr;
      bottom: 40pr;
      padding: 5pr 20pr;
      border: 1px solid #fff;
      border-radius: 50pr;
      background: rgba(0,0,0,.5);
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
    .loading {
      position: relative;
      left: 50%;
      width: 200pr;
      // height: 200pr;
      margin-left: -100pr;
    }
    @keyframes fadeIn {
      to {
        background: rgba(0,0,0,.8);
      }
    }
  }
</style>