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
    <focus-alert :show="showAlert" :cid="cid" :cname="cname"></focus-alert>
    <login isFrom="focus" :success="successLogin"></login>
  </section>
</template>

<script>
import baseUrl from '../config'
import { mapState, mapActions, mapMutations } from 'vuex';
import { addUrlParams, down_statistics } from '../utils';
import FocusAlert from './focusAlert.vue'
import Login from './login.vue'
  export default {
    props: {
      cid: {
        type: String,
        default: ''
      },
      cname: {
        type: String,
        default: ''
      }
    },
    components: {
      FocusAlert,
      Login
    },
    data() {
      return {
        showAlert: false,
      };
    },
    computed: {
      ...mapState(['is_follow','isLogin']),
    },
    watch: {
      isLogin: function(newVal, oldVal) {
        console.log('isLogin',newVal );
        if (newVal && this.cid && sessionStorage.userAction == 'focus') {
          this.tjFocus()
        }
      },
      cid: function(newVal, oldVal) {
        console.log('isLogin',newVal );
        if (newVal && this.isLogin && sessionStorage.userAction == 'focus') {
          this.tjFocus()
        }
      }
    },
    methods: {
      ...mapActions('common', ['getFocusState', 'getWxAuth', 'get_focus_stat']),
      ...mapMutations('common', ['show']),
      // 需要登录的操作 先判断后执行
      async tjFocus() {
        let self = this;
        // self.$store.commit("SET_EXTENSION_TEXT", "follow", {root: true});
        // 渲染页面前 先判断cookies token是否存在
        if (Cookies.get("token")) {
          console.log('focus.get_focus_stat');
          this.get_focus_stat({
            payload: {
              communityid: this.cid,
              flag: this.is_follow ? 0 : 1
            },
            after: () => {
              console.log('after');
              sessionStorage.userAction = null;
              self.showAlert = true;
            }
          })
  
        } else if (this.ENV.wx) {
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
          console.log('showLogin');
          this.show();
        }
      },
      successLogin() {
        this.tjFocus();
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