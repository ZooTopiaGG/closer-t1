import baseUrl from '../config/index';
import Store from '../store'
import { Toast } from 'mint-ui'

export function redirectAddChance(isApp) {
  //console.log("addchance", isApp);
  if (isApp) {
    location.href = "closer://community/9j9m4gy8sM"
  } else {
    location.href = 'https://h5.tiejin.cn/community/9j9m4gy8sM';
  }
}

export function downloadApp() {
  //console.log("downloadApp");
  // let ua = navigator.userAgent || window.navigator.userAgent;
  // ua = ua.toLowerCase();
  // if (ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1) {
  //     location.href = "https://itunes.apple.com/us/app/%E8%B4%B4%E8%BF%91/id1363128511?l=zh&ls=1&mt=8";
  // } else if (ua.indexOf('android')) {
  location.href = baseUrl.download;
  // }
}

export function toYuan(money) {
  let yuan = money / 100.0;
  return yuan.toFixed(2);
}

export function getQueryString() {
  let str = window.location.href.split('-')
  if (!str) return null
  let strLen = str.length
  return str[strLen - 1]
}

// 获取url中参数，返回所有参数组成的object对象
export function getQueryObject(url) {
  url = url || window.location.href;
  var search = url.substring(url.lastIndexOf("?") + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
};

export function getPlatform() {
  var u = navigator.userAgent;
  return {
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    windows: !!u.match(/windows mobile/i) //windows终端
  }
}

// 禁用微信分享功能
export function noShare() {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        WeixinJSBridge.call('hideOptionMenu');
      });
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        WeixinJSBridge.call('hideOptionMenu');
      });
      document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        WeixinJSBridge.call('hideOptionMenu');
      });
    }
  } else {
    WeixinJSBridge.call('hideOptionMenu');
  }
}

// 辅助函数
export function rem2px(v) {
  var val = parseFloat(v) * this.dpr * this.baseFontSize;
  if (typeof v === "string" && v.match(/rem$/)) {
    val += "px";
  }
  return val;
}

export function px2rem(v) {
  var val = parseFloat(v) * this.dpr / this.baseFontSize;
  if (typeof v === "string" && v.match(/px$/)) {
    val += "rem";
  }
  return val;
}

export function px2px(v) {
  var val = parseFloat(v) * this.dpr;
  if (typeof v === "string" && v.match(/px$/)) {
    val += "px";
  }
  return val;
}

/**
 * yyyy-dd-mm
 * 
 */
export function dateFormat(time, flag) {
  let d = new Date(time);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let second = d.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (second < 10) {
    second = "0" + second
  }
  if (flag == 'date') {
    return year + "-" + month + "-" + day;
  }
  if (flag == 'time') {
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes
  }
}



