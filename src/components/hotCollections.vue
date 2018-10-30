<template>
  <!-- 热门投稿 -->
  <div class="hot-colletions">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">精华</mt-tab-item>
      <mt-tab-item id="0">全部</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <div class="empty" v-if="hotColletions0&&hotColletions0.length==0">
          <div class="empty-icon"></div>
          <div class="empty-desc">暂时没有精选内容赶紧投稿吧</div>
        </div>
        <div v-else class="collections-content" v-for="(item,key) in hotColletions1" :key="key" @click="toFeedDetails( item.subjectid)">
          <div class="top">
            <img class="icon" :src="fileUrlParse(item.user.attributes.roster.avatar||item.user.avatar)" />
            <span class="column">{{item.user.attributes.roster.name||item.user.fullname}}</span>
            <span class="time">{{dateFormate(item.long_publish_time,'yy-mm-dd hh:MM')}}</span>
          </div>
          <div class="wrap">
            <div class="middle">
              <div class="cover">
                <div :class="(item.cover||JSON.parse(item.content).videos) ?  'collections-title' :'collections-title2'">{{JSON.parse(item.content).summary}}</div>
                <div v-if="item.int_type===2&&item.cover" class="collections-cover" v-lazy:background-image="fileUrlParse(item.cover)">
                </div>
                <div v-else-if="item.int_type===0&&item.content.images&&item.content.images.length>0" class="collections-cover" v-lazy:background-image="fileUrlParse(item.cover)">
                  <div class="image-num">{{item.content.images.length}}图</div>
                </div>
                <div v-else-if="item.int_type===1" class="collections-cover" v-lazy:background-image="JSON.parse(item.content).videos[0].imageUrl">
                  <div class="play-icon"></div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <label class="community-count" v-if="item.commentNumber!=0">{{item.commentNumber}}评论</label>
              <label v-if="item.commentNumber!=0&&item.like!=0">·</label>
              <label class="like-count" v-if="item.like!=0">{{item.like}}赞</label>
              <!-- <label class="date">{{dateFormate(item.long_publish_time)}}</label> -->
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="empty" v-if="hotColletions1&&hotColletions1.length==0">
          <div class="empty-icon"></div>
          <div class="empty-desc">暂时没有精选内容赶紧投稿吧</div>
        </div>
        <div v-else class="collections-content" v-for="(item,key) in hotColletions1" :key="key" @click="toFeedDetails(item.subjectid)">
          <div class="top">
            <img class="icon" :src="fileUrlParse(item.user.attributes.roster.avatar||item.user.avatar)" />
            <span class="column">{{item.user.attributes.roster.name||item.user.fullname}}</span>
            <span class="time">{{dateFormate(item.long_publish_time,'yy-mm-dd hh:MM')}}</span>
          </div>
          <div class="wrap">
            <div class="middle">
              <div class="cover">
                <div :class="(item.cover||JSON.parse(item.content).videos) ?  'collections-title' :'collections-title2'">{{JSON.parse(item.content).summary}}</div>
                <div v-if="item.int_type===2&&item.cover" class="collections-cover" v-lazy:background-image="fileUrlParse(item.cover)">
                </div>
                <div v-else-if="item.int_type===0&&item.content.images&&item.content.images.length>0" class="collections-cover" v-lazy:background-image="fileUrlParse(item.cover)">
                  <div class="image-num">{{item.content.images.length}}图</div>
                </div>
                <div v-else-if="item.int_type===1" class="collections-cover" v-lazy:background-image="JSON.parse(item.content).videos[0].imageUrl">
                  <div class="play-icon"></div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <label class="community-count" v-if="item.commentNumber!=0">{{item.commentNumber}}评论</label>
              <label v-if="item.commentNumber!=0&&item.like!=0">·</label>
              <label class="like-count" v-if="item.like!=0">{{item.like}}赞</label>
              <!-- <label class="date">{{dateFormate(item.long_publish_time)}}</label> -->
            </div>
          </div>
        </div>
  
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Navbar,
    TabItem,
    TabContainer,
    TabContainerItem
  } from 'mint-ui';
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    getCommonTime,
    makeFileUrl,
    down_statistics,
    dateFromNow
  } from '../utils'
  
  export default {
    data() {
      return {
        selected: '1'
      }
    },
    props: {
      subjectId: String,
    },
    computed: {
      ...mapState("common", ["hotColletions1", "hotColletions0", "collectionActive"])
    },
  
    methods: {
      ...mapActions("common", ["getHotCollections"]),
      dateFormate(t, f) {
        return dateFromNow(t);
      },
      fileUrlParse(url, type, size) {
        return makeFileUrl(url, type, size);
      },
      downloadApp(e, str, id) {
        let redirectUrl = `closer://feed/${id}`;
        down_statistics({
          "store": this.$store,
          "route": this.$route,
          "str": str,
          "defaultStr": "hot_feed",
          "redirectUrl": redirectUrl
        });
      },
      toFeedDetails(id) {
        this.$router.push({
          path: `/draft/${id}?fromid=${this.$route.params.id}&from=paper`
        });
      },
  
    },
    mounted() {
      this.getHotCollections({
        subjectid: this.subjectId,
        lastsubjectid: 0,
        pagesize: 5,
        type: parseInt(this.selected)
      })
    },
    watch: {
      selected: function(val, oldVal) {
        console.log(val, "---", oldVal)
        //val     切换后 id
        //oldVal  切换前 id 
        this.getHotCollections({
          subjectid: this.subjectId,
          lastsubjectid: 0,
          pagesize: 5,
          type: parseInt(val)
        })
      },
      '$route' (to, from) {
        this.$router.go(0);
      }
    },
  }
