<template>
  <div class="comment">
    <!-- <div class="title">
      {{subject.title}}
    </div>
    <div class="summary">{{content.summary}}</div>
    <div class="discuss" v-for="(item,key) in discuss" :key="key">
      <div class="discuss-content">
        <img class="avatar" v-lazy="fileUrlParse(item.avatar)">
        <div class="info">
          <div class="info-up">
            <span class="nickname">{{item.nickname}}</span>
            <span class="time">{{formatTime(item.createTime,'yy.mm.dd')}}</span>
          </div>
          <div v-if="item.type===0">
            <div class="link" v-if="item.weblink" v-html="item.newText">
            </div>
            <div class="text" v-else>
              {{ item.text }}
            </div>
          </div>
          <div v-else-if="item.type===1">
            <img class="image" v-lazy="fileUrlParse(item.image.link)" :style="{height: item.image.height * 73 / item.image.width + 'vw'}">
          </div>
          <div v-else-if="item.type===2">
            <div class="video" @click="showVideo($event)" :data-uid="item.video.src" :data-vid="item.video.vid">
              <div class="video-play" :style="{background: 'url('+item.video.imageUrl+') no-repeat center','background-size':'cover'}">
                <div class="play-icon" @click="showVideo($event)" :data-uid="item.video.src" :data-vid="item.video.vid"></div>
              </div>
            </div>
          </div>
          <div v-else-if="item.type===3">
            <div class="feed" @click="tofeed(item.feed.feedId)">
              <img class="feed-img" :src="fileUrlParse(item.feed.imageUrl)">
              <div class="feed-info">
                <div class="feed-title">{{ item.feed.title }}</div>
                <div class="feed-summary">{{ item.feed.summary }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div> -->
   
    <FeedList v-if="hotSubjects.length>0" :hotSubjects="hotSubjects"></FeedList>
  </div>
</template>

<script>
  import {
    makeFileUrl,
    getCommonTime,
    appPlayVideo
  } from '../../../utils'
  import {
    mapState,
    mapActions
  } from "vuex";
  
  import FeedList from "../../../components/feedList.vue";
  
  export default {
    name: "commentIndex",
     components: {
       FeedList
     },
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      }
    },
    computed: {
      ...mapState("comment", {
        subject: state => state.subject,
        content: state => state.content,
        discuss: state => state.discuss
      }),
      ...mapState("common",{
        hotSubjects:state=>state.hotSubjects
      })
    
    },
    mounted() {
      if (this.$route.params.sid) {
        this.getSubject({
          "subjectid": this.$route.params.sid
        });
      }
      this.getHotSubject();
    },
    methods: {
      ...mapActions("comment", [
        "getSubject"
      ]),
       ...mapActions("common", [
        "getHotSubject"
      ]),
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      formatTime(time, type) {
        return getCommonTime(time, type);
      },
      showVideo(event) {
        if (this.$store.state.IS_APP) {
          if (!(event.target.dataset.vid || event.target.dataset.uid)) {
            return;
          }
          appPlayVideo(event.target.dataset.vid, event.target.dataset.uid)
        }
      },
      tofeed(fid) {
        location.href = `closer://feed/${fid}`;
      },
    }
  }
</script>

<style lang="less" scoped>
  .comment {
    .title {
      margin: 60pr 0 0 40pr;
      font-size: 44pr;
      color: #4B4945;
      font-weight: 700;
    }
    .summary {
      margin: 60pr 40pr 0 40pr;
      font-size: 36pr;
      color: #4B4945;
    }
    .discuss {
      margin-top: 60pr;
      .discuss-content {
        display: flex;
        flex-direction: row;
        .avatar {
          margin: 6pr 0 0 40pr;
          width: 68pr;
          height: 68pr;
          border-radius: 68pr;
        }
        .info {
          margin: 0 40pr 0 22pr;
          display: flex;
          flex-direction: column;
          .info-up {
            color: #94928E;
            font-size: 24pr;
            margin-bottom: 16pr;
            .time {
              float: right;
            }
          }
          .link {
            color: #507CAF;
            font-size: 32pr;
            width: 582pr;
            height: 132pr;
          }
          .text {
            font-size: 32pr;
            color: #4B4945;
            width: 582pr;
          }
          .image {
            width: 580pr;
          }
          .feed {
            width: 578pr;
            height: 126pr;
            background: #F8F8F8;
            border-radius: 10px;
            border: 1px solid #D7D7D9;
            display: flex;
            flex-direction: row;
            .feed-img {
              margin: 20pr 0 20pr 20pr;
              width: 86pr;
              height: 86pr;
              border-radius: 10pr
            }
            .feed-info {
              margin: 22pr 10pr 0 28pr;
              display: flex;
              flex-direction: column;
              .feed-title {
                width: 412pr;
                height: 44pr;
                color: #4B4945;
                font-size: 32pr;
                overflow: hidden;
              }
              .feed-summary {
                width: 412pr;
                height: 30pr;
                color: #94928E;
                font-size: 24pr;
                overflow: hidden;
              }
            }
          }
          .video {
            width: 580pr;
            height: 326pr;
            border-radius: 3px;
            .video-play {
              width: 580pr;
              height: 326pr;
              background-color: rgba(0, 0, 0, .8);
              overflow: hidden;
              position: relative;
              .play-icon {
                background: url("../assets/images/video-play.png");
                background-size: cover;
                width: 120pr;
                height: 120pr;
                margin: 103pr 230pr 103pr 230pr;
              }
            }
          }
        }
      }
      .line {
        width: 670pr;
        height: 2pr;
        background: #F3F3F3;
        margin: 32pr 40pr 24pr 40pr;
      }
    }
  }
</style>
