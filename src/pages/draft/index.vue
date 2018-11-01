<template>
  <div>
    <div class="draft" v-if="exist">
      <!-- 下载条 -->
      <download-bar></download-bar>
      <!-- 帖子内容 -->
      <div class="draft-wrap">
        <div class="draft-container bg-f">
          <!-- 关注bar -->
          <focus-bar class="focus-bar"></focus-bar>
          <!-- 标题 -->
          <div class="draft-title">
            <span class="topic-logo">话题</span> {{ res.title }}
          </div>
          <div class="join-in" v-if="res.int_category&&res.int_category==2">
            <span class="join"><img class="draft-icon"/>参与</span>
            <span class="get-all">查看话题全部内容 ></span>
          </div>
          <div class="line"></div>
          <div class="draft-author" v-if="res.int_category&&res.int_category==2">
            <img class="icon" :src="makeFileUrl(res.user.avatar)" />
            <span class="name">{{res.user.fullname}}</span>
            <span class="date">{{dateFormate(res.long_publish_time)}}</span>
          </div>
          <section id="draftContent" :class="ENV.app ? 'content draft-content':'content draft-content hidden-content '" v-html="content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
          </section>
          <div v-if="!ENV.app&&res.int_category&&res.int_category==1" class="click-more" id="clickMore" @click="clickMore($event)">
            <div class="folder">
              <div class="more-container">
                <span class="more">展开全文</span>
                <img class="down-arrow" src="../../assets/images/arrow_down.png" />
              </div>
            </div>
          </div>
        </div>
        <!-- 阅读 喜欢 -->
        <!-- <like-bar class="like-bar"></like-bar> -->
        <!-- 留言板 -->
        <message-board v-if="res.int_category&&res.int_category==2"></message-board>
        <!-- 热门文章 -->
        <feed-list v-if="res.int_category&&res.int_category==2" :subjectList="hotSubjects"></feed-list>
        <!-- 精华全部 -->
        <hot-collections class="hot-collections" v-if="!ENV.app&&res.int_category&&res.int_category==1" :subjectId='this.$route.params.id'></hot-collections>
        <!-- 底部Bar -->
        <foot-bar  btnText='立即投稿赚取稿费'></foot-bar>
        <!-- 预览图片 -->
        <preview-list v-if="!ENV.app" :preview-src="preSrc" :preview-show="preShow" v-on:preview-show="listenToMyChild"></preview-list>
      </div>
    </div>
    <Notfound v-else :isDelete="res.bool_delete"></Notfound>
  </div>
</template>

<script>
  import Cookie from "js-cookie";
  import {
    mapState,
    mapActions,
    mapMutations
  } from "vuex";
  
  import {
    appPlayVideo,
    tabImg,
    makeFileUrl,
    dateFromNow
  } from "../../utils";
  import Notfound from "../../components/error/notfound";
  import DownloadBar from "../../components/downloadBar";
  import FootBar from "../../components/footBar";
  import FocusBar from "../../components/focusBar";
  import LikeBar from "../../components/likeBar";
  import MessageBoard from "../../components/messageBoard";
  import FeedList from "../../components/feedList";
  import AuthorBar from "../../components/authorBar";
  import PreviewList from "../../components/previewList";
  import HotCollections from "../../components/hotCollections";
  
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
      PreviewList,
      HotCollections
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
      ...mapState("draft", [
        "res",
        "content",
        "GET_MESSAGE_STATE",
        "version_1_2",
        "agent",
        "exist"
      ]),
      ...mapState("common", {
        hotSubjects: state => state.hotSubjects
      })
    },
    methods: {
      ...mapActions("draft", ["fetch_content"]),
      ...mapActions("common", ["getHotSubjects", "getUserInfoWithWx"]),
      async fetch() {
        console.log("fetch");
        await this.fetch_content(this.$route.params);
      },
      clickImg(e) {
        let target = e.target;
        if (ENV.app && target.dataset.index) {
          tabImg(target.dataset.index);
        } else if (target.dataset.src) {
          this.clickImgOuter(target.dataset.src);
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
          appPlayVideo(target.dataset.uid, target.dataset.vid);
        } else if (target.dataset.index) {
          //app内部点击图片
          this.clickImg(event);
        } else if (target.dataset.src && !ENV.app) {
          this.clickImgOuter(target.dataset.src);
        }
      },
      dateFormate(t) {
        return dateFromNow(t);
      },
      makeFileUrl(url = "") {
        console.log("url", decodeURI(url));
        return makeFileUrl(url);
      },
      listenToMyChild(somedata) {
        this.preShow = somedata;
      },
      clickMore(e) {
        document.getElementById("clickMore").style.display = "none";
        document.getElementById("draftContent").className =
          "content draft-content";
      }
    },
    async mounted() {
      if (this.$route.query.code) {
        let params = {
          plateform: 2,
          code: this.$route.query.code,
          protocol: "WEB_SOCKET",
          adid: Cookies.get("h5Adid") || "closer-t1"
        };
        console.log("params---", params);
        this.getUserInfoWithWx(params);
      }
      await this.fetch();
      this.$store.dispatch("wx_config");
      this.getHotSubjects();
    }
  };
