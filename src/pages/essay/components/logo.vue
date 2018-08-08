<template>
  <section class="feeder-cover flex flex-align-center flex-pack-justify" v-if="$store.state.essay.GET_MESSAGE_STATE">
    <section class="flex flex-1 flex-align-center">
      <user-logo class="feed-logo"></user-logo>
      <span class="communityName ellipsis" v-if="$store.state.essay.res.communityName">{{ $store.state.essay.res.communityName }}</span>
      <span class="communityName ellipsis" v-else>{{ $store.state.essay.res.name }}</span>
    </section>
    <user-focus :tjFocus="tjFocus"></user-focus>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import userfocus from "./focus";
import userLogo from "./userLogo";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  components: {
    userfocus,
    userLogo
  },
  methods: {
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "follow");
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        let result = await self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.essay.res.communityid,
          flag: self.$store.state.essay.is_follow ? 0 : 1
        });
        if (result) {
          self.$store.commit("SHOW_ALERT", true);
        }
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}${
              self.$route.fullPath
            }`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toFocus");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #495060;
.feeder-cover {
  padding: 5.3vw 4vw 0;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: -1px;
  .access-not {
    width: 13.87vw;
    height: 5.87vw;
    margin-right: 2.67vw;
    border-radius: 5px;
  }
  .communityName {
    max-width: 45vw;
    color: @textcolor;
    font-size: 14px;
    height: 19px;
    overflow-y: hidden;
  }
  .focus {
    color: #507caf;
    font-size: 16px;
    padding-right: 1.35vw;
  }
}
@media screen and (min-width: 681px) {
  .feeder-cover {
    display: none;
  }
}
</style>