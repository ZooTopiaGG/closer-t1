<template>
  <section class="download-bar">
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
      console.log("downloadbar")
      let title, imgUrl, desc;
      if (this.$route.path.indexOf("/community") > -1) {
        // 分享栏目主页
        title = this.$store.state.res.name ?
          this.$store.state.res.name :
          "栏目主页";
        desc = this.$store.state.res.description ?
          this.$store.state.res.description :
          "贴近一点 看身边";
        imgUrl = this.$store.state.res.slogo ?
          this.$store.state.res.slogo :
          this.$store.state.res.blogo;
      } else if (this.$route.path.indexOf("/group") > -1) {
        // 分享群组
        if (
          this.$store.state.group.group_info &&
          this.$store.state.group.group_info.group
        ) {
          let group = this.$store.state.group_info.group_info.group;
          title = group.name ? group.name : "贴近群组";
          if (group.description) {
            let description;
            try {
              description = JSON.parse(
                this.$store.state.group.group_info.group.description
              );
              desc = description[0].content ?
                description[0].content :
                "贴近一点 看身边";
            } catch (e) {
              desc =
                this.$store.state.group.group_info.group.description;
            }
          } else {
            desc = "贴近一点 看身边";
          }
          imgUrl = makeFileUrl(group.avatar);
        }
      } else {
        let content = this.$store.state.content;
        // 分享长图文
        if (this.$store.state.res.int_type === 0) {
          // 图集
          if (content.text) {
            title = content.text;
          } else {
            title = "分享图片";
          }
          if (content.images && content.images.length > 0) {
            let d = content.images.map(x => {
              x = "[图片]";
              return x;
            });
            desc = d.join(" ");
            imgUrl = makeFileUrl(content.images[0].link);
          } else {
            desc = "[图片]";
            imgUrl = "";
          }
        } else if (this.$store.state.res.int_type === 1) {
          // 视频
          if (content.text) {
            title = content.text;
          } else {
            title = "分享视频";
          }
          if (content.videos && content.videos.length > 0) {
            let d = content.videos.map(x => {
              x = "[视频]";
              return x;
            });
            desc = d.join(" ");
            imgUrl = makeFileUrl(content.videos[0].imageUrl);
          } else {
            desc = "[视频]";
            imgUrl = "";
          }
        } else {
          // 长图文
          if (this.$store.state.res.title) {
            title = this.$store.state.res.title;
          } else if (content.text) {
            title = content.text;
          } else {
            title = content.summary;
          }
          desc = content.summary ? content.summary : "分享文章";
          imgUrl = makeFileUrl(this.$store.state.res.cover) ?
            makeFileUrl(this.$store.state.res.cover) :
            makeFileUrl(this.$store.state.res.bigcover);
        }
      }
      let shareConfig = {
        title,
        desc,
        imgUrl
      }
      wxShareConfig(this.$store.state.wxConfig, shareConfig)
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