</script>

<style scoped lang="less">
  .draft {
    background: rgba(245, 245, 245, 1);
    .draft-container {
      padding: 0 24pr 0 24pr;
      border: 1px solid #fff;
    }
    .draft-title {
      margin-top: 20pr;
      font-size: 40pr;
      font-weight: 700;
      // white-space: pre-line;
      text-align: justify;
      line-height: 1.6;
      .topic-logo {
        color: #4b4945;
        font-size: 24pr;
        width: 666pr;
        height: 40pr;
        padding: 2pr 9pr 2pr 9pr;
        line-height: 33pr;
        background: #e9e9e9;
      }
    }
    .join-in {
      margin-top: 38pr;
      .join {
        padding: 10pr 20pr 10pr 20pr;
        width: 142pr;
        height: 60pr;
        font-size: 28pr;
        color: #4B4945;
        border: 1px solid #dedede;
        border-radius: 8pr;
        text-align: center;
        .draft-icon {
          width: 24pr;
          height: 24pr;
          background: url("../../assets/images/draft-icon.png");
          background-size: cover;
        }
      }
      .get-all {
        color: #4B4945;
        font-size: 28pr;
        float: right;
        ;
      }
    }
    .line {
      margin-top: 38pr;
      width: 100%;
      border: 1pr solid #F5F5F5;
    }
    .draft-author {
      margin: 30pr 0 34pr 0;
      .icon {
        width: 60pr;
        height: 60pr;
        border-radius: 60pr;
        margin-right: 15pr;
      }
      .name {
        color: #4B4945;
        font-size: 28pr;
      }
      .date {
        color: #94928E;
        font-size: 28pr;
        float: right;
        ;
      }
    }
    .draft-cover-box {
      margin: 30pr auto;
      border-radius: 10pr;
      overflow: hidden;
    }
    .draft-cover-img {
      width: 100%;
    }
    .hidden-content {
      // 超出省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      height: 168pr;
    }
    .draft-content {
      margin-top: 16pr;
      width: 702pr;
    }
    .click-more {
      text-align: center;
      margin: 10pr 0 10pr 0;
      position: relative;
      .folder {
        height: 23.4vw;
        font-size: 14px;
        color: #507caf;
        margin-top: -21.4vw;
        padding-bottom: 3vw;
        position: absolute;
        width: 100%;
        z-index: 9;
        background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 10%, #fff 80%);
        .more-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          .more {
            color: #507caf;
            font-size: 28pr;
          }
          .down-arrow {
            margin-left: 8pr;
            width: 20pr;
            height: 20pr;
          }
        }
      }
    }
  }
</style>
