<template>
  <div>
   
    <section class="article" v-if="exist">
       <!-- 下载条 -->
    <download-bar></download-bar>
      <!-- 帖子内容 -->
      <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
      <section class="article-wrap">
        <section class="article-container bg-f">
          <!-- 标题 -->
          <section class="article-title" v-if="!ENV.app"> {{ res.title }} </section>
          <!-- 关注bar -->
          <focus-bar class="focus-bar"></focus-bar>
          <div class="content" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
            <div class="article-cover-box">
              <img :data-src="makeFileUrl(res.bigcover || res.cover)" class="article-cover-img">
            </div>
            <div class="article-content" v-html="content.html"></div>
          </div>
          <author-bar></author-bar>
        </section>
        <!-- 阅读 喜欢 -->
        <like-bar class="like-bar"></like-bar>
        <!-- 热门文章 -->
        <feed-list :subjectList="hotSubjects"></feed-list>
        <!-- 留言板 -->
        <message-board></message-board>
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
      }),
      ...mapState(['CONTENT_IMGS'])
    },
    methods: {
      ...mapActions("article",['fetch_content']),
      ...mapMutations("article",['GET_USER_AGENT']),
      ...mapActions("common", [
        "getHotSubjects",
        'getUserInfoWithWx'
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
      console.log('CONTENT_IMGS',this.CONTENT_IMGS)
      this.$store.dispatch('wx_config');
      console.log('params.id:', this.$route.params.id)
      this.getHotSubjects()
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/article.less";
</style>
