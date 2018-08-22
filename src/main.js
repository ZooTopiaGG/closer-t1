import Vue from 'vue'
import App from './App'
import './assets/style/reset.less'
import './assets/style/common.css'
import './assets/style/content.less'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import axio from './utils/axio'
import Cookies from 'js-cookie';
import Vconsole from 'vconsole';
import MobileDetect from 'mobile-detect';
import Wx from 'weixin-js-sdk';
import VueLazyLoad from 'vue-lazyload';
import {
  Button,
  Field,
  Spinner,
  Swipe,
  SwipeItem
} from 'mint-ui';
import {
  compareVersion,
  isApp
} from './utils'


Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

if (/sandbox.tiejin/.test(window.location.href) || /127.0.0.1/.test(window.location.href) || /local.tiejin.cn/.test(window.location.href)) {
  const vconsole = new Vconsole()
  store.state.IS_DEV = true
}

window.Axios = axio;
window.Cookies = Cookies;
window.MobileDetect = MobileDetect;

window.setupWebViewJavascriptBridge = function(callback) { //jsBridge
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}


Vue.use(VueLazyLoad, {
  preload: 1.3,
  error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
  loading: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
  attempt: 1,
})

// 运行时动态设置
pageResize()
init();
window.onresize = pageResize;

function pageResize() { //px2rem
  let fontSize = Math.min(screen.width, document.documentElement.getBoundingClientRect().width) / 375 * 16
  document.documentElement.style.fontSize = (fontSize >= 32 ? 32 : fontSize) + 'px'
}

function init() {
  let ua = (navigator.userAgent || window.navigator.userAgent).toLowerCase();
  let state = store.state;
  state.UA = ua;
  state.V_1_2 = compareVersion(ua);
  state.IS_APP = /closer-(ios|android)/g.test(ua);
  state.IS_WX = /micromessenger/g.test(ua);
  state.IS_IOS = /iphone/g.test(ua);
  state.IS_ANDROID = /android/g.test(ua);
  // 前端获取手机浏览器版本以及内核
  let nvgtype, nvgversion, nvgTypeToPowerCase;
    // window.navigator.appVersion 获取手机版本
  if (ua.indexOf('android') > -1 || ua.indexOf('adr') > -1 || ua.indexOf('linux') > -1) {
    // android终端
    nvgtype = 'android';
    nvgTypeToPowerCase = 'Android';
    // android版本
    if (!!ua.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))) {
      let v = ua.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))
      nvgversion = v[1].replace(/\./g, "_")
    }
  } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('safari') > -1) {
    // ios终端
    nvgtype = 'ios'
    nvgTypeToPowerCase = 'IOS'
    // ios版本 new RegExp("version/(\\d+(?:\\.\\d*)?)") // 匹配尽量少的一项
    // new RegExp("version/(\\d+(?:\\.\\d*)+)") 匹配尽量多的项
    if (!!ua.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))) {
      let v = ua.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))
      nvgversion = v[1].replace(/\./g, "_")
    }
  } else {
    nvgtype = 'windows'
    nvgTypeToPowerCase = 'Windows'
  }
  state.nvgversion = nvgversion;
  state.nvgtype = nvgtype;
  state.nvgTypeToPowerCase = nvgTypeToPowerCase;
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')