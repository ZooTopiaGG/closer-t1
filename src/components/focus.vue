<template>
  <section class="focus">
    <section v-if="$store.state.is_follow" class="focus-btn-disabled"></section>
    <section @click="tjFocus">
      <section class="focus-community" v-if="$route.path.indexOf('community') > -1">
        <section class="yet-focus" v-if="$store.state.is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus" v-else>
          <span>关注栏目</span>
        </section>
      </section>
      <section class="other" v-else>
        <section class="yet-focus" v-if="$store.state.is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus" v-else>
          <i></i>
          <span>关注</span>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    props: {
      tjFocus: {
        type: Function,
        default: () => {
          return false;
        }
      }
    },
    data() {
      return {};
    },
    methods: {}
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
      .no-focus {
        i {
          display: inline-block;
          width: @m20;
          height: @m20;
          margin-right: 5pr;
          background: url("../assets/images/add@2x.png") no-repeat;
          background-size: cover;
        }
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