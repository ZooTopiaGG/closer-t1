<template>
  <section class="footer">
    <div class="footer-wrapper">
      <div class="footer-btn">{{btnText}} >></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'footer',
  data() {
    return {
      btnText: '打开贴近app，查看更多精彩文章' //立即投稿，赚取稿费
    }
  }
}
</script>
<style lang="less" scoped>
  .footer {
    background: #fff;
    .footer-wrapper {
      margin: 14pr 40pr;
      .footer-btn {
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

