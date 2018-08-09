import settings from '../config';
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
export function dateFormat(time) {
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
    return year + "-" + month + "-" + day;
}



// 富文本处理
export function makeHtmlContent(html, status) {
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
                // _src,
                newM,
                nH,
                minH;
            if (srcArray) {
                // _src = srcArray[1].replace(/\+/g, "%2b");
                if (widthArray && heightArray) {
                    if (widthArray[1] < 200) {
                        nW = widthArray[1] + 'px';
                        nH = heightArray[1] + 'px';
                    } else {
                        nW = '100%';
                        nH = heightArray[1] * 100 / widthArray[1] + "%";
                    }
                    minH = nH;
                    newM = x.replace(/src=/g, `style="width: ${nW};height: 0; padding-bottom: ${nH}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy" data-index="${i+1}" data-src=`);
                } else {
                    nW = '100%';
                    nH = "auto";
                    minH = '28.27vw';
                    newM = x.replace(/src=/g, `style="width: ${nW}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy2" data-index="${i+1}" data-src=`);
                }
            } else {
                newM = '';
            }

            // 正则替换富文本内的img标签
            // 替换不同文本
            html = html.replace(x, newM);
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
        let flg;
        pVideo.forEach((x, i) => {
            // 匹配imageurl属性下的值
            let urlArray = x.match(regexUrl),
                // 匹配vid属性下的值
                vidArray = x.match(regexVid),
                coverArray = x.match(regexCover),
                posterArray = x.match(regexPoster),
                v, u, c
                // // 替换插入需要的值flg
            v = vidArray ? vidArray[1] : '';
            u = urlArray ? urlArray[1] : '';
            if (coverArray) {
                c = coverArray[1]
            } else {
                c = posterArray ? posterArray[1] : ''
            }
            // let temp = pVideo[i].split('<p>');
            if (status) {
                flg = `<section 
                    class='imgbox tiejin-videobox'
                    data-vid='${v}'
                    data-uid='${u}'
                    >
                    <video src='${urlArray[1]}'
                      class='feed-video-bg'
                      controls
                      preload='none'
                      data-bg='${c}'>
                    </video>
                  </section>`;
            } else {
                flg = `<section 
                    class='imgbox video-native-player tiejin-videobox-native feed-video-bg'
                    data-vid='${v}'
                    data-uid='${u}'
                    data-bg='${c}'
                    style='background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==");'>
                    <section 
                      class='flex 
                      flex-align-center 
                      flex-pack-center'
                      data-vid='${v}'
                      data-uid='${u}'
                      >
                      <span 
                        class='icon-shipin-2' 
                        data-vid='${v}'
                        data-uid='${u}'
                        >
                      </span>
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
 *       图片地址处理
 */

export function makeFileUrl(url, type, size) {
    let filePath = settings.fileUrl;
    if (Store.state.IS_DEV) {
        filePath = settings.fileDevUrl;
    }
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


export function appPlayVideo(v, u) {
    let vid = v ? v : null,
        uid = u ? u : null;
    console.log(v, "---", u)
    let isIos = Store.state.UA.indexOf("closer-ios") > -1 ? true : false;
    if (Store.state.V_1_2) {
        if (isIos) {
            if (window.WebViewJavascriptBridge) {
                this.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler("playVideo", {
                        vid: vid,
                        url: uid
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

export function compareVersion(nvg) {
    try {
        let b = nvg.split('closerapp/version/')[1].split('.');
        return b[0] > 1 || (b[0] == 1 && b[1] && b[1] > 1) || (b[0] == 1 && b[1] == 1 && b[2] && b[2] > 100)
    } catch (e) {
        return false
    }
}

export function isApp(ua) {
    return ua.indexOf("closer-ios") > -1 || ua.indexOf("closer-android") > -1
}