<template>
  <!-- 阅读量 点赞数 -->
  <section class="like-bar box box-tb" v-if="!ENV.v120&&!ENV.app">
    <section class="like box box-tb box-center-center" @click="toSupport($event)" v-if="!ENV.app">
      <div class="like-box box box-center-center">
        <img class="like-icon" ref="sup" src="data:image/png;base64,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"
          alt="图片" />
      </div>
      <span>赞&nbsp;<span class="like-num" ref="like" status='false'>{{ res.like > 0 ? res.like : '' }}</span></span>
    </section>
    <!-- 栏目时间 -->
    <!-- <section class="publish" v-else>
          <span> {{ getCommonTime }}</span>
        </section> -->
    <!-- 作者信息 -->
    <section class="author-info" v-if="author">
      <div class="author" v-if="res.authorsString">作者：{{res.authorsString}}</div>
    </section>
    <section class="read">
      阅读
      <span class="read-count">{{ readCount }}</span>
    </section>
  </section>
</template>

<script>
  import {
    getCommonTime,
    getSingleCount
  } from "../utils";
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    props: {
      author: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState([
        'res'
      ]),
      ...mapState('common', ['incr_view']),
      getCommonTime() {
        // 日期处理
        return getCommonTime(this.res.long_publish_time, 'yy-mm-dd hh:MM')
      },
      readCount() {
        // 数字处理
        return this.incr_view
      }
    },
    methods: {
      ...mapActions('common', ['get_incr_view']),
      // 点赞
      toSupport(e) {
        console.log(1, this.$refs["like"].innerText)
        let t = this.$refs["like"].innerText;
        if (this.$refs["like"].getAttribute("status") === "false") {
          if(t === '') {
            this.$refs["like"].innerText = 1
          } else {
            this.$refs["like"].innerText = parseInt(t) + 1;
          }      
        }
        console.log('2', this.$refs["like"].innerText)
        this.$refs["like"].setAttribute("status", "true");
        if (e.target.nodeName === "IMG" || e.target.nodeName === "SPAN" || e.target.nodeName === "DIV") {
          this.$refs["sup"].src =
            "data:image/png;base64,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";
        }
      }
    },
    mounted() {
      console.log('window.ENV.v120', window.ENV.v120)
      this.get_incr_view({
        subjectid: this.$route.params.id,
        timestamp: Date.now()
      })
    }
  }
</script>

<style scoped lang="less">
  .like-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 20pr solid #f1f1f1;
    font-size: 28pr;
    color: #94928e;
    padding: 0 24pr 0;
    background: #fff;
    .like {
      display: flex;
      align-items: center;
      margin-top: 20pr;
      .like-box {
        width: 100pr;
        height: 100pr;
        border-radius: 100pr;
        background: #f6f6f6;
        .like-icon {
          width: 34pr;
          height: 30pr;
        }
      }
      .like-num {
        display: inline-block;
      }
    }
    .author-info,
    .read {
      width: 100%;
      text-align: left;
      margin-top: 20pr;
      line-height: 60pr;
      .author {
        border-bottom: 1px solid #f1f1f1
      }
    }
  }
</style>