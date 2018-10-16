<template>
  <section class="focus-bar" v-if="!ENV.app">
    <section class="focus-wrap">
      <t-community></t-community>
      <t-focus :tjFocus="tjFocus"></t-focus>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import tCommunity from "./community";
import tFocus from "./focus";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  components: {
    tCommunity,
    tFocus
  },
  methods: {
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "follow", {root: true});
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        let result = await self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.res.communityid,
          flag: self.$store.state.is_follow ? 0 : 1
        });
        if (result) {
          self.$store.commit("SHOW_ALERT", true, {root: true});
        }
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if (self.$store.state.IS_WX) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}${
              self.$route.fullPath
            }`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toFocus", {root: true});
          self.$store.commit("SET_VISIBLE_LOGIN", true, {root: true});
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #495060;
  .focus-bar {
    margin-top: 30pr;
    .focus-wrap {
      display: flex;
      justify-content: space-between;
    }
  }
@media screen and (min-width: 681px) {
  .feeder-cover {
    display: none;
  }
}
</style>