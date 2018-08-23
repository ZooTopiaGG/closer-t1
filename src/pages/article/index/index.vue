<template>
  <section class="article" v-if="exist">
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
  <Notfound v-else :isDelete="res.bool_delete"></Notfound>
</template>

<script>
  import Cookie from "js-cookie";
  import {
    createNamespacedHelpers
  } from 'vuex'
  
  const {
    mapState,
    mapActions,
    mapMutations
  } = createNamespacedHelpers('article');
  import {
    appPlayVideo,
    tabImg
  } from "../../../utils";
  import Notfound from '../../../components/error/notfound'
  
  
  export default {
    name: "Feed",
    components: {
      Notfound
    },
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
        vid: "",
        video: {},
        playIconTimer: null
      };
    },
    computed: {
      ...mapState([
        'res',
        'content',
        'GET_MESSAGE_STATE',
        'version_1_2',
        'agent',
        'exist'
      ])
    },
    methods: {
      ...mapActions(['fetch_content']),
      ...mapMutations(['GET_USER_AGENT']),
      async fetch() {
        await this.fetch_content(this.$route.params)
      },
      tabImg(e) {
        console.log(e.target.dataset.index)
        tabImg(e.target.dataset.index);
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        const target = event.target,
          classList = target.classList;
        // if (classList.contains('video-play-icon')) {
        //   if (this.$store.state.IS_APP) {
        //     if (!(target.dataset.vid || target.dataset.uid)) {
        //       return;
        //     }
        //     appPlayVideo(
        //       target.dataset.uid,
        //       target.dataset.vid
        //     );
        //   } else {
        //     let parentNode = target.parentNode,
        //       video = parentNode.querySelector('video');
        //     if (video.paused) {
        //       video.play();
        //       target.style.display = 'none';
        //       target.classList.add('pause');
        //     } else {
        //       video.pause();
        //       clearTimeout(this.playIconTimer);
        //       target.classList.remove('pause');
        //     }
        //   }
        // } else if (classList.contains('video-wrap') || classList.contains('video-tag')) {
        //   let parentNode = target;
        //   if (classList.contains('video-tag')) {
        //     parentNode = target.parentNode;
        //   }
        //   const playIcon = parentNode.querySelector('.video-play-icon'),
        //     video = parentNode.querySelector('video');
        //     console.log(video.paused,playIcon.style.display);
        //   if (!video.paused && playIcon.style.display == 'none') {
        //     playIcon.style.display = 'block';
        //     this.playIconTimer = setTimeout(() => {
        //       this.playIconTimer = null;
        //       playIcon.style.display = 'none';
        //     }, 2e3)
        //   }
  
        // }
        if (this.$store.state.IS_APP) {
          if (target.dataset.vid && target.dataset.uid) {
            appPlayVideo(
              target.dataset.uid,
              target.dataset.vid
            );
          } else if (target.dataset.index) {
            tabImg(target.dataset.index);
          }
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
