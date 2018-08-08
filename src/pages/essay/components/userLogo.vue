<template>
    <img class="access-not" :src="defaultImg" v-lazy="$store.state.essay.res.blogo" @click="toCommunity">
</template>
<script>
export default {
  props: {},
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  methods: {
    toCommunity() {
      this.$router.push({
        path: `/community/${this.$store.state.essay.res.communityid}`
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
<style scoped>
.access-not {
  width: 21.87vw;
  height: 8.54vw;
  border-radius: 5px;
}
</style>