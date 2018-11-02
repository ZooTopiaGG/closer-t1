<template>
  <div class="image-list">
    <!-- 下载条 -->
    <download-bar></download-bar>
    <!-- 关注 -->
    <div class="focus-box">
      <focus-bar showTime></focus-bar>
    </div>
  
    <!-- 图集详情 -->
    <div class="feed-images">
      <section class="feed-img" id="imgListFeed" v-if="res && res.int_type === 0">
        <section class="feeder-title feeder-title-2 feeder-type-0" v-if="res.content">{{stringToJson(res.content).text}}</section>
        <!--  判断是否在app de预览 -->
        <!-- 图片排列  需判断GIF -->
        <section class="feeder-images" v-if="!ENV.app">
          <section class="feeder-img flex flex-pack-justify" v-if="stringToJson(res.content).images && stringToJson(res.content).images.length == 1">
            <section class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in stringToJson(res.content).images" v-lazy:background-image="makeFileUrl(img.link)" :key="index">
              <img class="feeder-cover-list" :data-src="makeFileUrl(img.link)" :data-index="index">
              <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
            </section>
          </section>
          <section class="feeder-img flex flex-pack-justify" v-else-if="stringToJson(res.content).images && stringToJson(res.content).images.length == 2">
            <section class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in stringToJson(res.content).images" v-lazy:background-image="makeFileUrl(img.link)" :key="index">
              <img class="feeder-cover-list" :data-src="makeFileUrl(img.link)" :data-index="index">
              <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
            </section>
          </section>
          <section class="feeder-img flex" v-else-if="stringToJson(res.content).images && stringToJson(res.content).images.length == 3 || stringToJson(res.content).images && stringToJson(res.content).images.length > 4">
            <section class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in stringToJson(res.content).images" v-lazy:background-image="makeFileUrl(img.link)" :key="index">
              <img class="feeder-cover-list" :data-src="makeFileUrl(img.link)" :data-index="index">
              <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
            </section>
          </section>
          <section class="feeder-img flex flex-pack-justify" v-else-if="stringToJson(res.content).images && stringToJson(res.content).images.length == 4">
            <section class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in stringToJson(res.content).images" v-lazy:background-image="makeFileUrl(img.link)" :key="index">
              <img class="feeder-cover-list" :data-src="makeFileUrl(img.link)" :data-index="index">
              <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
            </section>
          </section>
        </section>
      </section>
    </div>
    <!-- 阅读 喜欢 -->
    <div class="read-like">
      <like-bar :author="true"></like-bar>
    </div>
    <!-- 留言板 -->
    <message-board></message-board>
    <!-- 热门文章 -->
    <feed-list :subjectList="hotSubjects"></feed-list>
    <!-- footer -->
    <foot-bar></foot-bar>
    <!-- 图片预览 -->
    <preview-list :preview-src="preSrc" :preview-show="preShow" v-on:preview-show="listenToMyChild"></preview-list>
  </div>
</template>

