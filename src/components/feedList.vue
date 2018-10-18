<template>
  <div class="feed" v-if="!ENV.app">
    <div class="head">{{title}}</div>
    <div class="feed-content" v-for="(item,key) in subjectList" :key="key" @click="downloadApp($event, '', item.subjectid)">
      <!-- <div class="top">
                            <img class="icon" :src="item.blogo" />
                            <span class="column">{{item.communityName}}</span>
                            <span class="time">{{dateFormate(item.long_publish_time,'yy-mm-dd hh:MM')}}</span>
                          </div>  -->
      <!-- 纯图片类型 int_type == 0 -->
      <!-- <div class="middle" v-if="item.int_type===0">
                        <div class="title">{{item.content.text}} </div>
                        <div class="feed-img" v-if="item.content.images&&item.content.images.length>0">
                          <div class="img" v-if="index < 3" v-for="(img, index) in item.content.images" v-lazy:background-image="fileUrlParse(img.link)" :key="index">
                            <span class="cover-icon" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                            <span class="cover-icon" v-else-if="img.width / img.height >= 3 ">全景</span>
                            <span class="cover-icon" v-else-if="img.height / img.width >= 3">长图</span>
                            <span class="more-image" v-if="index === 2 && item.content.images.length > 3">{{ item.content.images.length - 3 }}张更多</span>
                          </div>
                        </div>
                      </div> -->
      <!-- 视频贴 -->
      <!-- <div class="middle" v-else-if="item.int_type===1">
                        <div class="title">{{item.content.text}} </div>
                        <div v-if="item.content.videos[0].width > item.content.videos[0].height" class="video" v-lazy:background-image="item.content.videos[0].imageUrl" :style="{height: item.content.videos[0].height * 100 / item.content.videos[0].width + 'vw'}">
                          <div class="play-icon"></div>
                        </div>
                        <div v-else class="video vertical" v-lazy:background-image="item.content.videos[0].imageUrl" :style="{width: item.content.videos[0].width * 100 / item.content.videos[0].height + 'vw',height: '82.93vw'}">
                          <div class="play-icon"></div>
                        </div>
                      </div> -->
      <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
      <div class="wrap">
        <div class="middle">
          <div class="cover">
            <div class="feed-title" v-if="item.int_type===2">{{item.title}}</div>
            <div class="feed-title" v-else>{{item.content.text}}</div>
            <div v-if="item.int_type===2&&item.cover" class="feed-cover" v-lazy:background-image="fileUrlParse(item.cover)">
            </div>
            <div v-else-if="item.int_type===0&&item.content.images&&item.content.images.length>0" class="feed-cover" v-lazy:background-image="fileUrlParse(item.cover)">
              <div class="image-num">{{item.content.images.length}}图</div>
            </div>
            <div v-else-if="item.int_type===1" class="feed-cover" v-lazy:background-image="item.content.videos[0].imageUrl">
              <div class="play-icon"></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <label class="name">{{item.communityName}}</label>
          <label class="community-count" v-if="item.commentNumber!=0">{{item.commentNumber}}评论</label>
          <label v-if="item.commentNumber!=0&&item.like!=0">·</label>
          <label class="like-count" v-if="item.like!=0">{{item.like}}赞</label>
          <label class="date">{{dateFormate(item.long_publish_time)}}</label>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import {
    getCommonTime,
    makeFileUrl,
    down_statistics,
    dateFromNow
  } from '../utils'
  import {
    mapActions,
    mapState
  } from "vuex"
  
  export default {
    name: "feedList",
    data() {
      return {}
    },
    props: {
      subjectList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      title: {
        type: String,
        default: "热门文章"
      }
    },
    computed: {
  
    },
  
    methods: {
      dateFormate(t, f) {
        return dateFromNow(t);
      },
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      downloadApp(e, str, id) {
        let redirectUrl = `closer://feed/${id}`;
        down_statistics({
          "store": this.$store,
          "route": this.$route,
          "str": str,
          "defaultStr": "hot_feed",
          "redirectUrl": redirectUrl
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .feed {
    margin-top: 20pr;
    background: #fff;
    border-bottom: 20pr solid #f1f1f1;
    .head {
      color: #272727;
      line-height: 44pr;
      font-size: 32pr;
      font-weight: bold;
      padding: 30pr 0 30pr 24pr;
      border-bottom: 1px solid #f1f1f1;
    }
    .feed-content {
      padding: 24pr 24pr 0;
      // padding-bottom: 20pr;
      // margin-top: 30pr;
      // .top {
      //   .icon {
      //     width: 142pr;
      //     height: 60pr;
      //   }
      //   .column {
      //     margin: 16pr 0 0 20pr;
      //     font-size: 32pr;
      //     line-height: 40pr;
      //     margin-left: 20pr;
      //     color: #4B4945;
      //   }
      //   .time {
      //     font-size: 28pr;
      //     line-height: 34pr;
      //     color: #94928E;
      //     margin-right: 40pr;
      //     float: right;
      //   }
      // }
      .wrap {
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 24pr;
      }
      .middle {
        // margin: 24pr;
        .title {
          color: #242424;
          line-height: 52pr;
          font-size: 34pr;
          padding: 0 40pr;
        }
        // .feed-img {
        //   display: flex;
        //   flex-direction: row;
        //   margin: 0 40pr 0 40pr;
        //   margin-top: 16pr;
        //    :nth-child(3n) {
        //     margin-right: 0 !important;
        //   }
        //   .img {
        //     width: 216pr;
        //     height: 216pr;
        //     margin: 8pr 10pr 0 0;
        //   }
        //   .cover-icon {
        //     width: 80pr;
        //     height: 40pr;
        //     background: #000000;
        //     border-radius: 26pr;
        //     opacity: 0.6;
        //     margin: 166pr 16pr 10pr 120pr;
        //     padding-top: 5pr;
        //     text-align: center;
        //     color: #ffffff;
        //     font-size: 20pr;
        //     line-height: 28pr;
        //   }
        // }
        // .vertical {
        //   margin: 0 40pr 0 40pr;
        // }
        // .video {
        //   margin-top: 16pr;
        //   width: 100%;
        //   background-size: cover;
        //   background-repeat: no-repeat;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   .play-icon {
        //     background: url("../assets/images/play.png");
        //     background-size: cover;
        //     width: 100pr;
        //     height: 100pr;
        //   }
        // }
        .cover {
          display: flex;
          flex-direction: row;
          margin: 0 0 16pr 0;
          .feed-title {
            width: 447pr;
            height: 135pr;
            color: #242424;
            margin-right: 24pr;
            line-height: 45pr;
            font-size: 34pr;
            font-weight: 500;
            display: -webkit-box;
            // 超出省略号
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .feed-cover {
            width: 231pr;
            height: 144pr;
            border-radius: 8pr;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            .image-num {
              position: absolute;
              color: #FFFFFF;
              font-size: 20pr;
              bottom: 8pr;
              right: 8pr;
            }
            .play-icon {
              margin: 42pr 85pr 42pr 85pr;
              background: url("../assets/images/play.png");
              background-size: cover;
              width: 60pr;
              height: 60pr;
            }
          }
        }
      }
      .bottom {
        // padding: 0 0 24pr 24pr;
        color: #94928E;
        font-size: 24pr;
        .name {
          margin-right: 16pr;
        }
        .date {
          float: right;
        }
      }
    }
  }
</style>
