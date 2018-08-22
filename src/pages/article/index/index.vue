<template>
  <section v-if="exist" class="article">
    <section class="article-wrap">
      <!-- 端外显示 -->
      <section v-if="!V_1_2 || !IS_APP" class="article-hd">
        <!-- 顶部下载按钮，只在端外环境下显示 -->
        <download-bar v-if="!IS_APP"></download-bar>
        <!-- 头部图片封面，端外以及1.2以下版本的端内显示 -->
        <section class="article-img-box">
          <!-- 封面 -->
          <img class="article-img" v-lazy="coverImg" data-index= "0" 
          >
          <section class="article-cover"></section>
        </section>
      </section>
      <!-- 正文内容 -->
      <section class="article-bd">
        <section class="article-container">
          <!-- 标题 -->
          <div class="article-title"> {{ res.title }} </div>
          <!-- 暂时隐藏 -->
          <!-- <section class="feeder-cover flex flex-align-center" v-if="!GET_MESSAGE_STATE">
                    <span> {{ getCommonTime(res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                  </section> -->
          <section v-if="!IS_APP">
            <!-- 关注栏 -->
            <focus-bar></focus-bar>
          </section>
          <div class="content article-content" v-html="content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
          </div>
        </section>
        <section v-if="!IS_APP">
          <!-- 小编+作者 -->
          <author-bar></author-bar>
          <!--（阅读量+点赞数）/ 编稿时间 -->
          <like-bar></like-bar>
        </section>
      </section>
    </section>

    <!-- 精彩留言 -->

    <!-- 热门文章 -->
    
  </section>
  <Notfound v-else></Notfound>
</template>

<script>
  import Cookie from "js-cookie";
  import {
    mapState,
    mapActions
  } from 'vuex';
  import downloadBar from '../../../components/downloadBar.vue';
  import focusBar from '../../../components/focusBar.vue';
  import authorBar from '../../../components/authorBar.vue';
  import likeBar from '../../../components/likeBar.vue';
  import {
    appPlayVideo,
    makeFileUrl
  } from "../../../utils";
  import Notfound from '../../../components/error/notfound'
  
  
  export default {
    name: `articleIndex`,
    data() {
      return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
        vid: "",
        video: {},
        playIconTimer: null
      };
    },
    components: {
      downloadBar,
      focusBar,
      authorBar,
      likeBar
    },
    computed: {
      ...mapState(['UA', 'IS_APP', 'V_1_2', 'content', 'res', 'exist']),
      coverImg() {
        return makeFileUrl(this.res.bigcover ? this.res.bigcover : this.res.cover)
      }
    },
    methods: {
      ...mapActions(['fetch_content']),
      async fetch() {
        await this.fetch_content(this.$route.params)
      },
      // 在app端 长图文贴子 打开原生视频
      openClick(event) {
        const target = event.target,
          classList = target.classList;
        if (this.$store.state.IS_APP) {
          if (!(target.dataset.vid || target.dataset.uid)) {
            return;
          }
          appPlayVideo(
            target.dataset.uid,
            target.dataset.vid
          );
        }
      }
    },
    mounted() {
      let self = this;
      console.log(self.$store);
      self.fetch();
    }
  };
</script>

<style scoped lang="less">
  @import "../assets/style/article.less";
</style>
