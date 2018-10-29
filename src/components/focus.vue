<template>
  <section class="focus" v-if="!ENV.app">
    <section v-if="is_follow" class="focus-btn-disabled"></section>
    <section @click="tjFocus">
      <section class="focus-community" v-if="$route.path.indexOf('community') > -1">
        <section class="yet-focus" v-if="is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus" v-else>
          <span>关注栏目</span>
        </section>
      </section>
      <section class="other" v-else>
        <section class="yet-focus" v-if="is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus" v-else>
          <span>关注</span>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { addUrlParams, downloadApp } from '../utils';
  export default {
    props: {
      communityid: {
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['is_follow']),
      ...mapState('article', ['res']),
      ...mapState('common', ['isLogin'])
    },
    watch: {
      isLogin: function(newVal, oldVal) {
        if (newVal && sessionStorage.userAction == 'focus') {
          this.tjFocus()
        }
      },
      communityid: function(newVal) {
        if (newVal) {
          this.getFocusState(newVal)
        }
      }
    },
    methods: {
      ...mapActions('common', ['getFocusState', 'getWxAuth', 'get_focus_stat']),
      // 需要登录的操作 先判断后执行
      async tjFocus() {
        // self.$store.commit("SET_EXTENSION_TEXT", "follow", {root: true});
        // 渲染页面前 先判断cookies token是否存在
        if (Cookies.get("token")) {
          // 进行其他 ajax 操作
          // let result = await self.$store.dispatch("get_focus_stat", {
          //   communityid: self.$store.state.res.communityid,
          //   flag: self.$store.state.is_follow ? 0 : 1
          // });
          // if (result) {
          //   self.$store.commit("SHOW_ALERT", true, {root: true});
          // }
          this.get_focus_stat({
            payload: {
              communityid: this.res.communityid ? this.res.communityid : this.communityid,
              flag: this.is_follow ? 0 : 1
            },
            after: () => {
              sessionStorage.userAction = null;
            }
          })

        } else {
          // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
          if (this.ENV.wx) {
            // 通过微信授权 获取code
            // await self.$store.dispatch("get_wx_auth", {
            //   // 正式
            //   url: `${location.protocol}//${location.hostname}${
            //     self.$route.fullPath
            //   }`
            // });
            this.getWxAuth({
              payload: {
                path: this.$route.path, 
                query: this.$route.query
              },
              before: () => {
                sessionStorage.userAction = 'focus';
              }
            })
          } else {
            downloadApp();
          }
        }
      }
    },
    mounted() {
      
    }
  };
</script>

<style scoped lang="less">
  @m20: 20pr;
  @primarycolor: #fddb00;
  @defaultcolor: #e9e9e9;
  @textcolor: #4b4945;
  .focus {
    color: #507caf;
    font-size: 32pr;
    position: relative;
    .other {
      border: 1px solid #dcdcdc;
      border-radius: 10pr;
      padding: 10pr 25pr;
      .no-focus::before {
        content: '+';
        position: relative;
        top: -2pr;
        margin-right: 6pr;
      }
    }
    .focus-btn-disabled {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background: rgba(0, 0, 0, 0);
    }
    .focus-community {
      color: @textcolor;
      font-size: 36pr;
      text-align: center;
      section {
        padding: 1.8667vw 5.8667vw;
        border-radius: 10pr;
        box-sizing: border-box;
        >span {
          min-width: 19.2vw;
          text-align: center;
        }
      }
      .no-focus {
        background: @primarycolor;
      }
      .yet-focus {
        background: @defaultcolor;
      }
    }
  }
</style>