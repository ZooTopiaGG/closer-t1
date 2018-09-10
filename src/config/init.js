import { host, server } from './config';
import api from './api';

let UA = navigator.userAgent.toLowerCase(),
  HREF = location.href,
  ENV = window.ENV = {},
  SERVER = '';

// 设置环境变量
function initENV() {
  ENV.app = /closer-(android|ios)/.test(UA), // 贴近客户端
  ENV.wx = /micromessenger/.test(UA), // 微信客户端
  ENV.ios = /((iphone\sos)\s([\d_]+))|(-ios)/.test(UA), // ios
  ENV.android = /((android);?[\s\/]+([\d.]+)?)|(-android)/.test(UA); // 安卓
  // ENV.weibo = /weibo/.test(UA), // 新浪微博
  // ENV.qq = /qq/.test(UA), // qq浏览器
  // ENV.safari = /version\/([\d.]+)([^S](safari)|[^M]*(mobile)[^S]*(safari))/.test(UA), // safari浏览器
  // ENV.chrome = /chrome\/([\d.]+)/.test(UA) || /crios\/([\d.]+)/.test(UA), // chrome浏览器
  // ENV.firefox = /firefox\/([\d.]+)/.test(UA), // firefox浏览器
  // ENV.ie = /msie\s([\d.]+)/.test(UA) || /trident\/[\d](?=[^\?]+).*rv:([0-9.].)/.test(UA) // ie浏览器

  // 根据href值设置当前开发环境（build,sandbox,dev）
  for (let key in host) {
    let index = HREF.indexOf(key);
    (index == 7 || index == 8) && (ENV.env = key)
  }
  SERVER = server[ENV.env];
};
// 设置api值
function initApi(obj) {
  for (let key in obj) {
    let value = obj[key];
    if(Object.prototype.toString.call(value) == '[object Object]') {
      initApi(value)
    } else {
      Object.defineProperty(obj, key, {
        get() {
          return SERVER + value;
        }
      })
    }
  }
};

export default function() {
  initENV();
  initApi(api);
}