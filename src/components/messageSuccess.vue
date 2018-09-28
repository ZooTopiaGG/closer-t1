<template>
<mt-popup v-model="visible2" class="success-pop" :closeOnClickModal="closeOnClickModal">
    <div class="box box-tb box-center-center">
      <div class="close-icon" @click="close"></div>
      <div class="pop-header">
        <div class="text">恭喜你！留言成功</div>
        <div class="text">快去app看看其他精彩留言吧~~</div>
      </div>
  
      <div class="pop-footer box box-lr">
        <div class="wait-btn" @click="goBack">再等等</div>
        <div class="confirm-btn" @click="downApp">好的</div>
      </div>
    </div>
  </mt-popup>
  
</template>

<script>
  import Vue from "vue";
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex';
  import {
    Popup,
    Toast
  } from "mint-ui";
  import {
    downloadApp
  } from '../utils'
  Vue.component(Popup.name, Popup);
  
  export default {
    name: "successpop",
    components: {
      Toast
    },
    props: {
      className: String,
      closeOnClickModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isApp: window.ENV.app,
        visible2: false
      };
    },
    beforeMount() {

    },
    mounted() {
      console.log('params---', this.$route.params)
    },
    watch: {
      visible(val) {
        this.visible2 = val
      }
    },
    computed: {
      ...mapState("message", {
        visible: state => state.visible
      }),
      
      ...mapState("message", {
        visible: state => state.visible
      })
    },
    methods: {
      ...mapMutations("message", [
        'show', 'hide'
      ]),
      open() {
        this.show()
      },
      close() {
        this.hide()
      },
      downApp() {
        downloadApp()
      },
      goBack() {
        let subjectid = this.$route.params.sid
        this.$router.push({
          path: `/draft/${subjectid}`
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .success-pop {
    width: 654pr;
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
      font-size: 36pr;
      line-height: 50pr;
    }
    .pop-footer {
      margin-top: 60pr;
      font-size: 32pr;
      line-height: 40pr;
      color: #4b4945;
      width: 100%;
      >div {
        width:  50%;
        padding: 18pr 0;
      }
      .wait-btn {
        color: #94928E;
      }
      .confirm-btn {
        background: #fddb00;
        border-radius: 10pr;
      }
    }
  }
</style>
