<template>
  <div class="column">
    <download-bar ref="downloadbar"></download-bar>
    <div class="column-wrap box box-tb box-center-center">
      <div class="cln-icon">
        <img :src="defaultImg" v-lazy="communityShow.blogo">
      </div>
      <div class="cln-name">{{communityShow.name}}</div>
      <div class="cln-text" v-if="communityShow.description">{{communityShow.description}}</div>
      <div class="cln-text" v-else>用心写出有态度，有深度，有高度的文章 <br>请关注我们吧～</div>
      <Focus :tjFocus="tjFocus" class="cln-btn"></Focus>
    </div>
    <div class="group-wrap" v-if="groupList.data && groupList.data.length > 0">
      <div class="gr-line1 box box-lr">
        <div class="gr-title">正在招募的群组</div>
        <div class="gr-more" @click="downApp">更多群组 ></div>
      </div>
      <div class="gr-group box box-lr" v-for="(item, index) in groupList.data" :key="index" @click="toGroup(item.id)">
        <div class="gr-left">
          <img v-lazy="fileUrlParse(item.group.avatar)">
        </div>
        <div class="gr-right">
          <div class="gr-name">{{ item.group.name }}</div>
          <div class="gr-text">{{ JSON.parse(item.group.description)[0].content }}</div>
        </div>
      </div>
    </div>
    <div class="nothing-group" v-else>
      <p>本栏目暂不开放招新</p>
      <p>可通过投稿申请建群～</p>
    </div>
    <feed-list ref="feedlist" class="feed-list" :subjectList="hotSubjects"></feed-list>
    <foot-bar></foot-bar>
    <focus-alert :communityName="communityShow.name"></focus-alert>
  </div>
</template>

<script>
  import baseUrl from '../../../config/index'
  import DownloadBar from '../../../components/downloadBar'
  import FeedList from '../../../components/feedList'
  import Focus from '../../../components/focus'
  import FootBar from '../../../components/footBar'
  import FocusAlert from '../../../components/focusAlert'
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    makeFileUrl,
    dateFormat,
    downloadApp
  } from '../../../utils'
  export default {
    name: 'column',
    components: {
      DownloadBar,
      FeedList,
      Focus,
      FootBar,
      FocusAlert
    },
    data() {
      return {
        communityid: '9cvm0OkWDX',
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
      }
    },
    mounted() {
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
      // let communityid = this.$route.params.communityid.
      let communityid = '9cvm0OkWDX'
      this.getCommunityShow(communityid)
      let groupPrm = {
        communityid: communityid,
        page: 1,
        count: 3
      }
      this.getGroupList(groupPrm)
      this.getHotSubjects()
      console.log(this.communityShow)
    },
    computed: {
      ...mapState({
        is_follow: state => state.is_follow
      }),
      ...mapState('community', {
        communityShow: state => state.communityShow,
        groupList: state => state.groupList,
        isFollow: state => state.isFollow
      }),
      ...mapState('common', {
        authSuccess: state => state.authSuccess,
        hotSubjects: state => state.hotSubjects,
      })
    },
    methods: {
      ...mapActions('community', [
        'getCommunityShow',
        'getGroupList',
        'getSubscription'
      ]),
      ...mapActions('common', [
        'get_focus_stat',
        'getWxAuth',
        'getUserInfoWithWx',
        'getHotSubjects'
      ]),
      downApp() {
        downloadApp()
      },
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      // 跳转到群组
      toGroup(id) {
        this.$router.push({
          path: `/group/${id}`
        });
      },
      // 需要登录的操作 先判断后执行
      async tjFocus() {
        this.$store.commit("SET_FOCUS_STAT", "true", {
          root: true
        });
        console.log('is_follow', this.is_follow)
        // 渲染页面前 先判断cookies token是否存在
        if (Cookies.get("user")) {
          // 进行其他 ajax 操作
          let descPrm = {
            communityid: this.communityid,
            flag: this.$store.state.is_follow ? 0 : 1 // 0-取消关注 1-关注
          }
          this.getSubscription(descPrm)

        } else {
          // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
          if (ENV.wx) {
            // 通过微信授权 获取code
            let path = '/community/' + this.$route.params.id
            let _path = baseUrl.wxAuthorization + baseUrl.href + path + '?params=' + encodeURIComponent(JSON.stringify(this.$route.query))
            let para = {
              path: _path
            }
            console.log('para---', para)
            if (!this.$route.query.code) {
              this.getWxAuth(para)
            }
          } else {
            this.$store.commit("GET_LOGIN_TYPE", "toFocus", {
              root: true
            });
            this.$store.commit("SET_VISIBLE_LOGIN", true, {
              root: true
            });
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @color: #4B4945;
  @bgColor: #fff;
  .column {
    background: #F5F5F5;
    .column-wrap {
      width: 100%;
      padding-bottom: 60pr;
      background: @bgColor;
      .cln-icon {
        width: 142pr;
        height: 60pr;
        border-radius: 10pr;
        margin-top: 60pr;
        >img {
          width: 100%;
          overflow: hidden;
          border-radius: 10pr;
        }
      }
      .cln-name {
        font-size: 36pr;
        font-weight: 500;
        line-height: 50pr;
        letter-spacing: 1pr;
        color: @color;
        margin-top: 20pr;
      }
      .cln-text {
        margin-top: 40pr;
        color: #94928E;
        font-size: 32pr;
        line-height: 60pr;
        text-align: center;
      }
      .cln-btn {
        margin-top: 60pr;
      }
      .btn-commen {
        width: 240pr;
        height: 80pr;
        line-height: 80pr;
        border-radius: 10pr;
        font-size: 36pr;
        text-align: center;
        color: @color;
        margin-top: 60pr;
      }
      .focus {
        background: #E9E9E9;
      }
      .unfocus {
        background: #FDDB00;
      }
    }
    .group-wrap {
      background: @bgColor;
      margin-top: 20pr;
      padding: 30pr 40pr;
      .gr-line1 {
        position: relative;
        height: 50pr;
        line-height: 50pr;
        .gr-title {
          font-size: 36pr;
          color: @color;
        }
        .gr-more {
          position: absolute;
          top: 0;
          right: 0;
          color: #94928E;
          font-size: 28pr;
        }
      }
      .gr-group {
        margin-top: 30pr;
        padding-bottom: 30pr;
        .gr-left {
          width: 108pr;
          height: 108pr;
          border-radius: 10pr;
          >img {
            width: 100%;
            overflow: hidden;
          }
        }
        .gr-right {
          margin-left: 20pr;
          .gr-name {
            font-size: 32pr;
            line-height: 44pr;
            color: @color;
          }
          .gr-text {
            margin-top: 10pr;
            color: #94928E;
            font-size: 28pr;
            line-height: 40pr;
          }
        }
      }
    }
    .nothing-group {
      font-size: 32pr;
      color: #808080;
      text-align: center;
      padding: 40pr;
    }
    .feed-list {
      margin-top: 20pr;
    }
  }
</style>

