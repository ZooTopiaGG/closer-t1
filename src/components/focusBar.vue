<template>
  <section class="focus-bar" v-if="!ENV.app">
    <section class="focus-wrap">
      <section class="community" :class="showStyle" @click="toCommunity">
        <img class="community-logo" :src="defaultImg" v-lazy="communityLogo">
        <div class="community-info">
          <p class="community-name ellipsis">{{ this.$store.state.res.communityName || this.$store.state.res.name }}</p>
          <p v-if="showTime" class="community-time">{{dateFromNow}}</p>
        </div>
      </section>
      <t-focus :cid="res.communityid" :cname="res.communityName"></t-focus>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import tFocus from "./focus";
import { mapState, mapActions } from 'vuex'
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
  watch: {
    res: function(newVal, oldVal) {
      if (newVal.communityid) {
        console.log('res.communityid', newVal.communityid)
        this.getFocusState(newVal.communityid)
      }
    }
  },
  computed: {
    ...mapState(['res']),
    communityLogo() {
      return this.res.slogo || this.res.blogo
    },
    showStyle() {
      return `community-${this.showType}`
    },
    dateFromNow() {
      return dateFromNow(this.res.long_update_time)
    }
  },
  methods: {
    ...mapActions('common', ['getFocusState']),
    toCommunity() {
      let { type, category } = this.$route.query
      this.$router.push({
        path: `/community/${this.res.communityid}`,
        query: {
          type: type,
          category: category
        }
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