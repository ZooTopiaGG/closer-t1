<template>
  <section class="notfind">
    <section class="not-exist flex flex-v flex-align-center" v-if="$store.state.res.bool_delete">
      <img src="~/assets/images/home_icon_delete@2x.png" alt="">
      <span>此贴子已被删除</span>
    </section>
    <section class="todown flex flex-v flex-pack-justify" v-else>
      <section class="todown-top flex flex-align-center flex-pack-around">
        <img class="todown-top-left" src="~/assets/images/tiejin@2x.png" alt="">
        <img class="todown-top-right" src="~/assets/images/Group10@2x.png" alt="">
      </section>
      <section class="todown-body flex flex-v flex-align-center flex-pack-center">
        <section>根据国家法律规定</section>
        <section>该文章只能在app中打开查看</section>
      </section>
      <section class="todown-bottom flex flex-v flex-align-center">
        <section class="down-btn flex flex-align-center flex-pack-center">
          <span>立即下载</span>
        </section>
        <img src="~/assets/images/Illustrations@2x.png" alt="">
      </section>
    </section>
  </section>
</template>
<script>
// res.result.int_verify === 0 // 被下架 ||
//             ((res.result.int_verify === -1 &&
//               res.result.int_category != 4 &&
//               res.result.int_category != 6) ||
//               res.result.bool_delete)
//           )
export default {
  data() {
    return {};
  },
  methods: {
    initLoad() {
      let self = this;
      if (self.isWeiXin()) {
        document.querySelector(".todown-top-right").style.display = "block";
      } else {
        document.querySelector(".down-btn").style.opacity = 1;
        setTimeout(() => {
          if (self.getParam("downurl")) {
            location.href = self.getParam("downurl");
            setTimeout(() => {
              location.href =
                "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
            }, 1000);
          } else {
            location.href =
              "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
          }
        }, 1500);
      }
      document.querySelector(".down-btn").addEventListener(
        "click",
        function() {
          if (self.getParam("downurl")) {
            location.href = self.getParam("downurl");
          } else {
            location.href =
              "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
            return;
          }
        },
        false
      );
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
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      if (!self.$store.state.res.bool_delete) {
        self.initLoad();
      }
    });
  }
};
</script>
<style scoped lang="less">
.notfind {
  .nothing {
    color: #808080;
    margin: 15vw 0;
  }
  .nothing img {
    width: 21.6vw;
    height: 23.4vw;
    margin-bottom: 10px;
  }
  .todown {
    height: 100vh;
    padding: 1.333vw 1.333vw 6.66vw;
    box-sizing: border-box;
    .todown-top {
      .todown-top-left {
        width: 52.8vw;
        height: 15.2vw;
        padding-left: 4vw;
        padding-top: 2vw;
        padding-right: 6.93vw;
      }
      .todown-top-right {
        width: 33.067vw;
        height: 28vw;
        display: none;
      }
    }
    .todown-body {
      font-size: 18px;
    }
    .todown-bottom {
      position: relative;
      padding-top: 4.44vw;
      .down-btn {
        position: absolute;
        top: 0;
        left: 50%;
        width: 79.2vw;
        height: 10.67vw;
        margin-left: -39.6vw;
        background: #fddb00;
        border-radius: 5px;
        text-align: center;
        font-size: 16px;
        opacity: 0;
      }
      img {
        width: 93.067vw;
        height: 88.8vw;
      }
    }
  }
}
</style>