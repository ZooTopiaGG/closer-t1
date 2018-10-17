<template>
  <div>
    <!-- 下载条 -->
    <download-bar></download-bar>
    <section class="article" v-if="exist">
      <!-- 帖子内容 -->
      <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
      <section class="article-wrap">
        <section class="article-container">
          <!-- 标题 -->
          <section class="article-title"> {{ res.title }} </section>
          <!-- 关注bar -->
          <focus-bar class="focus-bar"></focus-bar>
          <div class="article-cover-box">
            <img :src="makeFileUrl(res.bigcover || res.cover)" alt="" class="article-cover-img">
          </div>
          <!-- 暂时隐藏 -->
          <!-- <section class="feeder-cover flex flex-align-center" v-if="!GET_MESSAGE_STATE">
                              <span> {{ $com.getCommonTime(res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                            </section> -->
          <section class="content article-content" v-html="content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
          </section>
          <author-bar></author-bar>
        </section>
        <!-- 阅读 喜欢 -->
        <like-bar class="like-bar"></like-bar>
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
  import Notfound from '../../../components/error/notfound'
  import DownloadBar from '../../../components/downloadBar'
  import FootBar from '../../../components/footBar'
  import FocusBar from '../../../components/focusBar'
  import LikeBar from '../../../components/likeBar'
  import MessageBoard from '../../../components/messageBoard'
  import FeedList from '../../../components/feedList'
  import AuthorBar from '../../../components/authorBar'
  export default {
    name: "Feed",
    components: {
      DownloadBar,
      FootBar,
      Notfound,
      FocusBar,
      LikeBar,
      MessageBoard,
      FeedList,
      AuthorBar
    },
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
        vid: "",
        video: {},
        playIconTimer: null
      };
    },
    computed: {
      ...mapState("article", [
        'res',
        'content',
        'GET_MESSAGE_STATE',
        'version_1_2',
        'agent',
        'exist'
      ]),
      ...mapState("common", {
        hotSubjects: state => state.hotSubjects,
      })
    },
    methods: {
      ...mapActions(['getUserInfoWithWx']),
      ...mapActions("article",['fetch_content']),
      ...mapMutations("article",['GET_USER_AGENT']),
      ...mapActions("common", [
        "getHotSubjects"
      ]),
      // ...mapActions("comment", [
      //   "getSubject"
      // ]),
      async fetch() {
        console.log('fetch')
        await this.fetch_content(this.$route.params)
      },
      tabImg(e) {
        console.log(e.target.dataset.index)
        tabImg(e.target.dataset.index);
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        const target = event.target,
          classList = target.classList;
        // if (classList.contains('video-play-icon')) {
        //   if (window.ENV.app) {
        //     if (!(target.dataset.vid || target.dataset.uid)) {
        //       return;
        //     }
        //     appPlayVideo(
        //       target.dataset.uid,
        //       target.dataset.vid
        //     );
        //   } else {
        //     let parentNode = target.parentNode,
        //       video = parentNode.querySelector('video');
        //     if (video.paused) {
        //       video.play();
        //       target.style.display = 'none';
        //       target.classList.add('pause');
        //     } else {
        //       video.pause();
        //       clearTimeout(this.playIconTimer);
        //       target.classList.remove('pause');
        //     }
        //   }
        // } else if (classList.contains('video-wrap') || classList.contains('video-tag')) {
        //   let parentNode = target;
        //   if (classList.contains('video-tag')) {
        //     parentNode = target.parentNode;
        //   }
        //   const playIcon = parentNode.querySelector('.video-play-icon'),
        //     video = parentNode.querySelector('video');
        //     console.log(video.paused,playIcon.style.display);
        //   if (!video.paused && playIcon.style.display == 'none') {
        //     playIcon.style.display = 'block';
        //     this.playIconTimer = setTimeout(() => {
        //       this.playIconTimer = null;
        //       playIcon.style.display = 'none';
        //     }, 2e3)
        //   }
  
        // }
        if (window.ENV.app) {
          if (target.dataset.vid && target.dataset.uid) {
            appPlayVideo(
              target.dataset.uid,
              target.dataset.vid
            );
          } else if (target.dataset.index) {
            tabImg(target.dataset.index);
          }
        }
      },
      makeFileUrl(url = '') {
        console.log('url', decodeURI(url))
        return makeFileUrl(url)
      }
    },
    async mounted() {
      // this.GET_USER_AGENT({
      //   nvg: navigator.userAgent,
      //   ref: location.pathname
      // });
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
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/article.less";
</style>
