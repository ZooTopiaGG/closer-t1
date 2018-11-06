<template>
  <div>
  
    <section class="video" v-if="exist">
      <!-- 下载条 -->
      <download-bar :placeholder="videoInfo.height/videoInfo.width < 1"></download-bar>
      <!-- 帖子内容 -->
      <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
      <section class="video-wrap">
        <div class="video-main">
          <video :src="videoInfo.src"
            :data-duration="videoInfo.duration"
            :width="videoInfo.width"
            :height="videoInfo.height"
            :poster="videoInfo.img"
            style="width: 100%"
            controls
          ></video>
        </div>
        <section class="video-container bg-f">
          <!-- 关注bar -->
          <focus-bar showTime class="focus-bar"></focus-bar>
          <div class="content" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
            <!-- 封面大图 -->
            <div class="video-cover-box" v-if="res.bigcover || res.cover">
              <img :data-src="makeFileUrl(res.bigcover || res.cover)" class="video-cover-img">
            </div>
            <!-- 主内容 -->
            <div class="video-content" v-html="content.text"></div>
          </div>
          <author-bar></author-bar>
        </section>
        <!-- 阅读 喜欢 -->
        <like-bar class="like-bar" :author="true"></like-bar>
         <!-- 留言板 -->
        <message-board></message-board>
        <!-- 热门文章 -->
        <feed-list :subjectList="hotSubjects"></feed-list>
        <!-- 底部Bar -->
        <foot-bar></foot-bar>
  
      </section>
    </section>
    <Notfound v-else :isDelete="res.bool_delete"></Notfound>
  </div>
</template>

<script>
  import Cookie from "js-cookie";
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  
  import {
    appPlayVideo,
    tabImg,
    makeFileUrl
  } from "../../../utils";
  import Notfound from '../../../components/notfound'
  import DownloadBar from '../../../components/downloadBar'
  import FootBar from '../../../components/footBar'
  import FocusBar from '../../../components/focusBar'
  import LikeBar from '../../../components/likeBar'
  import MessageBoard from '../../../components/messageBoard'
  import FeedList from '../../../components/feedList'
  import AuthorBar from '../../../components/authorBar'
  
  export default {
    components: {
      DownloadBar,
      FootBar,
      Notfound,
      FocusBar,
      LikeBar,
      MessageBoard,
      FeedList,
      AuthorBar,
    },
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
        vid: "",
        video: {},
        playIconTimer: null,
        preSrc: "",
        preShow: false
      };
    },
    computed: {
      ...mapState( [
        'res',
        'content',
        'exist'
      ]),
      ...mapState("common", {
        hotSubjects: state => state.hotSubjects,
      }),
      videoInfo() {
        let video = this.content.videos && this.content.videos[0] || {};
        console.log('video.duration',video.duration)
        return {
          src: video.src,
          img: video.imageUrl,
          duration: video.duration,
          width: video.width,
          height: video.height
        }
      }
    },
    methods: {
      ...mapMutations("video", ['GET_USER_AGENT']),
      ...mapActions("common", [
        "getHotSubjects",
        'getUserInfoWithWx',
        'fetch_content'
      ]),
      // ...mapActions("comment", [
      //   "getSubject"
      // ]),
      async fetch() {
        await this.fetch_content(this.$route.params)
        this.$player.init('.video', {
          muted: false,
          preload: true,
          autoPlay: true,
          loop: false
        })
      },
      clickImg(e) {
        let target = e.target;
        if (ENV.app && target.dataset.index) {
          tabImg(target.dataset.index);
        } else if (target.dataset.src) {
          this.clickImgOuter(target.dataset.src)
        }
      },
      clickImgOuter(src) {
        this.preSrc = src;
        this.preShow = true;
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        const target = event.target,
          classList = target.classList;
        if (ENV.app && target.dataset.vid && target.dataset.uid) {
          appPlayVideo(
            target.dataset.uid,
            target.dataset.vid
          );
        } else if (target.dataset.index ) { //app内部点击图片
          this.clickImg(event);
        } else if (target.dataset.src && !ENV.app) {
          this.clickImgOuter(target.dataset.src)
        }
      },
      makeFileUrl(url = '') {
        console.log('url', decodeURI(url))
        return makeFileUrl(url)
      },
      listenToMyChild(somedata) {
        this.preShow = somedata;
      },
    },
    async mounted() {
      if (this.$route.query.code) {
        let params = {
          plateform: 2,
          code: this.$route.query.code,
          protocol: "WEB_SOCKET",
          adid: Cookies.get('h5Adid') || 'closer-t1'
        }
        console.log('params---', params)
        this.getUserInfoWithWx(params)
      }
      await this.fetch();
      this.$store.dispatch('wx_config');
      console.log('params.id:', this.$route.params.id)
      this.getHotSubjects()
      // this.$preview.show('https://file-sandbox.tiejin.cn/public/a4DI17gt2A/%E5%85%A8%E6%99%AF%E5%9B%BE1.jpg', this.CONTENT_IMGS)
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/video.less";
</style>
