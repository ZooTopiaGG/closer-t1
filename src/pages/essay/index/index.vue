<template>
  <section id="feed">
    <section>
      <section>
        <!-- 帖子内容 -->
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <section class="feed-doc" v-if="$store.state.essay.res.int_type === 2">
          <section class="feeder-content" id="tjimg" >
            <!-- 标题 -->
            <section class="feeder-title feeder-title-2 feeder-title-3"> {{ $store.state.essay.res.title }} </section>
            <!-- 暂时隐藏 -->
            <!-- <section class="feeder-cover flex flex-align-center" v-if="!GET_MESSAGE_STATE">
              <span> {{ $com.getCommonTime(res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
            </section> -->
            <section class="summary tj-sum" v-html="$store.state.essay.content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import { mapActions } from 'vuex';
import {makeHtmlContent} from "../../../utils/utils";
import service from "./service";

export default {
  name: "Feed",
  data() {
    return {
      defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      vid: "",
      video: {}
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   if (typeof window != "undefined") {
  //     if (document.getElementById("wrapper")) {
  //       document.getElementById("wrapper").scrollTop = 0;
  //     }
  //   }
  //   next();
  // },
  methods: {
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    ...mapActions(['fetch_content']),

    fetch() {
      // this.$store.dispatch('fetch_content', this.$route.params)
      this.fetch_content(this.$route.params)
    },
    // 在app端 长图文贴子 打开原生视频
    openClick(event) {
      if (!(event.target.dataset.vid || event.target.dataset.uid)) {
        return;
      }
      this.$com.h5PlayVideo(
        event.target.dataset.uid,
        event.target.dataset.vid,
        this.$store.state.essay.GET_MESSAGE_STATE,
        // this.$store.state.essay.version_1_2,
        this.$store.state.essay.agent.indexOf("closer-ios") > -1
      );
    }
  },
  mounted() {
    let self = this;
    console.log(self.$store)
    self.fetch();
    self.$nextTick(() => {
      if (typeof window != "undefined") {
        // 视频封面异步加载
        let videobg = document.querySelectorAll(".feed-video-bg");
        if (videobg) {
          Array.prototype.forEach.call(videobg, function(x, i) {
            if (x.dataset.bg) {
              setTimeout(() => {
                x.style.backgroundImage = `url('${x.dataset.bg}')`;
              }, 300);
            }
          });
        }
      }
    });
    // 懒加载监听
    // self.$Lazyload.$on("loaded", function({ el, src }) {
    //   let h = el.style.paddingBottom,
    //     f = el.dataset.feedlazy;
    //   if (f === "feedlazy" && h && parseInt(h) != 0) {
    //     el.style.cssText = `max-width: 100%;height: ${h}; padding-bottom: 0; box-sizing: content-box;`;
    //   }
    // });
    // let videos = document.querySelectorAll('video');
    // videos.forEach(video => {
    //   console.log(video.id)
    //   video.addEventListener('touchend', function(e) {
    //     let el = e.target,
    //         r = el.clientHeight / el.clientWidth;
    //         // r = this.videoHeight / this.videoWidth;
    //     console.log(this.videoHeight, this.videoWidth, this.id)
    //     console.log(r)
    //     // if (r > .5625) {
    //     //   video.setAttribute('style', 'width: 60vw;height:' + 60/.5625 + 'vw');
    //     // }
    //     !this.paused ? this.pause() : this.play();
    //   })
    // })

    // let videos = document.querySelectorAll('video');
    // videos.forEach(video => {
    //   larkplayer(video.id, {
          
    //   });
    // })

    // let videos = document.querySelectorAll('.tiejin-videobox');
    // videos.forEach(video => {
    //   let {vid, src} = video.dataset;
    //   larkplayer(video.id, {
    //       src,
    //       playsinline:"true",
    //       preload:'auto'
    //   });
    // })
  }
};
</script>
<style scoped lang="less">
@import "../assets/style/essay.less";
</style>