<script>
  import Vue from 'vue'
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
  import DownloadBar from '../../../components/downloadBar'
  import FocusBar from '../../../components/focusBar'
  import LikeBar from '../../../components/likeBar'
  import MessageBoard from '../../../components/messageBoard'
  import FeedList from '../../../components/feedList'
  import FootBar from '../../../components/footBar'
  import PreviewList from '../../../components/previewList'
  
  export default {
    name: 'feed-img',
    props: {
  
    },
    components: {
      DownloadBar,
      FocusBar,
      LikeBar,
      MessageBoard,
      FeedList,
      FootBar,
      PreviewList
    },
    data() {
      return {
        preSrc: "",
        preShow: false
      }
    },
    computed: {
      ...mapState('article', [
        'res'
      ]),
      ...mapState("common", {
        hotSubjects: state => state.hotSubjects,
      })
    },
    async mounted() {
      await this.fetch();
      this.getHotSubjects();
      !this.ENV.app && this.$preview.init('.feed-images');
    },
    methods: {
      ...mapActions("article", ['fetch_content']),
      ...mapActions("common", [
        "getHotSubjects",
        'getUserInfoWithWx'
      ]),
      async fetch() {
        console.log('fetch')
        await this.fetch_content(this.$route.params)
      },
      stringToJson(str) {
        if (!str) return
        return JSON.parse(str)
      },
      makeFileUrl(url = '') {
        console.log('url', decodeURI(url))
        return makeFileUrl(url)
      },
      clickImg(e) {
        let target = e.target;
        if (ENV.app && target.dataset.index) {
          tabImg(target.dataset.index);
        } else if (target.dataset.src) {
          this.clickImgOuter(target.dataset.src)
        }
      },
      listenToMyChild(somedata) {
        this.preShow = somedata;
      },
      clickImgOuter(src) {
        this.preSrc = src;
        this.preShow = true;
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        console.log('fdfadfdfd123131312;')
        const target = event.target,
          classList = target.classList;
        if (ENV.app && target.dataset.vid && target.dataset.uid) {
          appPlayVideo(
            target.dataset.uid,
            target.dataset.vid
          );
        } else if (target.dataset.index && this.ENV.app) { //app内部点击图片
          this.clickImg(event);
        // } else if (target.dataset.src && !ENV.app) {
        //   this.clickImgOuter(target.dataset.src)
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @commonspace: 2.668vw;
  @m15: 1.6vw;
  @width: 100vw;
  @height: 100vh;
  @5625: 56.25vw;
  .image-list {
    // background:rgba(245,245,245,1);
    // padding: 0 24pr;
    .focus-box {
      padding: 0 24pr;
    }
    .feed-images {
      padding: 30pr 0;
      // border-bottom: 1px solid #efefef;
      .feed-img {
        padding: 0 24pr;
        // padding: 0 0 30pr;
        #feed {
          padding: 0 0 @m15*2;
          box-sizing: border-box;
          font-size: 13px;
          padding-bottom: 0;
        }
        .feed2 {
          height: 100%;
        }
        .feed-box-0 {
          min-height: calc(100vh - 13.07vw);
        }
        .feed-box-1 {
          min-height: calc(100vh - @5625);
        }
        .feed-h5-videos {
          position: relative;
        }
        .feed-h5-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: #fff;
          z-index: 9;
          display: none;
        }
        .works {
          padding-top: @commonspace * 2;
          position: relative;
        }
        .works .title {
          text-align: left;
          margin-left: 4.67vw;
        }
        .feeder-info,
        .feed-messagebord-type,
        .feed-messagebord,
        .feed-messagebord-list,
        .feeder-comments {
          padding: 0 @m15*2;
        }
        .feeder-type-1 {
          padding-top: @commonspace * 2;
        }
        .feeder-comment {
          font-size: 15px;
        }
        .end-data {
          color: #888;
          padding: @commonspace @m15*2;
          border-top: 1px solid #eaeaea;
        }
        .author-list {
          padding: @commonspace * 2 @m15*2 0;
          color: #888;
        }
        .author-list>p {
          margin-bottom: @commonspace;
        }
        .author-list>p>span {
          margin-right: @commonspace;
        }
        .feeder-title {
          font-size: 18px;
          // margin-bottom: @commonspace * 2;
          font-weight: bold;
          white-space: pre-line;
          text-align: justify;
          line-height: 1.6;
        }
        .feeder-title-2 {
          font-weight: 400;
        }
        .feeder-title-3 {
          font-size: 20px;
          font-weight: bold;
          // margin-bottom: @commonspace;
        }
        .feeder-content {
          margin-top: @commonspace * 2;
        }
        .feeder-img {
          width: 100%;
          flex-wrap: wrap;
          display: flex;
          flex-direction: row;
        }
        .feed-imgbox {
          width: 100%;
          height: auto;
          position: relative;
          border-radius: 3px;
        }
        .feed-imgbox>video {
          width: 100%;
          height: auto;
          background-color: rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
        .feed-imgbox-else {
          background-position: center center;
          background-repeat: no-repeat;
          width: 100%;
          height: 48vw;
          border-radius: 3px;
        }
        .feed-imgbox-else>.feed-imgbox-else-child {
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .hide-over {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
          z-index: 99;
        }
        .feeder-info {
          color: #94928e;
          margin: @commonspace 0;
        }
        .videoNav {
          height: 60px;
        }
        .feed-messagebord {
          height: 10.67vw;
          border-bottom: 1px solid #eee;
        }
        .feed-messagebord-type {
          margin-top: @commonspace;
          color: #94928e;
          font-size: 14px;
        }
        .feed-publication-number {
          margin-right: @commonspace;
        }
        .feed-messagebord-left {
          font-size: 15px;
          color: #444;
          font-weight: 600;
        }
        .messager-comment {
          color: #495060;
        }
        .messager-name {
          font-size: 14px;
        }
        .messager-content {
          margin: @commonspace 0;
          line-height: 1.6;
          text-align: justify;
          font-size: 15px;
        }
        .messager-time {
          font-size: 12px;
          color: #999;
        }
        .feeder-images {
          padding: @commonspace * 2 0 @m15*2 0;
        }
        .feeder-img-list {
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .feeder-img-list:nth-child(3n) {
          margin-right: 0 !important;
        }
        .feeder-img-list-cell-1 {
          width: 100%;
          height: 100%;
        }
        .feeder-img-list-cell-2 {
          width: 49.5%;
          height: 0;
          padding-bottom: 49.5%;
        }
        .feeder-img-list-cell-3 {
          width: 33%;
          height: 0;
          padding-bottom: 33%;
          margin-bottom: 0.5%;
          margin-right: 0.5%;
        }
        .feeder-img-list-cell-4 {
          width: 49.5%;
          height: 0;
          padding-bottom: 49.5%;
          margin-bottom: 1%;
        }
        .icon-add {
          font-size: 14px;
          margin-right: 2px;
        }
        .feeder-img-bgcover {
          position: relative;
          width: 100%;
          max-width: 680px;
          height: 124vw;
        }
        .feed-img-bgcover_1_3_1 {
          height: 114.08vw;
          margin-top: 5.6vw;
        }
        .feeder-img-cover {
          position: relative;
          width: 100%;
          height: 57vw;
        }
        .feed-img-cover_1_3_1 {
          height: 50.784vw;
          margin-top: 5.6vw;
        }
        .feed-cover-bgcover_1_3_1,
        .feed-cover-cover_1_3_1 {
          border-radius: 5px;
        }
        .feed-cover-bgcover {
          display: block;
          position: relative;
          width: 100%;
          height: 124vw;
        }
        .feed-cover-bgcover_1_3_1 {
          width: calc(100% - 6.4vw);
          margin: 0 3.2vw;
          height: 114.08vw;
          box-sizing: border-box;
        }
        .feed-cover-cover {
          display: block;
          position: relative;
          width: 100%;
          height: 57vw;
        }
        .feed-cover-cover_1_3_1 {
          width: calc(100% - 6.4vw);
          margin: 0 3.2vw;
          height: 50.784vw;
          box-sizing: border-box;
        }
        .feed-cover-list {
          width: 100%;
          display: block;
        }
        .feeder-cover {
          padding: @commonspace * 2 @m15*2 0;
          font-size: 14px;
          color: #888;
        }
        .feeder-cover-list {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          display: block;
        }
        .cover_img_type {
          position: absolute;
          right: 5px;
          bottom: 5px;
          font-size: 10px;
          color: #fff;
          padding: 0 6px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 8px;
        }
        .feeder-comments,
        .god-discuss-end-tag {
          margin-top: 6.66vw;
        }
        .feeder-comments-cell {
          box-sizing: border-box;
          border-bottom: 1px solid rgb(243, 243, 243);
          margin-bottom: @commonspace;
          padding: @commonspace;
        }
        .feeder-comment-info {
          margin-top: 0.66vw;
          width: 13vw;
        }
        .feeder-comment-info>i {
          margin-right: @commonspace;
          width: 9.07vw;
          height: 9.07vw;
          max-width: 68px;
          max-height: 68px;
          border-radius: 100%;
          background-size: cover;
          background-position: 50% 50%;
        }
        .feeder-comment-3 {
          height: 16.54vw;
          box-sizing: border-box;
          padding: @commonspace;
          border-radius: 6px;
          border: 1px solid #d7d7d9;
          background: #f6f6f6;
        }
        .feeder-comment-3-cover>i {
          display: block;
          margin-right: @commonspace;
          width: 11.47vw;
          height: 11.47vw;
          max-width: 86px;
          max-height: 86px;
          border-radius: 6px;
          background-size: cover;
          background-position: center center;
        }
        .feeder-comment-3-title {
          font-size: 15px;
          height: 15px;
          line-height: 1;
          overflow: hidden;
          margin-bottom: @commonspace;
        }
        .feeder-comment-3-summary {
          font-size: 12px;
          height: 12px;
          line-height: 1;
          color: rgba(148, 146, 142, 1);
          overflow: hidden;
        }
        .feeder-comment-nickname {
          font-size: 13px;
          color: rgba(148, 146, 142, 1);
          margin-bottom: 2.4vw;
          line-height: 1;
        }
        .feeder-comment-img {
          width: 73vw;
          border-radius: 3px;
        }
        .messages>img {
          width: 18px;
          height: 15px;
        }
        .supports>img {
          width: 19px;
          height: 15px;
          margin-bottom: 3px;
        }
        .dpTextArea {
          width: 100%;
          padding: 0 @m15*2 @m15*2;
          background: #fff;
          min-height: 180px;
          box-sizing: border-box;
          padding-top: 13.07vw;
        }
        .tj-btn {
          width: 100%;
        }
        .tj-code-btn {
          height: 6.9vw;
          margin: 0 2px 0 5px;
          font-size: 14px;
        }
        .title {
          height: @m15 *4;
          line-height: @m15 *4;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-bottom: @m15;
        }
        .cancel {
          margin-right: @commonspace;
        }
        // new
        .sup-icon {
          width: 19px;
          height: 15px;
        }
        @media screen and (min-width: 680px) {
          .videoNav {
            display: none;
          }
          .feeder-img-cover,
          .feeder-img-bgcover {
            max-width: 680px;
            height: auto;
            img {
              max-width: 680px;
              height: auto;
            }
          }
          .imgbox,
          .imgbox img {
            height: auto !important;
          }
          .feeder-content {
            margin-top: 15px;
          }
          .feeder-info,
          .feed-messagebord-type,
          .feed-messagebord,
          .feed-messagebord-list,
          .feeder-title,
          .read-num,
          .feeder-comments {
            padding: 0 10px;
          }
          .feeder-comments {
            margin-top: 15px;
          }
          .feeder-comments-cell {
            padding: 10px;
            margin-bottom: 10px;
          }
          .feeder-comment-img {
            width: 100%;
            height: auto !important;
            min-height: 0;
          }
          .feeder-comment-info {
            width: 80px;
            margin-top: 0;
            i {
              margin-right: 10px;
            }
          }
          .feeder-comment-nickname {
            margin-bottom: 10px;
          }
          .author-list {
            padding: 15px 10px 0;
          }
          .author-list>p {
            margin-bottom: 10px;
          }
          .end-data {
            padding: 10px 0 15px;
          }
          .feed-h5-videos {
            max-width: 680px;
            height: auto !important;
            margin-bottom: 10px;
            video {
              width: 100% !important;
              height: auto !important;
            }
          }
          .feed-h5-videos-vertical {
            width: auto !important;
            height: 100vh !important;
          }
        }
      }
    }
    .read-like {
      border-bottom: 20pr solid #efefef;
    }
  }
</style>


