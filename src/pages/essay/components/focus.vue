<template>
    <section class="focus">
      <section v-if="$store.state.essay.is_follow" class="disabledBtn"></section>
      <section  @click="tjFocus">
        <section class="community" v-if="$route.path.indexOf('community') > -1">
        <section class="yet-focus flex flex-align-center" v-if="$store.state.essay.is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus flex flex-align-center" v-else>
          <span>关注栏目</span>
        </section>
      </section>
      <section class="other" v-else>
        <section class="yet-focus flex flex-align-center" v-if="$store.state.essay.is_follow">
          <span>已关注</span>
        </section>
        <section class="no-focus flex flex-align-center" v-else>
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
@m20: 2.667vw;
@primarycolor: #fddb00;
@defaultcolor: #e9e9e9;
@textcolor: #4b4945;
.focus {
  color: #507caf;
  font-size: 16px;
  padding-right: @m20 / 2;
  position: relative;
  .other {
    .no-focus {
      i {
        display: block;
        width: @m20;
        height: 2.933vw;
        margin-right: 0.8vw;
        background: url("~/assets/images/add@2x.png") no-repeat;
        background-size: cover;
      }
    }
  }
  .disabledBtn {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(0, 0, 0, 0);
  }
  .community {
    color: @textcolor;
    font-size: 18px;
    text-align: center;
    section {
      padding: 1.8667vw 5.8667vw;
      border-radius: 5px;
      box-sizing: border-box;
      > span {
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