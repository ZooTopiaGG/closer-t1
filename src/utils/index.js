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
                    newM = x.replace(/src=/g, `style="width: ${nW};height: ${nH}; background: #e7e7e7; max-width: 100%;" data-index="${i+1}" data-src=`);
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
                    class='video-box video-box-native'
                    data-vid='${v}'
                    data-uid='${u}'
                    data-bg='${c}'>
                    <section 
                      class='video-play-wrap'
                      data-vid='${v}'
                      data-uid='${u}'
                      style=""
                      >
                      <img data-src='${c}'
                        class='video-play-poster'/>
                      <img data-src='data:image/png;base64,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'
                        class='video-play-icon'/>
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