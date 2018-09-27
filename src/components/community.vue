<template>
  <section class="community" :class="showStyle">
    <img class="community-logo" :src="defaultImg" v-lazy="res.blogo" @click="toCommunity">
    <span class="community-name ellipsis">{{ res.communityName || res.name }}</span>
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
    ...mapState(['res']),
    showStyle() {
      return `community-${this.showType}`
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