</script>

<style lang="less" scoped>
  .hot-colletions {
    margin-top: 20pr;
    background: #fff;
    border-bottom: 20pr solid #f1f1f1;
    .is-selected {
      border-bottom: 3px solid #fddb00 !important;
      color: #4B4945 !important;
    }
    .empty {
      .empty-icon {
        background: url("../assets/images/collection-empty.png") center;
        background-size: cover;
        width: 166pr;
        height: 180pr;
        margin: 204pr 294pr 10pr 290pr;
      }
      .empty-desc {
        width: 245pr;
        height: 84pr;
        margin: 30pr 250pr 171pr 255pr;
        color: #94928E;
        font-size: 30pr;
        text-align: center;
      }
    }
    .head {
      color: #272727;
      line-height: 44pr;
      font-size: 32pr;
      font-weight: bold;
      padding: 30pr 0 30pr 24pr;
      border-bottom: 1px solid #f1f1f1;
    }
    .collections-content {
      padding: 24pr 24pr 0;
      padding-bottom: 20pr;
      margin-top: 30pr;
      .top {
        .icon {
          width: 60pr;
          height: 60pr;
          border-radius: 60pr;
        }
        .column {
          margin: 16pr 0 0 20pr;
          font-size: 28pr;
          line-height: 40pr;
          margin-left: 10pr;
          color: #4B4945;
        }
        .time {
          font-size: 28pr;
          line-height: 34pr;
          color: #94928E;
          margin-right: 40pr;
          float: right;
        }
      }
      .wrap {
        margin-top: 30pr;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 24pr;
      }
      .middle {
        .title {
          color: #242424;
          line-height: 52pr;
          font-size: 34pr;
          padding: 0 40pr;
        }
        .cover {
          display: flex;
          flex-direction: row;
          margin: 0 0 16pr 0;
          .collections-title {
            width: 447pr;
            height: 135pr;
            color: #242424;
            margin-right: 24pr;
            line-height: 45pr;
            font-size: 34pr;
            font-weight: 500;
            display: -webkit-box;
            // 超出省略号
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .collections-title2 {
            // width: 447pr;
            height: 135pr;
            color: #242424;
            margin-right: 24pr;
            line-height: 45pr;
            font-size: 34pr;
            font-weight: 500;
            display: -webkit-box;
            // 超出省略号
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .collections-cover {
            float: right;
            width: 231pr;
            height: 144pr;
            border-radius: 8pr;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            .image-num {
              position: absolute;
              color: #FFFFFF;
              font-size: 20pr;
              bottom: 8pr;
              right: 8pr;
            }
            .play-icon {
              margin: 42pr 85pr 42pr 85pr;
              background: url("../assets/images/play.png");
              background-size: cover;
              width: 60pr;
              height: 60pr;
            }
          }
        }
      }
      .bottom {
        color: #94928E;
        font-size: 24pr;
        .name {
          margin-right: 16pr;
        }
        .date {
          float: right;
        }
      }
    }
  }
</style>
