<template>
  <section class="download-bar" v-if="!ENV.app">
    <div class="place"></div>
    <div class="wrap">
      <div class="left">
        <div class="left-logo"></div>
        <mt-swipe :auto="4000" :show-indicators="false" class="mtswipe left-desc">
          <mt-swipe-item>
            <div class="swip-item">
              <span>贴近一点 看身边</span>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="swip-item">
              <span>能赚稿费的本地内容社区</span>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="swip-item">
              <p>打开贴近看资讯</p>
              <p>领10元红包</p>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="right">
        <div class="right-btn" @click="handleClick">下载贴近</div>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    down_statistics,
    wxShareConfig,
    makeFileUrl
  } from '../utils/index'
  import baseUrl from '../config'
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui';
  
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  export default {
    name: 'downloadBar',
    mounted() {  
    },
    methods: {
      handleClick(e, str) {
        let redirectUrl = baseUrl.download;
        down_statistics({
          'store': this.$store,
          'route': this.$route,
          str,
          "defaultStr": "direct_top",
          redirectUrl
        });
      }
    }
  }
</script>

<style scoped lang="less">
  @h: 108pr;
  .download-bar {
    position: relative;
    width: 100%;
    height: @h;
    z-index: 999;
    .place {
      height: 100%;
    }
    .wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      padding: 0 40pr;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 5px #efefef;
      background: #fff;
      color: #4b4945;
    }
    .left {
      height: @h;
    }
    .left-logo {
      float: left;
      width: 86pr;
      height: 100%;
      background: url(../assets/images/logo.png) center no-repeat;
      background-size: 86pr;
    }
    .left-desc {
      float: right;
      width: 360pr;
      margin-left: 20pr;
      font-size: 32pr;
    }
    .swip-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    .right-btn {
      font-size: 28pr;
      padding: 10pr 22pr;
      border-radius: 60pr;
      background: #fddb00;
      box-shadow: 0 4pr 12pr 0 #ffbe20;
    }
  }
</style>