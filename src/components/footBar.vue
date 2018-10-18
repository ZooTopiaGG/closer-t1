<template>
  <section class="footer" v-if="!ENV.app">
    <div class="footer-wrapper" @click="downApp">
      <div class="footer-btn">{{btnText}}</div>
    </div>
  </section>
</template>
<script>
import { downloadApp } from '../utils'
export default {
  data() {
    return {
      btnText: '打开贴近app，查看更多精彩文章' //立即投稿，赚取稿费
    }
  },
  methods: {
    downApp() {
      downloadApp()
    },
  }
}
</script>
<style lang="less" scoped>
  .footer {
    background: #fff;
    .footer-wrapper {
      padding: 24pr;
      .footer-btn {
        border-radius: 10pr;
        font-size: 32pr;
        height: 80pr;
        line-height: 80pr;
        text-align: center;
        background: #FDDB00;
        color: #4B4945;
        &::after {
          content: '>>';
          position: relative;
          top: -4pr;
          margin-left: 6pr;
        }
      }
    }
  }
</style>