// 富文本处理
export function makeHtmlContent(html) {
  let _html;
  const regexImg = /<img.*?(?:>|\/>)/gi;
  let pImg = html.match(regexImg);
  if (pImg) {
    const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let size, flag;
    pImg.forEach((x, i) => {
      let
        srcArray = x.match(regexSrc),
        widthArray = x.match(regexWidth),
        heightArray = x.match(regexHeight),
        nW,
        newM,
        nH,
        minH;
      if (srcArray) {
        if (widthArray && heightArray) {
          if (widthArray[1] < 200) {
            nW = widthArray[1] + 'px';
            nH = heightArray[1] + 'px';
          } else {
            nW = '100%';
            nH = heightArray[1] * 100 / widthArray[1] + "%";
          }
          minH = nH;
          newM = x.replace(/src=/g, `style="width: ${nW}; height: ${nH}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy" data-type="preview" data-src=`);
        } else {
          nW = '100%';
          nH = "auto";
          minH = '28.27vw';
          newM = x.replace(/src=/g, `style="width: ${nW}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy2" data-type="preview" data-src=`);
        }
      } else {
        newM = '';
      }

      // 正则替换富文本内的img标签
      // 替换不同文本
      html = html.replace(x, `<div class="img-box">${newM}</div>`);
    });
  }
  const regexVideo = /<video.*?(?:>|\/>|<\/video>)/gi;
  let pVideo = html.match(regexVideo);
  if (pVideo) {
    // 正则替换富文本内 img标签 待发布（npm）
    const regexUrl = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexVid = /vid=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexCover = /imageUrl=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexPoster = /poster=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let flg;
    pVideo.forEach((x, i) => {
      // 匹配imageurl属性下的值
      let urlArray = x.match(regexUrl),
        // 匹配vid属性下的值
        vidArray = x.match(regexVid),
        coverArray = x.match(regexCover),
        posterArray = x.match(regexPoster),
        widthArray = x.match(regexWidth),
        heightArray = x.match(regexHeight),
        v, u, c, r,
        boxClass = '';
      // // 替换插入需要的值flg
      v = vidArray ? vidArray[1] : '';
      u = urlArray ? urlArray[1] : '';
      r = parseInt(heightArray[1]) / parseInt(widthArray[1]);
      if (coverArray) {
        c = coverArray[1]
      } else {
        c = posterArray ? posterArray[1] : ''
      }
      if (r > 1) {
        boxClass = 'video-box-vertical'
      }
      // let temp = pVideo[i].split('<p>');
      if (!window.ENV.app) {
        flg = `<section 
          class='video-box video-box-h5 ${boxClass}'
          data-vid='${v}'
          data-uid='${u}'
          >
          <section 
            class='video-wrap'
            data-vid='${v}'
            data-uid='${u}'
            >
              <video src='${urlArray[1]}'
              class='video-tag'
              preload='none'
              controls
              controlsList='nodownload'
              poster='${c}'
              data-bg='${c}'
              playsinline="true"
              webkit-playsinline="true"
              x5-playsinline="true"
              >
              </video>
          </section>
        </section>`;
      } else {
        flg = `<section 
          class='video-box video-box-native'
          data-vid='${v}'
          data-uid='${u}'
          data-bg='${c}'>
          <section 
            class='video-wrap'
            data-vid='${v}'
            data-uid='${u}'
            >
            <img data-src='${c}'
              class='video-play-poster'/>
            <span
              class='video-play-icon' data-vid='${v}' data-uid='${u}'></span>
          </section>
        </section>`;
      }
      html = html.replace(x, flg);
    });
  }
  const regexIframe = /<iframe.*?(?:>|\/>|<\/iframe>)/gi;
  let piFrame = html.match(regexIframe);
  if (piFrame) {
    const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
    piFrame.forEach((x, i) => {
      let widthArray = x.match(regexWidth),
        heightArray = x.match(regexHeight),
        newsplit = x.split(widthArray[0]),
        newstr = `${newsplit[0]}width="100%"${newsplit[1]}`,
        newsplit1 = newstr.split(heightArray[0]),
        newstr1 = `${newsplit1[0]} height="240" ${newsplit1[1]}`,
        flag = `<section class="imgbox tiejin-iframe">
                  ${newstr1}</iframe>
                </section>`;
      html = html.replace(x, flag);
    });
  }
  return html
}

/**
 * 图片地址处理
 */

export function makeFileUrl(url, type, size) {
  let filePath = baseUrl.file;
  if (url) {
    let sizes = size ? size : 500
    if (type === 'src') {
      return (url.indexOf('://') !== -1) ? url + '?s=' + sizes : filePath + url + '?s=' + sizes;
    } else {
      return (url.indexOf('://') !== -1) ? url : filePath + url;
    }
  } else {
    return
  }
}

export function getCommonTime(milliseconds, type) {
  let time = new Date(milliseconds),
    time_ = new Date(),
    time1 = time.getTime(time), //发布时间
    time_1 = time_.getTime(time_), //现在时间
    jTime = time_1 - time1,
    month = jTime / 1000 / 60 / 60 / 24 / 30,
    monthRound = Math.floor(month),
    days = jTime / 1000 / 60 / 60 / 24,
    daysRound = Math.floor(days),
    hours = jTime / 1000 / 60 / 60 - (24 * daysRound),
    hoursRound = Math.floor(hours),
    minutes = jTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound),
    minutesRound = Math.floor(minutes),
    seconds = jTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
    secondsRound = Math.floor(seconds);
  if (monthRound > 1) {
    return monthRound + '个月前'
  } else {
    if (daysRound > 0) {
      return daysRound + '天前'
    } else {
      if (hoursRound > 0) {
        return hoursRound + "小时前";
      } else {
        if (minutesRound > 10) {
          return minutesRound + "分钟前";
        } else {
          if (secondsRound > 0) {
            return "刚刚";
          }
        }
      }
    }
  }
}

export function appPlayVideo(u, v) {
  let vid = v ? v : null,
    uid = u ? u : null;
  let isIos = window.ENV.app && window.ENV.ios ? true : false;
  console.log('appPlayVideo', u, v);
  if (window.ENV.v120) {
    if (isIos) {
      if (window.WebViewJavascriptBridge) {
        setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("playVideo", {
            url: uid,
            vid: vid,
          });
        });
      }
    } else {
      if (typeof window.bridge != "undefined") {
        window.bridge.playVideo(vid, uid);
      }
    }
  } else {
    // 兼容 老版本
    location.href = `/?vid=${vid}`;
  }
}

