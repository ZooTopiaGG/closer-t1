<template>
  <mt-popup v-model="visible2" class="alert-pop">
    <div class="header">
      <div class="close" @click="closeAlert"></div>
    </div>
    <div class="content">
      <div class="text">您已成功关注了“{{communityName}}”贴近号，去快看看这个贴近号下的其他帖子吧~</div>
      <div class="desc-img"></div>
    </div>
    <div class="footer" @click="download">确认</div>
  </mt-popup>
</template>

<script>
  import Vue from 'vue'
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
      communityName: {
        type: String,
        default: ''
      },
      downApp: Function,
      close: Function
    },
    data() {
      return {
        visible2: false
      }
    },
    watch: {
      visible(val) {
        this.visible2 = val
      }
    },
    computed: {
      ...mapState('community', {
        visible: state => state.visible
      })
    },
    methods: {
      download() {
        this.$emit('downApp')
      },
      closeAlert() {
        this.$emit('close')
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

