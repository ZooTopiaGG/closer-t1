<template>
  <div class="draft-wrapper">
    <div class="message-board" v-if="messagelist.length > 0">
      <div class="board-top">
        <span class="title" id="title">精彩留言</span>
        <span class="write-message" @click="writeMessage('comment', $route.params.sid)">写留言</span>
      </div>
      <div class="message-list" v-for="(item, index) in messagelist" :key="index">
        <div class="message-info box box-lr">
          <div class="avater" v-if="item.user">
            <img v-lazy="fileUrlParse(item.user.attributes.roster.avatar) || fileUrlParse(item.user.avatar)" alt="">
          </div>
          <div class="info-ceil box box-tb">
            <span class="name">{{ item.user.attributes.roster.name || item.user.fullname }}</span>
            <span class="time">{{formate(new Date(item.long_create_time))}}</span>
          </div>
          <!-- 回复补丁 -->
          <div class="response box box-lr box-center-center" @click="writeMessage('reply', item.commentid)">
            <span class="res-icon icon-width"></span>
            <span class="res-count">{{ item.replyNumber }}</span>
          </div>
          <!-- 点赞补丁 -->
          <div class="support">
            <span class="support-icon icon-width"></span>
          </div>
        </div>
        <!-- 回复内容 -->
        <div class="message-content">
          {{ item.content }}
        </div>
        <div class="message-replay" v-if="item.replyNumber > 0">
          <div class="replay" v-for="(commentItem, commentIndex) in item.sonList" v-if=" commentIndex <= 3" :key="commentIndex">
            <span>{{ commentItem.user.fullname }}：</span>
            <span class="replay-content">{{ commentItem.content }}</span>
          </div>
          <div class="replay-total" v-if="item.replyNumber > 3">
            <span>共{{ item.replyNumber }}条回复</span>
            <span class="right-icon"></span>
          </div>
        </div>
      </div>
      <div class="more-comment" @click="login">点击查看更多评论<span></span></div>
    </div>
    <div class="no-draft" v-else>
      <span class="text">暂无留言，赶紧留言吧~</span>
      <span class="write" @click="writeMessage('comment', $route.params.sid)">写留言</span>
    </div>
    <login-pop ref="login"></login-pop>
  </div>
</template>

<script>
  import LoginPop from '../../../components/login/index.vue'
  import {
    mapState,
    mapActions
  } from 'vuex';
  import {
    makeFileUrl,
    formatDate,
    isWeiXin
  } from '../../../utils'
  export default {
    name: 'draft',
    components: {
      LoginPop
    },
    data() {
      return {
        pagenum: 1,
        pagesize: 5
      }
    },
    mounted() {
      if (this.$route.params.sid) {
        this.getCommentsList({
          "subjectid": this.$route.params.sid,
          "pagenum": this.pagenum,
          "pagesize": this.pagesize
        })
      }
    },
    computed: {
      ...mapState("draft", {
        messagelist: state => state.messagelist
      })
    },
    methods: {
      ...mapActions("draft", [
        "getCommentsList"
      ]),
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      formate(date) {
        return formatDate(date)
      },
      writeMessage(type, id) {
        // 渲染页面前 先判断cookies user是否存在
        if (Cookies.get("user")) {
          self.gotoMessage(type, id);
        } else {
          // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
          if (isWeiXin()) {
            let url;
            if (type === "comment") {
              url = `${location.protocol}//${
                  location.hostname
                }/message/${id}`;
            } else {
              url = `${location.protocol}//${location.hostname}/message/${
                  this.$route.params.sid
                }/${id}`;
            }
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
            path: `/message/${this.$route.params.sid}/${id}`
          });
        }
      },
      login() {
        this.$refs.login.open()
      }
    }
  };
</script>
 
<style lang="less" scoped>
  .draft-wrapper {
    width: 100%;
    height: 100%;
    background: #F8F8F8;
    border-top: 1px solid #F8F8F8;
    .message-board {
      color: #4b4945;
      background: #fff;
      font-size: 32pr;
      line-height: 44pr;
      .board-top {
        // position: relative;
        padding: 20pr 40pr;
        border-bottom: 1px solid #EAEAEA;
        .write-message {
          float: right;
          // position: absolute;
          // right: 0;
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
            .support-icon {
              margin-top: 5pr;
              background: url('../assets/images/home_btn_like_n@2x.png') no-repeat center;
              background-size: cover;
            }
            .support-checked {
              position: absolute;
              right: 0;
              background: url('../assets/images/home_btn_like_pre@2x.png') no-repeat center;
              background-size: cover;
            }
          }
        }
        .message-content {
          font-size: 36pr;
          line-height: 50pr;
          color: #4b4945;
          margin: 20pr 0 20pr 82pr;
        }
        .message-replay {
          padding: 12pr 22pr 10pr 20pr;
          background: #F8F8F8;
          margin-left: 80pr;
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
          background: url('../assets/images/Shape2@2x.png') no-repeat center;
          background-size: cover;
        }
      }
    }
    .no-draft {
      background: #fff;
      padding: 20pr 40pr;
      margin: 20pr 0;
      font-size: 32pr;
      line-height: 44pr;
      .write {
        float: right;
        color: #507CAF;
      }
    }
  }
</style>