export function tabImg(i) {
  let imgArray = Store.state.CONTENT_IMGS;
  let index = parseInt(i);
  let imgJson = {
    "imgs": imgArray,
    "index": index
  }
  let isIos = window.ENV.app && window.ENV.ios ? true : false;
  if (isIos) {
    if (window.WebViewJavascriptBridge) {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("tapImage", imgJson);
      });
    }
  } else {
    if (typeof window.bridge != "undefined") {
      window.bridge.tapImage(JSON.stringify(imgJson));
    }
  }
}

/**
 * 
 * @param {*} type 
 * @param {*} catogry_type 
 * @return  path  
 */
export function checkType(t, ct) {
  let path = "error"
  switch (t) {
    case 0:
      path = "photo"
      break;
    case 1:
      path = "video"
      break;
    case 2:
      path = checkCatogryType(ct);
      break;
  }
  return path;
}

export function checkCatogryType(ct) {
  let path = "error"
  if (ct >= 0 && ct <= 3) {
    path = "article"
  } else if (ct == 4) {
    path = "draft"
  } else if (ct == 5) {
    path = "comment"

  }
  return path
}

export function mergeJsonObject(jsonbject1, jsonbject2) {
  var resultJsonObject = {};
  for (var attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (var attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
}



export async function downApp(url) {
  if (url) {
    location.href = url;
    // if (!isJumpOut()) {
    // if (url.indexOf('?from=group') > -1) {
    //   let id = await this.getParam('groupid', url);
    //   location.href = `closer://jump/to/group`;
    // } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
    //   location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
    // } else {
    //   location.href = baseUrl.download;
    // }
    // setTimeout(() => {
    //   location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
    // }, 1500)
    // return;
    // } else {
    //   if (url.indexOf('?from=group') > -1) {
    //     location.href = url
    //   } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
    //     location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
    //   } else {
    //     location.href = `${location.protocol}//${location.host}?downurl=${url}`;
    //   }
    // }
  } else {
    location.href = baseUrl.download;
  }
}

// 统计方法
export async function down_statistics({ store, route, str, defaultStr, redirectUrl }) {
  let result = await store.dispatch("down_adcookies");
  if (result) {
    let _page, url, did = route.params.id || route.params.messageid || route.params.sid,
      progress, _str, s = JSON.parse;
    if (route.path.indexOf("/community") > -1) {
      _page = "community";
      url = `closer://community/${did}`;
    } else if (route.path.indexOf("/feed") > -1) {
      _page = "article";
      url = `closer://feed/${did}`;
      if (store.state.res.int_type === 1) {
        _page = "video";
      } else if (store.state.res.int_type === 0) {
        _page = "images";
      } else if (store.state.res.int_type === 2 && (store.state.res.int_category == 1 || store.state.res.int_category == 2)) {
        _page = "draft";
      } else {
        _page = "article";
      }
    } else if (route.path.indexOf("/group") > -1) {
      _page = "group";
      url = `closer://group/${did}`;
    } else if (route.path.indexOf("/message") > -1) {
      _page = "message";
      url = `closer://message/${did}`;
    } else {
      _page = "inviter";
      url = `closer://jump/to/mine`;
      did = s(Cookies.get("inviter")).id
    }
    _str = typeof(str) === 'string' && str ? str : defaultStr;
    let p1 = {
      action: "click", //		'行为类型(曝光 浏览结束点击返回 负反馈 点击下载)，参数取值:exposure back feedback download'        
      objectType: _page || "article", //		'统计对象类型（文章 视频 栏目 群组 H5分享的群组，栏目，帖子）,参数取值:article video community group'
      objectId: did || null, //		'统计对象唯一标识'
      position: _str, //		'点击位置，若action为download时必填,参数取值：top bottom'
      progress: 1, //		'浏览进度，文章为阅读的进度，图集为当前阅读的图片/总的图片数，视频为当前播放时间/总时间 小数点两位：0.95'
      recommendId: null //		'本次推荐的唯一标识 推荐内容ID'
    };
    let res = await store.dispatch("down_statistics", {
      p1
    });
    if (res) {
      if (redirectUrl) {
        if (redirectUrl === 'wx') {
          return true
        } else {
          downApp(redirectUrl);
          return
        }
      } else {
        downApp(url);
      }
    }
  }
}

// 为url添加参数
export function addUrlParams(url = '', params = {}) {
  url = url.split('?');
  let _url = url[0];
  let str = [];
  if (url[1]) {
    params = Object.assign(getQueryObject(url[1]), params)
  }
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      str.push(`${key}=${params[key]}`)
    }
  }
  return _url + '?' + str.join('&')
}

