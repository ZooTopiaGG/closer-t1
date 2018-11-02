<template>
  <div class="group">
    <div v-if="!showDownload">
      <downloadBar></downloadBar>
      <div class="member" v-if="group.group_info&&group.group_user_count">
          <div class="title">群组成员 {{group.group_user_count}}</div>
          <ul class="member-icons">
            <li class="head">
              <img v-lazy="fileUrlParse(group.group_info.group.attributes.monitor.user.avatar)" class="icon">
              <p class="owner">
                <span>群主</span>
              </p>
              <div class="name">{{group.group_info.group.attributes.monitor.user.fullname}}</div>
            </li>
            <li class="head" v-for="(item,index) in group.group_user_info" :key="index" v-if="index<4">
              <img v-lazy="fileUrlParse(item.props.roster.avatar)" class="icon">
              <div class="name">{{item.props.roster.name}}</div>
            </li>
          </ul>
          <div class="more-member" v-if="group.group_user_count>5" @click="moreMember">查看更多群成员<i class="arrow"></i></div>
        </div>
      <div class="description" v-if="group.group_info && description()">
        <div class="desc">群简介</div>
        <div class="desc-content">{{ description() }}</div>
      </div>
      <div class="topic" v-if="group.group_info && announcement()">
          <div class="current-topic">当前话题 <i class="arrow-right"></i>
          </div>
          <div class="topic-content">{{announcement()}}</div>
      </div>
      <div class="split-box"></div>
      <div class="group-info" v-if="groupFeedList&&groupFeedList.length>0" @click="toCommunity(group.group_info.communityid)">
        <span class="title">所属贴近号</span>
        <img class="icon" v-lazy="groupFeedList[0].blogo" />
        <span class="name">{{groupFeedList[0].communityName}}</span>
        <i class="arrow-right right"></i>
      </div>
      <div class="split-box"></div>
      <feedlist :subjectList="groupFeedList" :title="groupFeedTitle"></feedlist>
      <div class="group-ft">
        <div class="group-btn" @click="handleJoinGroup">
          <spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></spinner>
          <span>进入群组</span></div>
      </div>
    </div>
    <div v-else class="group-dl">
      <div class="dl-hd">
        <div class="hd-succ"></div>
        <p class="hd-msg">{{msg}}</p>
      </div>
      <div class="dl-bd">
        <div class="bd-img"></div>
        <p class="bd-tip">新用户请下载app，并以微信登录</p>
      </div>
      <div class="dl-ft">
        <div class="ft-logo"></div>
        <div class="ft-content">
          <div class="ft-title">下载「贴近」客户端</div>
          <div class="ft-desc">贴近一点 看身边</div>
        </div>
        <div @click="handleDownload" class="ft-btn">立即前往</div>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadBar from "../../components/downloadBar";
