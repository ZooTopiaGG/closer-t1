<template>
  <section class="footer" v-if="!ENV.app">
    <div class="footer-wrapper" @click="downApp">
      <div class="footer-btn">{{btnText}} >></div>
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
    border: 1px solid#fff;
    .footer-wrapper {
      margin: 14pr 40pr;
      .footer-btn {
        border-radius: 10pr;
        font-size: 32pr;
        height: 80pr;
        line-height: 80pr;
        text-align: center;
        background: #FDDB00;
        color: #4B4945;
      }
    }
  }
</style>