function isJumpOut() {
  if (typeof window != 'undefined') {
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
  }
}

function getParam(paramName, str) {
  var paramValue = "";
  var isFound = false;
  if (
    str.indexOf("?") > -1 &&
    str.indexOf("=") > -1
  ) {
    var arrSource = unescape(str).substring(str.indexOf("?") + 1, str.length).split('&')
    var i = 0;
    while (i < arrSource.length && !isFound) {
      if (arrSource[i].indexOf("=") > -1) {
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
export function replaceParamVal(url, paramName, replaceWith) {
  var oUrl = url.toString();
  var re = eval('/(' + paramName + '=)([^&]*)/gi');
  var nUrl = oUrl.replace(re, paramName + '=' + replaceWith);
  return nUrl;
}


export function wxShareConfig(wxConfig, shareConfig, jsApiList) {
  console.info("wxshare content:", shareConfig)
  if (wxConfig.signature && wxConfig.appId && wxConfig.nonceStr && wxConfig.timestamp) {
    wx.config({
      "debug": false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      "signature": wxConfig.signature,
      "appId": wxConfig.appId,
      "nonceStr": wxConfig.nonceStr,
      "timestamp": wxConfig.timestamp,
      jsApiList: jsApiList || ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function() {
      // 分享朋友
      wx.onMenuShareAppMessage({
          title: shareConfig.title, // 分享标题
          desc: shareConfig.desc, // 分享描述
          imgUrl: shareConfig.imgUrl, // 分享图标
          link: shareConfig.link || location.href,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户点击了分享后执行的回调函数
            // Toast('分享成功~')
          }
        })
        // 分享朋友圈
      wx.onMenuShareTimeline({
          title: shareConfig.title, // 分享标题
          imgUrl: shareConfig.imgUrl, // 分享图标
          link: shareConfig.link || location.href,
          success: function() {
            // 用户点击了分享后执行的回调函数
            // Toast('分享成功~')
          }
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    })
    wx.error(function(res) {
      console.error("wx.config.error", res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }
}


export function countImgs() {
  // 在浏览器可以点击图片预览
  let preimg;
  if (document.querySelectorAll("img[data-index]")) {
    preimg = document.querySelectorAll("img[data-index]");
    if (preimg) {
      var imgList = [];
      // 遍历查找出来的元素type HTMLCOLLECTION
      Array.prototype.forEach.call(preimg, (x, i) => {
        console.log("-----", x.dataset.src)
        if (x.dataset.index && x.dataset.src) {
          imgList.push({
            current: {
              src: x.dataset.src
            },
            index: i
          });
          // 监听点击图片事件 闭包
          preimg[i].onclick = (function() {
            return function() {
              Store.state.preIndex = i;
              Store.state.preShow = true;
            };
          })(i);
        }
      });
      Store.state.preImgs = imgList;
    }
  }

}

// 所传时间距离当前时间的时长
export function dateFromNow(time, type = 'MM-dd') {
  let now = Date.now(),
    _time = +new Date(time),
    diff = now - _time,
    str = '';
  if (diff >= 6.048e8) {
    // 超过7天直接显示type格式的日期
    str = new Date(time).Format(type)
  } else if (diff >= 8.64e7) {
    // 大于24小时显示“天”
    str = parseInt(diff / 8.64e7) + '天前';
  } else if (diff >= 3.6e6) {
    // 大于60分钟显示“小时”
    str = parseInt(diff / 3.6e6) + '小时前';
  } else if (diff >= 6e4) {
    // 大于60秒显示“分钟”
    str = parseInt(diff / 6e4) + '分钟前';
  } else {
    // 小于1分钟显示“刚刚”
    str = '刚刚'
  }
  return str;
}

// 时间戳转换为hh:mm:ss时间格式，所传参数time单位是秒
export function secondsFormat(time) {
  time = parseInt(time) || 0;
  let hour = parseInt(time / 3600),
    _hour = time % 3600,
    min = parseInt(_hour / 60),
    second = _hour % 60;
  hour = (hour > 0 && hour < 10) ? `0${hour}` : hour;
  min = (hour != 0 && min >= 0 && min < 10) ? `0${min}` : min;
  second = (second >= 0 && second < 10) ? `0${second}` : second;
  return hour == 0 ? `${min}:${second}` : `${hour}:${min}:${second}`;
}

// 日期格式化(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
Date.prototype.Format = function(fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  if (this == 'Invalid Date') return '';
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}