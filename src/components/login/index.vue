<template>
  <div class="pop-bg box box-center-center" v-if="showLogin">
    <div class="appuse-pop">
      <!-- <mt-popup v-model="visible" class="appuse-pop" :closeOnClickModal="closeOnClickModal"> -->
      <div class="close-icon" @click="close"></div>
      <div class="pop-header">
        <div class="text">客官，根据国家法律，发表文字评论必须填写手机号，所以拜托啦~</div>
      </div>
      <div class="pop-content">
        <div class="phone-num">
          <input class="phone" type="number" placeholder="手机号" maxlength="11" v-model="phoneNum" />
        </div>
        <div class="sms-code">
          <input class="code" type="text" placeholder="验证码" maxlength="6" v-model="code" />
          <span class="code-btn" id="code-btn" @click="getSmsCode(phoneNum)">发送验证码</span>
        </div>
      </div>
  
      <div id="captcha"></div>
      <!-- 验证码容器元素 -->
  
      <div class="pop-footer">
        <div class="confirm-btn" @click="login({phone: phoneNum, token: code})">登录/注册</div>
      </div>
    </div>
  </div>
  <!-- </mt-popup> -->
</template>

<script>
  import Vue from "vue";
  import {
    mapState,
    mapActions
  } from 'vuex';
  import {
    Popup,
    Toast
  } from "mint-ui";
  import {
    isApp
  } from '../../utils';
  // import func from './vue-temp/vue-editor-bridge';
  Vue.component(Popup.name, Popup);
  
  export default {
    name: "pop",
    components: {
      Toast
    },
    props: {
      className: String,
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      showLogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isApp: this.$store.state.IS_APP,
        visible: false,
        phoneNum: '12000000021',
        code: '',
        captchaIns: ''
      };
    },
    beforeMount() {
      if (this.isApp) {
  
      } else {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "https://cstaticdun.126.net/load.min.js");
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },
    mounted() {

    },
    computed: {
      ...mapState("login", {
        smsCode: state => state.smsCode
      })
    },
    methods: {
      ...mapActions("login", [
        "getCode",
        "login"
      ]),
      open() {
        this.showLogin = true;
      },
      close() {
        this.showLogin = false;
      },
      userLogin() {
        let params = {
          phone: this.phoneNum,
          token: this.code
        }
      },
      getSmsCode(phone) {
        console.log('getcode', phone)
        let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (!phone) {
          Toast('请输入手机号')
          return
        }
        if (!phoneReg.test(phone)) {
          Toast('请输入正确格式的手机号')
          return
        }
        this.getImgCode()
      },
      getImgCode() {
        initNECaptcha({
            element: "#captcha",
            captchaId: "9bff9612504c4b0f9bd9d63b142dd43e",
            // mode: "bind", // 仅智能无感知验证码时，mode 才能设置为 bind
            width: "320px",
            onVerify: (err, data) => {
              console.log('verify', data)
              // 用户验证码验证成功后，进行实际的提交行为
              if (data) {
                let params = {
                  phone: this.phoneNum,
                  captchaValidate: data.validate
                }
                this.getCode(params)
              }
            }
          },
          (instance) => {
            instance.popUp()
          },
          (err) => {
            console.log('err--', err)
            // 初始化失败后触发该函数，err对象描述当前错误信息
          }
        );
      }
    }
  };
</script>

<style lang="less" scoped>
  .pop-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
    .appuse-pop {
      position: relative;
      margin: auto;
      width: 588pr;
      border-radius: 10pr;
      background: #fff;
      text-align: center;
      padding: 40pr;
      color: #4b4945;
      .close-icon {
        position: absolute;
        right: 20pr;
        top: 20pr;
        width: 28pr;
        height: 28pr;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 28pr;
          background-color: #9b9b9b;
        }
        &::before {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        &::after {
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
      .pop-header {
        margin-top: 20pr;
        font-size: 30pr;
        line-height: 40pr;
      }
      .pop-content {
        margin-top: 40pr;
        >div {
          border-bottom: 1px solid #F3F3F3;
          height: 80pr;
          line-height: 90pr;
          >input {
            outline: none;
            font-size: 32pr;
          }
          .phone {
            width: 100%;
          }
        }
        .sms-code {
          position: relative;
          margin-top: 20pr;
          >span {
            position: absolute;
            right: 0;
            display: inline-block;
            font-size: 24pr;
            height: 52pr;
            line-height: 52pr;
            padding: 0 16pr;
            margin-top: 15pr;
            border: 1px solid #D8D8D8;
            border-radius: 10pr;
          }
        }
        .code {
          width: 60%;
          margin-left: -204pr;
        }
      }
      .pop-footer {
        margin-top: 60pr;
        font-size: 28pr;
        line-height: 40pr;
        color: #4b4945;
        .confirm-btn {
          width: 100%;
          background: #fddb00;
          border-radius: 10pr;
          padding: 18pr 0;
        }
      }
    }
  }
</style>
