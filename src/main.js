import Vue from 'vue'
import App from './App'
// import './reset.css'
import './assets/style/reset.less'
import './assets/style/common.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import axio from './utils/axio'
import Cookies from 'js-cookie';
import Vconsole from 'vconsole';
import MobileDetect from 'mobile-detect';
import wx from 'weixin-js-sdk';

if (/sandbox.tiejin/.test(window.location.href) || /127.0.0.1/.test(window.location.href) || /10.3.0.107/.test(window.location.href)) {
    const vconsole = new Vconsole()
    store.state.IS_DEV = true
    Cookies.set("IS_DEV", true, { expires: 1 });
}

window.wx = wx;
window.axios = axio;
window.Cookies = Cookies;
window.MobileDetect = MobileDetect;

window.setupWebViewJavascriptBridge = function(callback) { //jsBridge
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

Vue.use(MintUI)

// 运行时动态设置
pageResize()
window.onresize = pageResize;

function pageResize() { //px2rem
    let fontSize = Math.min(screen.width, document.documentElement.getBoundingClientRect().width) / 375 * 16
    document.documentElement.style.fontSize = (fontSize >= 32 ? 32 : fontSize) + 'px'
}


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')