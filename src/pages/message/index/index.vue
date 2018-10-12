<template>
  <div class="write-message">
    <div class="title">你还在追“小升初”的时候，成都有妈妈提前下手“五升六了”</div>
    <div class="message-area">
      <textarea name="textarea" class="mint-field" placeholder="发表你的意见吧～" v-model="textarea"></textarea>
    </div>
    <div class="btn-box">
      <div type="primary" @click="toMessage">留 言</div>
    </div>
    <login-pop ref="login"></login-pop>
    <message-success ref="messageSuccess"></message-success>
  </div>
</template>

<script>
  import {
    Toast
  } from "mint-ui"
  import LoginPop from '../../../components/login.vue'
  import MessageSuccess from '../../../components/messageSuccess.vue'
  import Vue from "vue"
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  export default {
    components: {
      Toast,
      LoginPop,
      MessageSuccess
    },
    data() {
      return {
        textarea: "",
      }
    },
    created() {
      document.title = '贴近 - TieJin.cn'
      if (Cookies.get("udid")) {
  
      } else {
        this.getAdCookie({
          webUdid: true
        })
      }
    },
    computed: {
      ...mapState("message", {
        addReply: state => state.replyData
      })
    },
    mounted() {
      console.log(this.$route.params)
    },
    methods: {
      ...mapActions("message", [
        "addReplyData",
        "getAdCookie"
      ]),
      toMessage() {
        if (!this.textarea) {
          Toast('内容不能为空！')
          return
        }
        // 渲染页面前 先判断cookies user是否存在
        console.log('user: ', JSON.parse(Cookies.get('user')))
        if (Cookies.get('user')) {
          let userInfo = JSON.parse(Cookies.get('user'))
          if (userInfo.phones) {
            let params
            let lastid = this.$route.params.id
            if (lastid) {
              params = {
                subjectid: this.$route.params.sid,
                content: this.textarea,
                lastid: lastid
              }
            } else {
              params = {
                subjectid: this.$route.params.sid,
                content: this.textarea
              }
            }
            this.addReplyData(params)
          } else {
            this.$refs.login.open()
          }
        } else {
          this.$refs.login.open()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .write-message {
    background: #fff;
    padding: 40pr;
    font-size: 36pr;
    line-height: 50pr;
    color: #4B4945;
    .message-area {
      background: #F8F8F8;
      width: 100%;
      height: 268pr;
      margin-top: 40pr;
      .mint-field {
        width: 100%;
        height: 268pr;
        background: #F8F8F8;
        padding: 20pr;
        font-size: 28pr;
      }
    }
    .btn-box {
      width: 100%;
      margin-top: 60pr;
      background: #FDDB00;
      border-radius: 10pr;
      padding: 18pr;
      font-size: 32pr;
      text-align: center;
    }
  }
</style>

