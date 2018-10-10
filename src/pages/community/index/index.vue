<template>
  <div class="column">
    <download-bar ref="downloadbar"></download-bar>
    <div class="column-wrap box box-tb box-center-center">
      <div class="cln-icon">
        <img src="" alt="">
      </div>
      <div class="cln-name">ONAT媒体</div>
      <div class="cln-text">用心写出有态度，有深度，有高度的文章 <br>请关注我们吧～</div>
      <div class="btn-commen focus">已关注</div>
    </div>
    <div class="group-wrap">
      <div class="gr-line1 box box-lr">
        <div class="gr-title">正在招募的群组</div>
        <div class="gr-more">更多群组 ></div>
      </div>
      <div class="gr-group box box-lr">
        <div class="gr-left">
          <img src="" alt="">
        </div>
        <div class="gr-right">
          <div class="gr-name">成都一群</div>
          <div class="gr-text">汇集成都好吃的、好玩的最新资讯</div>
        </div>
      </div>
      <div class="gr-group box box-lr">
        <div class="gr-left">
          <img src="" alt="">
        </div>
        <div class="gr-right">
          <div class="gr-name">成都一群</div>
          <div class="gr-text">汇集成都好吃的、好玩的最新资讯</div>
        </div>
      </div>
      <div class="gr-group box box-lr">
        <div class="gr-left">
          <img src="" alt="">
        </div>
        <div class="gr-right">
          <div class="gr-name">成都一群</div>
          <div class="gr-text">汇集成都好吃的、好玩的最新资讯</div>
        </div>
      </div>
    </div>
    <feed-list ref="feedlist"></feed-list>
  </div>
</template>
<script>
import DownloadBar from '../../../components/downloadBar'
import FeedList from '../../../components/feedList'
export default {
  name: 'column',
  components: {
    DownloadBar,
    FeedList
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@color: #4B4945;
@bgColor: #fff;
.column {
  background:#F5F5F5;
  .column-wrap {
    width: 100%;
    padding-bottom: 60pr;
    background: @bgColor;
    .cln-icon {
      width: 142pr;
      height: 60pr;
      border-radius: 10pr;
      margin-top: 60pr;
      >img {
        width: 100%;
        overflow: hidden;
        border: 1px solid black;
      }
    }
    .cln-name {
      font-size: 36pr;
      font-weight: 500;
      line-height: 50pr;
      letter-spacing: 1pr;
      color: @color;
      margin-top: 20pr;
    }
    .cln-text {
      margin-top: 40pr;
      color: #94928E;
      font-size: 32pr;
      line-height: 60pr;
      text-align: center;
    }
    .btn-commen {
      width: 240pr;
      height: 80pr;
      line-height: 80pr;
      border-radius: 10pr;
      font-size: 36pr;
      text-align: center;
      color: @color;
      margin-top: 60pr;
    }
    .focus {
      background: #E9E9E9;
    }
    .unfocus {
      background: #FDDB00;
    }
  }
  .group-wrap {
    background: @bgColor;
    margin-top: 20pr;
    padding: 30pr 40pr;
    .gr-line1 {
      position: relative;
      height: 50pr;
      line-height: 50pr;
      .gr-title {
        font-size: 36pr;
        color: @color;
      }
      .gr-more {
        position: absolute;
        top: 0;
        right: 0;
        color: #94928E;
        font-size: 28pr;
      }
    }
    .gr-group {
      margin-top: 30pr;
      padding-bottom: 30pr;
      .gr-left {
        width: 108pr;
        height: 108pr;
        border-radius: 10pr;
        border: 1px solid black;
        >img {
          width: 100%;
          overflow: hidden;
        }
      }
      .gr-right {
        margin-left: 20pr;
        .gr-name {
          font-size: 32pr;
          line-height: 44pr;
          color: @color;
        }
        .gr-text {
          margin-top: 10pr;
          color: #94928E;
          font-size: 28pr;
          line-height: 40pr;
        }
      }
    }
  }
}
</style>

