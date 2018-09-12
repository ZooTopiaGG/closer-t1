<template>
  <div class="not-found">
    <div class="delete" v-if="!window.ENV.app">
      <div class="delete-icon"></div>
      <div class="subject-notfound">此贴子已被删除</div>
      <div>
      </div>
    </div>
    <div class="todown" v-else>
      <div class="todown-top">
        <img class="todown-top-left" src="../../assets/images/tiejin.png">
        <img class="todown-top-right" src="../../assets/images/open_browser.png" >
      </div>
      <div class="todown-body">
        <div>根据国家法律规定</div>
        <div>该文章只能在app中打开查看</div>
      </div>
      <div class="down-btn" @click="download">
        <span>立即下载</span>
      </div>
      <div >
        <img src="../../assets/images/illustrations.png" class="todown-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "notFound",
    props: {
      isDelete: Boolean
    },
    mounted() {
      this.initLoad();
    },
    methods: {
      initLoad() {
        if (this.isWeiXin()) {
          document.querySelector(".todown-top-right").style.display = "block";
        } else {
          document.querySelector(".down-btn").style.opacity = 1;
          setTimeout(() => {
            this.download();
          }, 1500);
        }
      },
      download() {
        location.href =
          "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
        return;
      },
      isWeiXin() {
        let ua = navigator.userAgent.toLowerCase();
        var iswx = false,
          isqq = false,
          iswb = false;
        // 微信内置浏览器
        iswx = /micromessenger/i.test(ua);
  
        // QQ内置浏览器
        isqq = /qq/i.test(ua);
        if (/mqqbrowser/i.test(ua)) {
          isqq = false;
        }
        // 微博内置浏览器
        iswb = /weibo/i.test(ua);
        return iswx || isqq || iswb;
      },
      getParam(paramName) {
        var paramValue = "";
        var isFound = false;
        if (
          location.search.indexOf("?") == 0 &&
          location.search.indexOf("=") > 1
        ) {
          var arrSource = unescape(location.search)
            .substring(1, location.search.length)
            .split("&");
          var i = 0;
          while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
              if (
                arrSource[i].split("=")[0].toLowerCase() ==
                paramName.toLowerCase()
              ) {
                paramValue = arrSource[i].split("=")[1];
                isFound = true;
              }
            }
            i++;
          }
        }
        return paramValue;
      }
    }
  }
</script>

<style lang="less" scoped>
  .not-found {
    text-align: center;
    .delete-icon {
      background: url("../../assets/images/not_found_icon.png");
      background-size: cover;
      width: 100pr;
      height: 100pr;
      margin: 500pr 100pr 0 310pr;
    }
    .subject-notfound {
      margin: 100pr 100pr 0 250pr;
      font-size: 32pr;
      color: #555555;
    }
    .todown {
      padding: 50pr 20pr 0 20pr;
      text-align: center;
      .todown-top {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .todown-top-right {
          width: 248pr;
          height: 210pr;
          display: none;
        }
        .todown-top-left {
          width: 396pr;
          height: 114pr;
          margin:50pr 10pr 0 10pr;
        }
        
      }
      .todown-body {
        margin-top: 30pr;
        font-size: 36pr;
      }
      .down-btn {
        padding: 10pr;
        margin: 100pr 80pr 0 80pr;
        background: #fddb00;
        border-radius: 10pr;
        font-size: 36pr;
        opacity: 0;
      }
      .todown-bottom {
        position: relative;
        margin-top: 40pr;
        width: 698pr;
        height: 666pr;
      }
    }
  }
</style>



