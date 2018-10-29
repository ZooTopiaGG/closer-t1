<template>
  <div class="wrapper bg-f" v-if="!ENV.app&&messagelist">
    <div class="message-board" v-if="messagelist.length > 0">
      <div class="board-top">
        <span class="title" id="title">精彩留言</span>
        <span class="write-message" @click="writeMessage('comment', $route.params.id)">写留言</span>
      </div>
      <div class="message-list" v-for="(item, index) in messagelist" :key="index">
        <div class="message-info box box-lr">
          <div class="avater" v-if="item.user">
            <img v-lazy="fileUrlParse(item.user.attributes.roster.avatar) || fileUrlParse(item.user.avatar)" alt="">
          </div>
          <div class="info-ceil box box-tb">
            <span class="name">{{ item.user.attributes.roster.name || item.user.fullname }}</span>
            <span class="time">{{dateFromNow(item.long_create_time)}}</span>
          </div>
          <!-- 回复补丁 -->
          <div class="response box box-lr box-center-center" @click="writeMessage('reply', item.commentid)">
            <span class="res-icon icon-width"></span>
            <span class="res-count">{{ item.replyNumber }}</span>
          </div>
          <!-- 点赞补丁 -->
          <div class="support" @click="support($event, item.subjectid, item.commentid, item.like)">
            <img class="support icon-width" src="data:image/png;base64,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">
          </div>
        </div>
        <!-- 回复内容 -->
        <div class="message-content">
          {{ item.content }}
        </div>
        <div class="message-replay" v-if="item.replyNumber > 0">
          <div class="replay" v-for="(commentItem, commentIndex) in item.sonList" v-if="commentIndex <= 3" :key="commentIndex">
            <span>{{ commentItem.user.fullname }}：</span>
            <span class="replay-content">{{ commentItem.content }}</span>
          </div>
          <!-- 更多回复补丁 -->
          <div class="replay-total" v-if="item.replyNumber > 3" @click="downApp">
            <span>共{{ item.replyNumber }}条回复</span>
            <span class="right-icon"></span>
          </div>
        </div>
      </div>
      <div class="more-comment" @click="downApp">点击查看更多评论<span></span></div>
    </div>
    <div class="no-draft" v-else>
      <span class="text">暂无留言，赶紧留言吧~</span>
      <span class="write" @click="writeMessage('comment', $route.params.id)">写留言</span>
    </div>
    <login-pop ref="login" :isFrom="'messagelist'"></login-pop>
  </div>
</template>

<script>
  import baseUrl from '../config/index'
  import LoginPop from './login'
  import {
    mapState,
    mapActions
  } from 'vuex';
  import {
    makeFileUrl,
    dateFormat,
    downloadApp,
    dateFromNow
  } from '../utils'
  export default {
    name: 'wrapper',
    components: {
      LoginPop
    },
    data() {
      return {
        pagenum: 1,
        pagesize: 5,
        isSupport: false
      }
    },
    beforeMount() {
      let code = this.$route.query.code
  
      if (this.$route.params.id) {
        this.getCommentsList({
          "subjectid": this.$route.params.id,
          "pagenum": this.pagenum,
          "pagesize": this.pagesize
        })
      }
    },
    mounted() {
      console.log('this.res--', this.res)
      // if (this.$route.query.code) {
      //   let params = {
      //     plateform: 2,
      //     code: this.$route.query.code,
      //     protocol: "WEB_SOCKET",
      //     adid: Cookies.get('h5Adid') || 'closer-t1'
      //   }
      //   console.log('params---', params)
      //   this.getUserInfoWithWx(params)
      // }
    },
    computed: {
      ...mapState('article', [
        'res',
        'content'
      ]),
      ...mapState("common", {
        messagelist: state => state.messagelist,
      })
    },
    methods: {
      ...mapActions("common", [
        "getCommentsList",
        "checkIsLike",
        "getWxAuth",
        "getUserInfoWithWx"
      ]),
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      dateFromNow(time) {
        return dateFromNow(time)
      },
      writeMessage(type, id) {
        // 渲染页面前 先判断cookies user是否存在
        console.log('Cookies--', Cookies.get("token"))
        if (this.res.int_type === 2) {
          window.sessionStorage.setItem("title", this.res.title);
        } else {
          window.sessionStorage.setItem("title", this.content.text);
        }
        if (Cookies.get("user")) {
          this.gotoMessage(type, id);
        } else {
          // 前期 仅微信后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
          if (window.ENV.wx) {
            console.log(this.$route.query.code)
            let path;
            if (type === 'comment') {
              path = '/message/' + this.$route.params.id
            } else {
              path = '/message/' + this.$route.params.id + '/' + id
            }
            if (!this.$route.query.code) {
              this.getWxAuth({
                payload: {
                  path,
                  query: this.$route.query
                }
              })
            }
            // let url;
            // if (type === "comment") {
            //   url = `${location.protocol}//${
            //         location.hostname
            //       }/message/${id}`;
            // } else {
            //   url = `${location.protocol}//${location.hostname}/message/${
            //         this.$route.params.subjectid
            //       }/${id}`;
            // }
          } else {
            this.gotoMessage(type, id)
          }
        }
      },
      // 前往写留言
      gotoMessage(type, id) {
        if (type === "comment") {
          this.$router.push({
            path: `/message/${id}`
          });
        } else {
          this.$router.push({
            path: `/message/${this.$route.params.id}/${id}`
          });
        }
      },
  
      // 先登录，在下载流程
      downApp() {
        downloadApp()
      },
      support(e, subjectid, commentid, isLike) {
        if (this.isSupport) return
        let params = {
          subjectid: subjectid,
          commentid: commentid,
          flag: isLike
        }
        this.checkIsLike(params)
        e.target.src = "data:image/png;base64,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";
        this.isSupport = true
      }
    }
  };
