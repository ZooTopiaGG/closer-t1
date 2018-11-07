<template>
  <div>
  
    <section class="video" v-if="this.$store.state.exist">
      <!-- 下载条 -->
      <download-bar :placeholder="videoInfo.height/videoInfo.width < 1"></download-bar>
      <!-- 帖子内容 -->
      <!-- this.$store.state.res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
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
            <div class="video-cover-box" v-if="this.$store.state.res.bigcover || this.$store.state.res.cover">
              <img :data-src="makeFileUrl(this.$store.state.res.bigcover || this.$store.state.res.cover)" class="video-cover-img">
            </div>
            <!-- 主内容 -->
            <div class="video-content" v-html="this.$store.state.content.text"></div>
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
    <Notfound v-else :isDelete="this.$store.state.res.bool_delete"></Notfound>
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
      
      ...mapState("common", {
        hotSubjects: state => state.hotSubjects,
      }),
      videoInfo() {
        let video = this.$store.state.content.videos && this.$store.state.content.videos[0] || {};
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
        let params = {
          subjectid: this.$route.params.id
        }
        if(this.$route.query.udid&&this.$route.query.sto){
           params['share_udid']=this.$route.query.udid;
          params['sto']=this.$route.query.sto;
        }
        await this.fetch_content(params)
        this.$player.init('.video', {
          muted: false,
          preload: true,
          autoPlay: true,
          loop: false
        })
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
      await this.fetch();
      this.$store.dispatch('wx_config');
      console.log('params.id:', this.$route.params.id)
      this.getHotSubjects()
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/video.less";
</style>
