<template>
  <section class="community" :class="showStyle">
    <img class="community-logo" :src="defaultImg" v-lazy="this.$store.state.res.blogo" @click="toCommunity">
    <span class="community-name ellipsis">{{ this.$store.state.res.communityName || this.$store.state.res.name }}</span>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    showType: String
  },
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  computed: {
    showStyle() {
      return `community-${this.showType}`
    }
  },
  methods: {
    toCommunity() {
      this.$router.push({
        path: `/community/${this.$store.state.res.communityid}`
      });
    }
  },
  mounted() {
    console.log('res--', this.$store.res)
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
  .community {
    display: flex;
    align-items: center;
    &-logo {
      width: 104pr;
      height: 44pr;
      margin-right: 22pr;

    }
    &-name {
      font-size: 28pr;
      color: #4b4945;
    }
  }
  .community-1 {
    color: inherit;
  }
</style>