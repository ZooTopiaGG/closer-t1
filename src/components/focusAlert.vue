<template>
  <mt-popup v-model="display" class="alert-pop">
    <div class="header">
      <div class="close" @click="closeAlert"></div>
    </div>
    <div class="content">
      <div class="text">您已成功关注了“{{cname}}”贴近号，去快看看这个贴近号下的其他帖子吧~</div>
      <div class="desc-img"></div>
    </div>
    <div class="footer" @click="download">确认</div>
  </mt-popup>
</template>

<script>
  import Vue from 'vue'
  import {
    down_statistics
  } from '../utils'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    Popup
  } from 'mint-ui'
  Vue.component(Popup.name, Popup)
  export default {
    name: 'alert-pop',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      cid: {
        type: String,
        default: ''
      },
      cname: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        display: false
      }
    },
    watch: {
      show(val) {
        this.display = val
      }
    },
    computed: {
    },
    methods: {
      download() {
        let redirectUrl = `${baseUrl.download}&link=closer://community/${this.cid}`;
        down_statistics({
          'store': this.$store,
          'route': this.$route,
          'str':'follow',
          "defaultStr": "",
          redirectUrl
        });
        downloadApp()
      },
      closeAlert() {
        this.display = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .alert-pop {
    background: #fff;
    width: 590pr;
    font-size: 32pr;
    line-height: 44pr;
    color: #4B4945;
    border-radius: 10pr;
    .header {
      display: flex;
      justify-content: flex-end;
      margin: 20pr;
      .close {
        width: 20pr;
        height: 20pr;
        background: url('../assets/images/close_icon.png') no-repeat center;
        background-size: cover;
      }
    }
    .content {
      margin-bottom: 0;
      .text {
        padding: 0 40pr;
      }
      .desc-img {
        margin-top: 60pr;
        width: 100%;
        height: 44pr;
        background: url('../assets/images/pop_icon.png') no-repeat center;
        background-size: cover;
      }
    }
    .footer {
      height: 90pr;
      line-height: 90pr;
      text-align: center;
    }
  }
</style>

