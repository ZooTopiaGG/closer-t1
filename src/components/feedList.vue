<template>
  <div class="feed" v-if="hotSubjects.length>0">
    <div class="head">热门文章</div>
    <div class="feed-content" v-for="(value,key) in hotSubjects" :key="key">
      <div class="top">
        <img class="icon" :src="value.blogo" />
        <div class="column">{{value.communityName}}</div>
        <div class="time">{{dateFormate(value.long_publish_time,'yy-mm-dd hh:MM')}}</div>
      </div>
      <div class="middle">
        <div class="title">{{value.title}} </div>
        <div class="feed-img">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535361690&di=bb320d9c3874743ef97e12c9bc244803&imgtype=jpg&er=1&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140815%2F0032017361003192_b.jpg" class="img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCommonTime} from '../utils'
  import {
    mapActions,
    mapState
  } from "vuex"
  
  export default {
    name: "feedList",
    props: {
      hotSubjects:Array
    },
    data() {
      return {}
    },
    computed: {
    },
    mouted(){
    
    },
    methods: {
      dateFormate(t,f){
        return getCommonTime(t,f);
      }
    }
  }
</script>

<style scoped lang="less">
  .feed {
    margin-top: 20pr;
    .head {
      color: #444444;
      line-height: 44pr;
      font-size: 32pr;
      margin: 18pr 0 18pr 40pr;
    }
    .feed-content {
      margin-top: 30pr;
      .top {
        display: flex;
        flex-direction: row;
        .icon {
          margin-left: 38pr;
          width: 72pr;
          height: 72pr;
          border-radius: 72pr;
        }
        .column {
          margin: 16pr 0 0 20pr;
          font-size: 28pr;
          line-height: 40pr;
          margin-left: 20pr;
          color: #4B4945;
        }
        .time {
          font-size: 24pr;
          line-height: 34pr;
          margin: 20pr 0 0 300pr;
          color: #94928E;
        }
      }
    }
    .middle {
      margin: 26pr 40pr 0 40pr;
      .title {
        color: #4B4945;
        line-height: 52pr;
        font-weight: 600;
      }
      .feed-img {
        margin-top: 16pr;
         :nth-child(3n) {
          margin-right: 0 !important;
        }
        .img {
          width: 216pr;
          height: 216pr;
          margin: 8pr 10pr 0 0;
        }
      }
    }
  }
</style>
