<template>
  <div class="group">
    <downloadBar></downloadBar>
    <div class="member">
      <div class="title">群组成员4</div>
      <ul class="member-icons">
        <li class="head">
          <img src="https://file.tiejin.cn/avatar/u/9iy2m2wLhD?v=1534747704065" class="icon">
          <p class="owner">
            <span>群主</span>
          </p>
          <div class="name">逆惺惺相惜臣</div>
        </li>
        <li class="head">
          <img src="https://file.tiejin.cn/avatar/u/9iy2m2wLhD?v=1534747704065" class="icon">
          <p class="owner">
            <span>群主</span>
          </p>
          <div class="name">逆惺惺相惜臣</div>
        </li>
        <li class="head">
          <img src="https://file.tiejin.cn/avatar/u/9iy2m2wLhD?v=1534747704065" class="icon">
          <p class="owner">
            <span>群主</span>
          </p>
          <div class="name">逆惺惺相惜臣</div>
        </li>
        <li class="head">
          <img src="https://file.tiejin.cn/avatar/u/9iy2m2wLhD?v=1534747704065" class="icon">
          <p class="owner">
            <span>群主</span>
          </p>
          <div class="name">逆惺惺相惜臣</div>
        </li>
        <li class="head">
          <img src="https://file.tiejin.cn/avatar/u/9iy2m2wLhD?v=1534747704065" class="icon">
          <p class="owner">
            <span>群主</span>
          </p>
          <div class="name">逆惺惺相惜臣</div>
        </li>
      </ul>
      <div class="more-member">查看更多群成员<i class="arrow"></i></div>
      <div class="split-line"></div>
    </div>
    <div class="current-topic">当前话题 <i class="arrow-right"></i>
    </div>
    <div class="topic-content">分享成都有趣的事情、好吃的小店、好玩的地方，定期举办线下聚会。</div>
    <div class="split-box"></div>
    <div class="group-info">
      <span class="title">所属贴近号</span>
      <img class="icon" src="http://file.tiejin.cn/public/9J77p9Dnh6/1532678707000.jpg" />
      <span class="name">城市知识局</span>
      <i class="arrow-right"></i>
    </div>
    <div class="split-box"></div>
    <feedlist></feedlist>
  </div>
</template>

<script>
  import DownloadBar from '../../components/downloadBar';
  import Feedlist from '../../components/feedList'
  
  export default {
    components: {
      DownloadBar,
      Feedlist
    }
  }
</script>

<style lang="less" scoped>
  .group {
    .member {
      padding: 40pr;
      .title {
        text-align: center;
        font-weight: 600;
        text-align: center;
        line-height: 1.7;
        font-size: 16px;
        margin-bottom: 40pr;
      }
      .member-icons {
        display: flex;
        width: 670pr;
        .head {
          margin-right: 16pr;
          position: relative;
          text-align: center;
          width: 124pr;
          .icon {
            width: 100pr;
            height: 100pr;
            border-radius: 100pr;
            margin-bottom: 10pr;
          }
          .owner {
            width: 80pr;
            height: 80pr;
            background: url("../../assets/images/group_icon_tag.png") no-repeat;
            background-size: cover;
            position: absolute;
            top: -14pr;
            left: -14pr;
            text-align: center;
            span {
              margin-top: 26pr;
              font-size: 22pr;
              -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
              color: #fff;
              display: block;
            }
          }
          .name {
            font-size: 28pr;
            color: #4B4945;
            text-align: center;
            width: 100%;
            height: 40pr;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .more-member {
        margin: 40pr 0 40pr 0;
        text-align: center;
        color: #507caf;
        font-size: 14px;
        .arrow {
          display: inline-block;
          width: 18pr;
          height: 18pr;
          background: url("../../assets/images/group_down_arrow.png") no-repeat;
          background-size: cover;
          margin-left: 6pr;
        }
      }
      .split-line {
        width: 100%;
        height: 1px;
        background: #E6E6E6;
      }
    }
    .arrow-right {
      margin-top: 14pr;
      float: right;
      display: inline-block;
      width: 10pr;
      height: 24pr;
      background: url("../../assets/images/back.png") no-repeat;
      background-size: cover;
    }
    .current-topic {
      margin: 20pr 40pr 20pr 40pr;
      font-size: 32pr;
      font-weight: 600;
      position: relative;
    }
    .topic-content {
      padding: 0 40pr 0 40pr;
      margin-bottom: 40pr;
      font-size: 28pr;
      color: #94928E;
    }
    .split-box {
      width: 100%;
      height: 20pr;
      background: #f4f4f4;
    }
    .group-info {
      margin: 48pr 40pr 48pr 40pr;
      color: #4B4945;
      .title {
        font-weight: 600;
        margin-right: 150pr;
      }
      .icon {
        width: 142pr;
        height: 60pr;
        border-radius: 10pr;
        margin-right: 20pr;
      }
      .name {
        font-size: 28pr;
      }
    }
  }
</style>
