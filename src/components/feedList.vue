<template>
  <div class="feed" v-if="hotSubjects.length>0">
    <div class="head">热门文章</div>
    <div class="feed-content" v-for="(item,key) in hotSubjects" :key="key">
      <div class="top">
        <img class="icon" :src="item.blogo" />
        <span class="column">{{item.communityName}}</span>
        <span class="time">{{dateFormate(item.long_publish_time,'yy-mm-dd hh:MM')}}</span>
      </div>
      <div class="middle" v-if="item.int_type===0">
        <div class="title">{{item.content.text}} </div>
        <div class="feed-img" v-if="item.content.images&&item.content.images.length>0">
          <div class="img" v-if="index < 3" v-for="(img, index) in item.content.images" v-lazy:background-image="fileUrlParse(img.link)" :key="index">
            <!-- <span class="cover-icon" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span> -->
            <!-- <span class="cover-icon" v-else-if="img.width / img.height >= 3 ">全景</span> -->
            <!-- <span class="cover-icon" v-else-if="img.height / img.width >= 3">长图</span> -->
            <div class="cover-icon">全景</div>
            <span class="more-image" v-if="index === 2 && item.content.images.length > 3">{{ item.content.images.length - 3 }}张更多</span>
          </div>
        </div>
      </div>
      <div class="middle" v-else-if="item.int_type===1">
        <div class="title">{{item.content.text}} </div>
        <div v-if="item.content.videos[0].width > item.content.videos[0].height" v-lazy:background-image="item.content.videos[0].imageUrl" :style="{width: '100vw',height: item.content.videos[0].height * 100 / item.content.videos[0].width + 'vw'}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getCommonTime,
    makeFileUrl
  } from '../utils'
  import {
    mapActions,
    mapState
  } from "vuex"
  
  export default {
    name: "feedList",
    props: {
      hotSubjects: Array,
      default: () => {
        return [];
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
      }
    }
  }
</script>

<style scoped lang="less">
  .feed {
    margin-top: 20pr;
    .head {
      color: #444444;
      line-height: 44pr;
      font-size: 32pr;
      margin: 18pr 0 18pr 40pr;
    }
    .feed-content {
      margin-top: 30pr;
      .top {
        .icon {
          margin-left: 38pr;
          width: 72pr;
          height: 72pr;
          border-radius: 72pr;
        }
        .column {
          margin: 16pr 0 0 20pr;
          font-size: 28pr;
          line-height: 40pr;
          margin-left: 20pr;
          color: #4B4945;
        }
        .time {
          font-size: 24pr;
          line-height: 34pr;
          color: #94928E;
          margin-right: 40pr;
          float: right;
        }
      }
    }
    .middle {
      margin: 26pr 40pr 0 40pr;
      .title {
        color: #4B4945;
        line-height: 52pr;
        font-weight: 600;
      }
      .feed-img {
        display: flex;
        flex-direction: row;
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
          padding-top:5pr;
          text-align: center;
          color: #ffffff;
          font-size: 20pr;
          line-height: 28pr;
        }
      }
    }
  }
</style>
