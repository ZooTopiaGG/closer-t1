<template>
  <div class="feed">
    <div class="head">热门文章</div>
    <div class="feed-content">
      <div class="top">
        <img class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534764538167&di=9f3d7a71a4d8aa44d64f88244536ea82&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0102cc5940cc55a8012193a3804c80.png" />
        <div class="column">ONAT媒体</div>
        <div class="time">3小时前</div>
      </div>
      <div class="middle">
        <div class="title">徐梦圆和双笙什么关系徐梦圆后“科幻哥”讲的Hi,成都刷爆微博爆微 </div>
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
  import {
    mapActions,
    mapState
  } from "vuex"
  
  export default {
    name: "feedList",
    props: {},
    data() {
      return {}
    },
    computed: {
    },
    mouted(){
    
    },
    methods: {
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
          width: 212pr;
          height: 216pr;
          margin: 8pr 12pr 0 0;
        }
      }
    }
  }
</style>