import Feedlist from "../../components/feedList";
import { addUrlParams, downloadApp } from "../../utils";
import { makeFileUrl, down_statistics } from "../../utils";
import { mapState, mapActions } from "vuex";
import { Spinner } from 'mint-ui';
export default {
  components: {
    DownloadBar,
    Feedlist,
    Spinner
  },
  data() {
    return {
      loading: 2,
      showDownload: false,
      msg: '恭喜，您已成功入群'
    }
  },
  computed: {
    ...mapState("group", {
      group: state => state.group,
      groupFeedList: state => state.groupFeedList,
      groupFeedTitle: state => state.groupFeedTitle
    })
  },
  async beforeMount() {
    if (this.$route.params.id) {
      await this.getGroupInfo({
        groupId: this.$route.params.id
      });
      this.$store.dispatch("wx_config");
      let params = {
        flag: 1,
        classid: this.$route.params.id,
        index: "",
        pagesize: 5
      };
      this.getGroupList(params);
    }
    if (this.$route.query.code) {
      let params = {
        plateform: 2,
        code: this.$route.query.code,
        protocol: "WEB_SOCKET",
        adid: Cookies.get("h5Adid") || "closer-t1"
      };
      console.log("params---", params);
      await this.getUserInfoWithWx(params);
      if (sessionStorage.userAction == 'group') {
        this.handleJoinGroup();
        sessionStorage.userAction = null;
      }
    }
  },
  methods: {
    ...mapActions("common", ["getWxAuth", "getUserInfoWithWx"]),
    ...mapActions("group", ["getGroupInfo", "getGroupList", 'joinGroup']),
    fileUrlParse(url, type, size) {
      return makeFileUrl(url, type, size);
    },
    description() {
      try {
        return JSON.parse(
          this.$store.state.group.group.group_info.group.description
        )[0].content;
      } catch (e) {
        return this.$store.state.group.group.group_info.group.description;
      }
    },
    announcement() {
      try {
        return JSON.parse(
          this.$store.state.group.group.group_info.announcement
        )[0].content;
      } catch (e) {
        return this.$store.group.group.state.group.group_info.announcement;
      }
    },
    async moreMember() {
      this.$store.commit("SET_EXTENSION_TEXT", "more_group_member");
      // 渲染页面前 先判断cookies token是否存在
      if (Cookies.get("token")) {
        this.downloadApp();
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if (ENV.wx) {
          // 通过微信授权 获取code
          this.getWxAuth({
            payload: {
              path: this.$route.path, 
              query: this.$route.query
            }
          });
        } else {
          this.$store.commit("GET_LOGIN_TYPE", "toDown");
          this.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    async downloadApp(e, str, id) {
      down_statistics({
        store: this.$store,
        route: this.$route,
        str: str,
        defaultStr: "more_group_member"
      });
    },
    toCommunity(cid) {
      this.$router.push({
        path: `/community/${cid}`
      });
    },
    async handleJoinGroup() {
      let self = this;
      if (self.loading == 1) return;
      self.loading = 1;
      // 渲染页面前 先判断cookies token是否存在

      if (Cookies.get("token")) {
        console.log('token')
        let res = await this.joinGroup({
          classid: self.$route.params.id,
          join_limit: self.group.group_info.join_limit
        })
        self.loading = 2;
        if (res) {
          self.showDownload = true;
          self.group.group_info.join_limit == 1 & (self.msg =  '您的入群申请已提交~');
          setTimeout(downloadApp, 2e3);
        } else {
          downloadApp();
        }
      } else {
        console.log('else')
        if (self.ENV.wx) {
          self.getWxAuth({
            payload: {
              path: self.$route.path, 
              query: self.$route.query
            },
            before: () => {
              sessionStorage.userAction = 'group';
            }
          })
        } else {
          downloadApp();
        }
      }
    },
    handleDownload() {
      downloadApp();
    }
  }
};
</script>

<style lang="less" scoped>
.group {
  .member {
    padding: 40pr;
    .title {
      font-weight: 600;
      line-height: 1.7;
      font-size: 16px;
      margin-bottom: 40pr;
    }
    .member-icons {
      display: flex;
      width: 670pr;
      flex-direction: row;
      .head {
        margin-right: 16pr;
        position: relative;
        text-align: center;
        width: 124pr;
        .icon {
          width: 100pr;
          height: 100pr;
          border-radius: 100pr;
          margin-bottom: 10pr;
        }
        .owner {
          width: 80pr;
          height: 80pr;
          background: url("../../assets/images/group_icon_tag.png") no-repeat;
          background-size: cover;
          position: absolute;
          top: -14pr;
          left: -14pr;
          text-align: center;
          span {
            margin-top: 26pr;
            font-size: 22pr;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            color: #fff;
            display: block;
          }
        }
        .name {
          font-size: 28pr;
          color: #4b4945;
          text-align: center;
          width: 96%;
          height: 40pr;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .more-member {
      margin: 40pr 0 40pr 0;
      text-align: center;
      color: #507caf;
      font-size: 14px;
      .arrow {
        display: inline-block;
        width: 18pr;
        height: 18pr;
        background: url("../../assets/images/group_down_arrow.png") no-repeat;
        background-size: cover;
        margin-left: 6pr;
      }
    }
  }
  .arrow-right {
    margin-top: 14pr;
    float: right;
    display: inline-block;
    width: 10pr;
    height: 24pr;
    background: url("../../assets/images/back.png") no-repeat;
    background-size: cover;
  }
  .description {
    .desc {
      margin: 20pr 40pr 20pr 40pr;
      font-size: 32pr;
      font-weight: 600;
      position: relative;
    }
    .desc-content {
      padding: 0 40pr 0 40pr;
      margin-bottom: 40pr;
      font-size: 28pr;
      color: #94928e;
      max-height: 120pr;
      // 超出省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  .topic {
    .current-topic {
      margin: 20pr 40pr 20pr 40pr;
      font-size: 32pr;
      font-weight: 600;
      position: relative;
    }
    .topic-content {
      padding: 0 40pr 0 40pr;
      margin-bottom: 40pr;
      font-size: 28pr;
      color: #94928e;
    }
  }
  .split-box {
    width: 100%;
    height: 20pr;
    background: #f4f4f4;
  }
  .group-info {
    position: relative;
    margin: 48pr 40pr 48pr 40pr;
    color: #4b4945;
    display: flex;
    flex-direction: row;
    align-items: center;
    .title {
      font-weight: 600;
      margin-right: 150pr;
    }
    .icon {
      width: 142pr;
      height: 60pr;
      border-radius: 10pr;
      margin-right: 20pr;
    }
    .name {
      display: inline-block;
      font-size: 28pr;
      max-width: 180pr;
      max-height: 40pr;
      margin-right: 10pr;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .right {
      position: absolute;
      top: 4pr;
      right: 0;
    }
  }
  &-ft {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15pr 24pr;
    background: #fff;
  }
  &-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10pr;
    font-size: 32pr;
    height: 80pr;
    line-height: 80pr;
    text-align: center;
    background: #FDDB00;
    color: #4B4945;
  }
  &-dl {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;
  }
  .hd-succ {
    width: 156pr;
    height: 156pr;
    margin: 0 auto 40pr;
    background: url(../../assets/images/group-succ.png) center no-repeat;
    background-size: 156pr 156pr;
  }
  .hd-msg {
    text-align: center;
    font-size: 36pr;
    color: #495060;
  }
  .bd-img {
    width: 670pr;
    height: 152pr;
    margin: 0 auto 20pr;
    background: url(../../assets/images/group-bg.png) center no-repeat;
    background-size: 670pr 152pr;
  }
  .bd-tip {
    text-align: center;
    font-size: 28pr;
    color: #495060;
  }
  .dl-ft {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 630pr;
    height: 160pr;
    border-radius: 12pr;
    background: #f6f6f6;
    color: #4b4945;
    .ft-logo {
      width: 90pr;
      height: 90pr;
      background: url(../../assets/images/logo.png) center no-repeat;
      background-size: 90pr 90pr;
    }

    .ft-content {

    }
    .ft-title {
      font-size: 28pr;
    }
    .ft-desc {
      font-size: 20pr;
      color: #999;
    }

    .ft-btn {
      border-radius: 12pr;
      background-color: #fddb00;
      padding: 12pr 16pr;
      font-size: 28pr;
    }
  }
}
</style>
