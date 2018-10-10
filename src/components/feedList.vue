<template>
  <div class="feed" v-if="hotSubject.length>0">
    <div class="head">热门文章</div>
    <div class="feed-content" v-for="(item,key) in hotSubject" :key="key" @click="downloadApp($event, '', item.subjectid)">
      <div class="top">
        <img class="icon" :src="item.blogo" />
        <span class="column">{{item.communityName}}</span>
        <span class="time">{{dateFormate(item.long_publish_time,'yy-mm-dd hh:MM')}}</span>
      </div>
      <!-- 纯图片类型 int_type == 0-->
      <div class="middle" v-if="item.int_type===0">
        <div class="title">{{item.content.text}} </div>
        <div class="feed-img" v-if="item.content.images&&item.content.images.length>0">
          <div class="img" v-if="index < 3" v-for="(img, index) in item.content.images" v-lazy:background-image="fileUrlParse(img.link)" :key="index">
            <span class="cover-icon" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
            <span class="cover-icon" v-else-if="img.width / img.height >= 3 ">全景</span>
            <span class="cover-icon" v-else-if="img.height / img.width >= 3">长图</span>
            <span class="more-image" v-if="index === 2 && item.content.images.length > 3">{{ item.content.images.length - 3 }}张更多</span>
          </div>
        </div>
      </div>
      <!-- 视频贴 -->
      <div class="middle" v-else-if="item.int_type===1">
        <div class="title">{{item.content.text}} </div>
        <div v-if="item.content.videos[0].width > item.content.videos[0].height" class="video" v-lazy:background-image="item.content.videos[0].imageUrl" :style="{height: item.content.videos[0].height * 100 / item.content.videos[0].width + 'vw'}">
          <div class="play-icon"></div>
        </div>
        <div v-else class="video vertical" v-lazy:background-image="item.content.videos[0].imageUrl" :style="{width: item.content.videos[0].width * 100 / item.content.videos[0].height + 'vw',height: '82.93vw'}">
          <div class="play-icon"></div>
        </div>
      </div>
      <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
      <div class="middle" v-else-if="item.int_type===2">
        <div class="feed">
          <div class="feed-title">{{item.title}}</div>
          <div v-if="item.cover" class="feed-cover" v-lazy:background-image="fileUrlParse(item.cover)">
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import {
    getCommonTime,
    makeFileUrl,
    down_statistics
  } from '../utils'
  import {
    mapActions,
    mapState
  } from "vuex"
  
  export default {
    name: "feedList",
    props: {
      hotSubject: {
        Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {}
    },
    computed: {},
    mouted() {
  
    },
    methods: {
      dateFormate(t, f) {
        return getCommonTime(t, f);
      },
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      async downloadApp(e, str, id) {
      let  redirectUrl = `closer://feed/${id}`;
        down_statistics(
          this.$store,
          this.$route,
          str,
          "hot_feed",
          redirectUrl
        );
      }
    }
  }
</script>

<style scoped lang="less">
  .feed {
    margin-top: 20pr;
    .head {
      color: #4B4945;
      line-height: 44pr;
      font-size: 32pr;
      margin: 18pr 0 18pr 40pr;
    }
    .feed-content {
      border-bottom: 20pr solid #f1f1f1;
      padding-bottom: 20pr;
      margin-top: 30pr;
      .top {
        .icon {
          width: 142pr;
          height: 60pr;
        }
        .column {
          margin: 16pr 0 0 20pr;
          font-size: 32pr;
          line-height: 40pr;
          margin-left: 20pr;
          color: #4B4945;
        }
        .time {
          font-size: 28pr;
          line-height: 34pr;
          color: #94928E;
          margin-right: 40pr;
          float: right;
        }
      }
    }
    .middle {
      margin: 26pr 0pr 0 0pr;
      .title {
        color: #4B4945;
        line-height: 52pr;
        font-weight: 500;
        font-size: 34pr;
        padding: 0 40pr;
      }
      .feed-img {
        display: flex;
        flex-direction: row;
        margin: 0 40pr 0 40pr;
        margin-top: 16pr;
         :nth-child(3n) {
          margin-right: 0 !important;
        }
        .img {
          width: 216pr;
          height: 216pr;
          margin: 8pr 10pr 0 0;
        }
        .cover-icon {
          width: 80pr;
          height: 40pr;
          background: #000000;
          border-radius: 26pr;
          opacity: 0.6;
          margin: 166pr 16pr 10pr 120pr;
          padding-top: 5pr;
          text-align: center;
          color: #ffffff;
          font-size: 20pr;
          line-height: 28pr;
        }
      }
      .vertical {
        margin: 0 40pr 0 40pr;
      }
      .video {
        margin-top: 16pr;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        .play-icon {
          background: url("../assets/images/play.png");
          background-size: cover;
          width: 100pr;
          height: 100pr;
        }
      }
      .feed {
        display: flex;
        flex-direction: row;
        margin: 32pr 0 32pr 40pr;
        .feed-title {
          width: 416pr;
          height: 144pr;
          overflow: hidden;
          color: #4B4945;
          margin-right: 26pr;
          font-size: 34pr;
        }
        .feed-cover {
          width: 228pr;
          height: 150pr;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }
  }
</style>
