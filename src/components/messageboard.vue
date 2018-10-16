<template>
  <div class="wrapper" v-if="!ENV.app&&messagelist">
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
            <span class="time">{{formate(new Date(item.long_create_time), 'time')}}</span>
          </div>
          <!-- 回复补丁 -->
          <div class="response box box-lr box-center-center" @click="writeMessage('reply', item.commentid)">
            <span class="res-icon icon-width"></span>
            <span class="res-count">{{ item.replyNumber }}</span>
          </div>
          <!-- 点赞补丁 -->
          <div class="support" @click="support($event, item.subjectid, item.commentid, item.like)">
            <img class="support icon-width" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC">
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
          <div class="replay-total" v-if="item.replyNumber > 3" @click="getMoreComment">
            <span>共{{ item.replyNumber }}条回复</span>
            <span class="right-icon"></span>
          </div>
        </div>
      </div>
      <div class="more-comment" @click="getMoreComment">点击查看更多评论<span></span></div>
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
    downloadApp
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
      if (this.$route.query.code) {
        let params = {
          plateform: 2,
          code: this.$route.query.code,
          protocol: "WEB_SOCKET",
          adid: Cookies.get('h5Adid') || 'closer-share'
        }
        console.log('params---', params)
        this.getUserInfoWithWx(params)
      }
    },
    computed: {
      ...mapState('article', [
        'res'
      ]),
      ...mapState('article', {
        content: state => state.content
      }),
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
      formate(date, time) {
        return dateFormat(date, time)
      },
      writeMessage(type, id) {
        // 渲染页面前 先判断cookies user是否存在
        console.log('Cookies--', Cookies.get("GroukAuth"))
        if (this.res.int_type === 2) {
          window.sessionStorage.setItem("title", this.res.title);
        } else {
          window.sessionStorage.setItem("title", this.content.text);
        }
        if (Cookies.get("user")) {
          this.gotoMessage(type, id);
        } else {
          // this.$refs.login.open()
          // 前期 仅微信后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
          if (window.ENV.wx) {

            console.log(this.$route.query.code)
            let path = '/draft/' + this.$route.params.id
            let _path = baseUrl.wxAuthorization + baseUrl.href + path + '?params=' + encodeURIComponent(JSON.stringify(this.$route.query))
            let para = {
              path: _path
            }
            console.log('para---', para)
  
            if (!this.$route.query.code) {
              this.getWxAuth(para)
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
      getMoreComment() {
        this.downApp()
      },
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
        e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==";
        this.isSupport = true
      }
    }
  };
</script>
 
<style lang="less" scoped>
  .wrapper {
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
            // border: 1px solid red;
          }
          .response {
            position: absolute;
            right: 64pr;
            color: #94928E;
            .res-icon {
              background: url('../pages/draft/assets/images/message.png') no-repeat center;
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
              background: url('../pages/draft/assets/images/back@2x.png') no-repeat center;
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
          background: url('../pages/draft/assets/images/Shape2@2x.png') no-repeat center;
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


