<template>
  <section class="focus-bar" v-if="!ENV.app">
    <section class="focus-wrap">
      <section class="community" :class="showStyle">
        <img class="community-logo" :src="defaultImg" v-lazy="this.$store.state.res.blogo" @click="toCommunity">
        <div class="community-info">
          <p class="community-name ellipsis">{{ this.$store.state.res.communityName || this.$store.state.res.name }}</p>
          <p v-if="showTime" class="community-time">{{dateFromNow}}</p>
        </div>
      </section>
      <t-focus :communityid="res.communityid"></t-focus>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import tFocus from "./focus";
import { mapState } from 'vuex'
import { dateFromNow } from '../utils'
export default {
  props: {
    showType: String,
    showTime: Boolean
  },
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  components: {
    tFocus
  },
  computed: {
    ...mapState(['res']),
    showStyle() {
      return `community-${this.showType}`
    },
    dateFromNow() {
      return dateFromNow(this.res.long_update_time)
    }
  },
  methods: {
    toCommunity() {
      this.$router.push({
        path: `/community/${this.res.communityid}`
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      // logo图片预加载
      let tjimg = document.querySelector(".access-not");
      if (tjimg && tjimg.dataset.original) {
        tjimg.src = tjimg.dataset.original;
      }
    });
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
      align-items: center;
    }
  }
  .community {
    display: flex;
    align-items: center;
    &-logo {
      width: 74pr;
      height: 74pr;
      margin-right: 22pr;
      border-radius: 10pr;
    }
    &-name {
      font-size: 28pr;
      color: #4b4945;
    }
    &-time {
      font-size: 20pr;
      color: #aaa;
    }
  }
  .community-1 {
    color: inherit;
  }
  @media screen and (min-width: 681px) {
    .feeder-cover {
      display: none;
    }
  }
</style>