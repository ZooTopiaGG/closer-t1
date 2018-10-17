<template>
  <section class="focus-bar" v-if="!ENV.app">
    <section class="focus-wrap">
      <t-community></t-community>
      <t-focus></t-focus>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import tCommunity from "./communityInfo";
import tFocus from "./focus";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  components: {
    tCommunity,
    tFocus
  },
  methods: {
    
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
@media screen and (min-width: 681px) {
  .feeder-cover {
    display: none;
  }
}
</style>