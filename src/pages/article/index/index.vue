<template>
  <div>
  
    <section class="article" v-if="this.$store.state.exist">
      <!-- 下载条 -->
      <download-bar></download-bar>
      <!-- 帖子内容 -->
      <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
      <section class="article-wrap">
        <section class="article-container bg-f">
          <!-- 标题 -->
          <section class="article-title" v-if="!ENV.app"> {{ this.$store.state.res.title }} </section>
          <!-- 关注bar -->
          <focus-bar showTime class="focus-bar"></focus-bar>
          <div class="article-content" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
            <!-- 封面大图 -->
            <div class="article-cover-box" v-if="cover">
              <img :data-src="makeFileUrl(cover)" data-type="preview" class="article-cover-img">
            </div>
            <!-- 主内容 -->
            <div class="content" v-html="this.$store.state.content.html"></div>
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
    name: "Feed",
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
        preSrc: "",
        preShow: false
      };
    },
    computed: {
      ...mapState('common',[
        'hotSubjects'
      ]),
      cover() {
        return ( this.$store.state.res.bigcover ||  this.$store.state.res.cover);
      }
    },
    methods: {
      ...mapActions("common", [
        'fetch_content',
        "getHotSubjects",
        'getUserInfoWithWx'
      ]),
      async fetch() {
        let params = {
          subjectid: this.$route.params.id
        }
        if(this.$route.query.udid&&this.$route.query.sto){
           params['share_udid']=this.$route.query.udid;
          params['sto']=this.$route.query.sto;
        }
        await this.fetch_content(params)
        this.$player.init('.content', {
          muted: false,
          preload: true,
          autoPlay: true,
          loop: false
        })
      },
      clickImg(e) {
        let target = e.target;
        if (this.ENV.app && target.dataset.index) {
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
        if (this.ENV.app && target.dataset.vid && target.dataset.uid) {
          appPlayVideo(
            target.dataset.uid,
            target.dataset.vid
          );
        // } else if (target.dataset.index && this.ENV.app) { //app内部点击图片
        //   this.clickImg(event);
        // } else if (target.dataset.src && !this.ENV.app) {
        //   this.clickImgOuter(target.dataset.src)
        }
      },
      makeFileUrl(url = '') {
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
        this.getUserInfoWithWx(params)
      }
      await this.fetch();
      this.$store.dispatch('wx_config');
      this.getHotSubjects()
      this.$preview.init('.article-content');
    }
  };
</script>

<style lang="less">
  @import "../../../assets/style/content.less";
  @import "../assets/style/article.less";
</style>
