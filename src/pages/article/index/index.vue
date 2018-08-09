<template>
  <section class="article">
    <!-- 帖子内容 -->
    <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
    <section class="article-wrap">
      <section class="article-container">
        <!-- 标题 -->
        <section class="article-title"> {{ res.title }} </section>
        <!-- 暂时隐藏 -->
        <!-- <section class="feeder-cover flex flex-align-center" v-if="!GET_MESSAGE_STATE">
                  <span> {{ $com.getCommonTime(res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                </section> -->
        <section class="content article-content" v-html="content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
        </section>
      </section>
    </section>
  </section>
</template>

<script>
  import Cookie from "js-cookie";
  import { createNamespacedHelpers } from 'vuex'
  const {
    mapState,
    mapActions,
    mapMutations
  } = createNamespacedHelpers('article');
  import {
    h5PlayVideo
  } from "../../../utils";
  
  export default {
    name: "Feed",
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
        vid: "",
        video: {}
      };
    },
    computed: {
      ...mapState([
        'res',
        'content',
        'GET_MESSAGE_STATE',
        'version_1_2',
        'agent'
      ])
    },
    methods: {
      ...mapActions(['fetch_content']),
      ...mapMutations(['GET_USER_AGENT']),
      fetch() {
        this.fetch_content(this.$route.params)
  
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        if (this.$store.state.IS_APP) {
          if (!(event.target.dataset.vid || event.target.dataset.uid)) {
            return;
          }
          h5PlayVideo(
            event.target.dataset.uid,
            event.target.dataset.vid
          );
        }
      }
    },
    mounted() {
      let self = this;
      self.GET_USER_AGENT({
        nvg: navigator.userAgent,
        ref: location.pathname
      });
      self.fetch();
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/article.less";
</style>
