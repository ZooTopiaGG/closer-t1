<template>
  <div class="column">
    <download-bar ref="downloadbar"></download-bar>
    <div class="column-wrap box box-tb box-center-center">
      <div class="cln-icon">
        <img :src="defaultImg" v-lazy="communityLogo">
      </div>
      <div class="cln-name">{{communityShow.name}}</div>
      <div class="cln-text" v-if="communityShow.description">{{communityShow.description}}</div>
      <div class="cln-text" v-else>用心写出有态度，有深度，有高度的文章 <br>请关注我们吧～</div>
      <Focus :communityid="communityid" class="cln-btn"></Focus>
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
    <focus-alert :communityName="communityShow.name" @close="closeAlert" @downApp="downApp"></focus-alert>
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
        communityid: '',
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
      }
    },
    async mounted() {
    console.log('query params:---', this.$route.params)
      if (this.$route.query.code) {
        let params = {
          plateform: 2,
          code: this.$route.query.code,
          protocol: "WEB_SOCKET",
          adid: Cookies.get('h5Adid') || 'closer-t1'
        }
        console.log('params---', params)
        this.getUserInfoWithWx(params)
      }
      this.communityid = this.$route.params.id
      await this.getCommunityShow(this.communityid)
      let groupPrm = {
        communityid: this.communityid,
        page: 1,
        count: 3
      }
      this.$store.dispatch('wx_config');
      this.getGroupList(groupPrm)
      this.getCommunitySubjects({
        communityid: this.communityid
      })
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
      }),
      communityLogo() {
        return this.communityShow.slogo || this.communityShow.blogo
      }
    },
    methods: {
      ...mapMutations('community', [
        'show',
        'hide'
      ]),
      ...mapActions('community', [
        'getCommunityShow',
        'getGroupList',
        'getSubscription'
      ]),
      ...mapActions('common', [
        'getUserInfoWithWx',
        'getCommunitySubjects'
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
      closeAlert() {
        this.hide()
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
        width: 120pr;
        height: 120pr;
        border-radius: 10pr;
        margin-top: 60pr;
        >img {
          width: 100%;
          height: 100%;
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
      // .focus {
      //   background: #E9E9E9;
      // }
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
            height: 100%;
            border-radius: 10pr;
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

