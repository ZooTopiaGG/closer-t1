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
    compareVersion,
    isApp
} from './utils'

if (/sandbox.tiejin/.test(window.location.href) || /127.0.0.1/.test(window.location.href) || /local.tiejin.cn/.test(window.location.href)) {
    const vconsole = new Vconsole()
    store.state.IS_DEV = true
}
store.state.UA = window.Axios = axio;
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
    let ua = navigator.userAgent || window.navigator.userAgent;
    ua = ua.toLowerCase();
    store.state.UA = ua;
    store.state.V_1_2 = compareVersion(ua);
    store.state.IS_APP = isApp(ua);
}

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')