</script>
 
<style lang="less" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    // background: #F8F8F8;
    // border-top: 1px solid #F8F8F8;
    border-bottom: 20pr solid #f1f1f1;
    .message-board {
      color: #4b4945;
      background: #fff;
      font-size: 32pr;
      line-height: 44pr;
      .board-top {
        padding: 20pr 40pr;
        border-bottom: 1px solid #EAEAEA;
        .write-message {
          float: right;
          color: #507CAF;
        }
      }
      .message-list {
        padding: 30pr 40pr 20pr 40pr;
        .message-info {
          position: relative;
          font-size: 28pr;
          line-height: 40pr;
          .avater {
            width: 72pr;
            height: 72pr;
            border-radius: 72pr;
            background: #fff;
            overflow: hidden;
            >img {
              width: 100%;
            }
          }
          .info-ceil {
            margin-left: 20pr;
            .time {
              font-size: 24pr;
              line-height: 34pr;
              color: #94928E;
            }
          }
          .icon-width {
            display: inline-block;
            width: 30pr;
            height: 28pr;
          }
          .response {
            position: absolute;
            right: 64pr;
            color: #94928E;
            .res-icon {
              background: url('../assets/images/message.png') no-repeat center;
              background-size: cover;
            }
            .res-count {
              margin-left: 10pr;
            }
          }
          .support {
            position: absolute;
            right: 0;
          }
        }
        .message-content {
          font-size: 28pr;
          line-height: 50pr;
          color: #4b4945;
          margin: 20pr 0 20pr 82pr;
        }
        .message-replay {
          padding: 12pr 22pr 10pr 20pr;
          background: #F8F8F8;
          margin-left: 80pr;
          font-size: 28pr;
          .replay-total {
            font-size: 28pr;
            line-height: 40pr;
            color: #507CAF;
            .right-icon {
              display: inline-block;
              margin-left: 10pr;
              width: 10pr;
              height: 17pr;
              background: url('../assets/images/back@2x.png') no-repeat center;
              background-size: cover;
            }
          }
        }
      }
      .more-comment {
        border-top: 1px solid #EAEAEA;
        padding: 20pr 0;
        text-align: center;
        color: #507CAF;
        >span {
          display: inline-block;
          margin-left: 20pr;
          width: 18pr;
          height: 18pr;
          background: url('../assets/images/shape2.png') no-repeat center;
          background-size: cover;
        }
      }
    }
    .no-draft {
      background: #fff;
      padding: 20pr 24pr;
      // margin: 20pr 0;
      font-size: 32pr;
      line-height: 44pr;
      .write {
        float: right;
        color: #507CAF;
      }
    }
  }
</style>


