import baseUrl from '../config/index';
import Store from '../store'

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
  location.href = "http://tiejin.cn/down?downurl=closer://jump";
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
          newM = x.replace(/src=/g, `style="width: ${nW}; height: ${nH}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy" data-index="${i+1}" data-src=`);
        } else {
          nW = '100%';
          nH = "auto";
          minH = '28.27vw';
          newM = x.replace(/src=/g, `style="width: ${nW}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy2" data-index="${i+1}" data-src=`);
        }
        Store.state.IMG_INDEX++;
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
    if (!isJumpOut()) {
      if (url.indexOf('?from=group') > -1) {
        let id = await this.getParam('groupid', url);
        location.href = `closer://jump/to/group`;
      } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
      } else {
        location.href = url;
      }
      setTimeout(() => {
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
      }, 1500)
      return;
    } else {
      if (url.indexOf('?from=group') > -1) {
        location.href = url
      } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
      } else {
        location.href = `${location.protocol}//${location.host}?downurl=${url}`;
      }
    }
  } else {
    location.href = `${location.protocol}//${location.host}`;
  }
}

// 统计方法
export async function down_statistics({ store, route, str, defaultStr, redirectUrl }) {
  let result = await store.dispatch("down_adcookies");
  if (result) {
    let _page, url, did = route.params.id || route.params.messageid,
      progress, _str, s = JSON.parse;
    if (route.path.indexOf("/community") > -1) {
      _page = "community";
      url = `closer://community/${did}`;
    } else if (route.path.indexOf("/feed") > -1 || route.path.indexOf("/article") > -1 || route.path.indexOf("/comment") > -1) {
      _page = "article";
      url = `closer://feed/${did}`;
      if (store.state.SUBJECT.int_type === 1) {
        _page = "video";
      } else {
        _page = "article";
      }
    } else if (route.path.indexOf("/group") > -1) {
      _page = "group";
      url = `closer://group/${did}`;
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
export function addUrlParams(url, params) {
  let str = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      str.push(`${key}=${params[key]}`)
    }
  }
  return url + (url.indexOf('?') > -1 ? '&' : '?') + str.join('&')
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


function loginAction() {

}