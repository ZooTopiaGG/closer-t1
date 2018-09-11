<template>
  <div class="comment">
    <div v-if="subjectExist">
      <div class="title">
        {{subject.title}}
      </div>
      <div class="content" v-html="content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
      </div>
      <div class="discuss" v-for="(item,key) in discuss" :key="key">
        <div class="discuss-content">
          <div class="avatar" v-lazy:background-image="fileUrlParse(item.avatar)"></div>
          <div class="info">
            <div class="info-up">
              <span class="nickname">{{item.nickname}}</span>
              <!-- <span class="time">{{formatTime(item.createTime,'yy.mm.dd')}}</span> -->
            </div>
            <div v-if="item.type===0">
              <!-- 文字链接 -->
              <div class="link" v-if="item.weblink" v-html="item.newText">
              </div>
              <div class="text" v-else>
                {{ item.text }}
              </div>
            </div>
            <div v-else-if="item.type===1">
              <!-- 图片 -->
              <img class="image" :src="defaultImg" v-lazy="fileUrlParse(item.image.link)" :data-index="item.image.index" @click="tabImg($event)" :style="{height: item.image.height * 73 / item.image.width + 'vw'}">
            </div>
            <div v-else-if="item.type===2" class="video" @click="openClick($event)" :data-uid="item.video.src" :data-vid="item.video.vid" :style="{background: 'url('+item.video.imageUrl+') no-repeat center','background-size':'cover'}">
              <!-- 视频 -->
              <div class="play-icon" :data-uid="item.video.src" :data-vid="item.video.vid"></div>
            </div>
            <div v-else-if="item.type===3">
              <!-- 帖子 -->
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
      </div>
      <div v-if="content.end_html" class="content" v-lazy-container="{ selector: 'img' }" v-html="content.end_html" @click="openClick($event)"></div>
    </div>
    <Notfound v-else :isDelete="subject.bool_delete"></Notfound>
  </div>
</template>

<script>
  import {
    makeFileUrl,
    getCommonTime,
    appPlayVideo,
    tabImg
  } from '../../../utils'
  import {
    mapState,
    mapActions
  } from "vuex";
  import Notfound from '../../../components/error/notfound'
  export default {
    name: "commentIndex",
    components: {
      Notfound
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
        discuss: state => state.discuss,
        subjectExist: state => state.subjectExist
      })
    },
    mounted() {
      if (this.$route.params.sid) {
        this.getSubject({
          "subjectid": this.$route.params.sid
        });
      }
    },
    methods: {
      ...mapActions("comment", [
        "getSubject"
      ]),
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      // formatTime(time, type) {
      //   return getCommonTime(time, type);
      // },
      openClick(event) {
        const target = event.target;
        if (this.$store.state.IS_APP) {
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
      tabImg(e) {
        if (this.$store.state.IS_APP) {
          tabImg(e.target.dataset.index);
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
    padding: 0 40pr 0 40pr;
    .title {
      margin: 50pr 0 40pr 0pr;
      font-size: 44pr;
      line-height: 60pr;
      color: #4b4945;
    }
    .content {
      margin-top: 30pr;
    }
    .discuss {
      margin-top: 60pr;
      .discuss-content {
        display: flex;
        flex-direction: row;
        .avatar {
          margin: 6pr 20pr 0 0;
          width: 68pr;
          height: 68pr;
          border-radius: 68pr;
          background-size: cover;
        }
        .info {
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
                line-height: 44pr;
                color: #4B4945;
                font-size: 32pr;
                overflow: hidden;
              }
              .feed-summary {
                width: 412pr;
                height: 30pr;
                color: #94928E;
                line-height: 30pr;
                font-size: 24pr;
                overflow: hidden;
              }
            }
          }
          .video {
            width: 580pr;
            height: 326pr;
            border-radius: 3px;
            background-color: rgba(0, 0, 0, .8);
            overflow: hidden;
            .play-icon {
              background: url("../../../assets/images/play.png");
              background-size: cover;
              width: 120pr;
              height: 120pr;
              margin: 103pr 230pr 103pr 230pr;
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
    .discuss-end-tag {
      margin-top: 20pr;
    }
  }
</style>
