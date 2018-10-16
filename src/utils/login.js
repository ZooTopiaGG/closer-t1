/**
 * 登录逻辑
 * app端内、微信授权、手机号绑定
 * 返回promise对象，结果为取到的用户数据
 */

import baseUrl from '../config';
import api from '../config/api';

let UA = navigator.userAgent.toLowerCase() || navigator.userAgent.toLowerCase(),
  query = getQueryString(),
  ENV = {
    app: /closer-(android|ios)/.test(UA), // 贴近客户端
    wx: /micromessenger/.test(UA), // 微信客户端
    ios: /((iphone\sos)\s([\d_]+))|(-ios)/.test(UA), // ios
    android: /((android);?[\s\/]+([\d.]+)?)|(-android)/.test(UA), // 安卓
  };

function checkToken() {
  return !!Cookies.get('token');
}

function getUserInfo(params) {
  if (ENV.wx) {
    return getUserInfoInWx(params)
  } else {
    return getUserInfoInApp()
  }
}

function getQueryString(url = location.href) {
  let search = new(URL || webkitURL)(url).search.substr(1),
    queryArr = search.split('&');
  return queryArr.reduce((q, i) => {
    let kv = i.split('=');
    kv[0] && (q[kv[0]] = kv[1]);
    return q
  }, {})
}

function login(params) {
  return new Promise((resolve, reject) => {
    if (checkToken()) {
      resolve(getUserInfo(params))
    } else if (ENV.app) {
      resolve(nativeLogin())
    } else if (ENV.wx) {
      resolve(wxLogin(params))
    } else {
      resolve(phoneLogin())
    }
  })
}

function nativeLogin() {
  return new Promise((resolve, reject) => {
    if (ENV.ios) {
      setTimeout(() => {
        setupWebViewJavascriptBridge(function(bridge) {
          if (bridge) {
            //ios获取用户token 判断登录
            bridge.callHandler("getUserToken", null, function(token, responseCallback) {
              if (token) {
                Cookies.set("token", token, {
                  expires: 30
                });
              } else {
                bridge.callHandler("jumpLogin", null);
              }
              resolve(getUserInfoInApp())
            });
          }
        })
      }, 500)
    } else if (ENV.android) {
      //安卓检查登录状态
      if (typeof window.bridge != "undefined") {
        let token = window.bridge.getUserToken(null);
        if (token) {
          Cookies.set("token", token, {
            expires: 30
          });
        } else {
          window.bridge.jumpLogin(null);
        }
        resolve(getUserInfoInApp())
      }
    } else {
      reject('非app，不可登录！')
    }
  })
}

function getUserInfoInApp() {
  return axios.post(api.admin.user_show).then(({
    data
  }) => {
    if (data.result) {
      return data.result;
    } else {
      return null;
    }
  })
}

function wxLogin(params) {
  return new Promise((resolve, reject) => {
    if (query.code) {
      resolve(getUserInfoInWx(params))
    } else {
      let path = baseUrl.wxAuthorization + encodeURIComponent(baseUrl.href + '?params=' + JSON.stringify(query))
      axios.post(api.admin.get_auth_path, {
        path
      }).then(({
        data
      }) => {
        if (typeof(data.code) != "undefined" && data.code == 0) {
          location.href = data.result;
        } else {
          reject('网络开小差啦，请稍后再试')
        }
      })
    }
  }).catch(xhr => {
    throw new Error(xhr);
  })
}

function getUserInfoInWx(params) {
  let _params = Object.assign(params, {
    plateform: 2,
    code: query.code,
    inviter: query.inviter,
    protocol: "WEB_SOCKET"
  });
  return axios.post(api.admin.login_with_wechat, _params).then(({
    data
  }) => {
    if (data.code == 0) {
      user = data.result.user;
      token = data.result.token;
      console.log('user-from-server:', user);
      Cookies.set('token', token, {
        expires: 7
      })
      return user;
    } else {
      throw new Error(data.result);
    }
  })
}

function phoneLogin() {

}


export default {
  login,
  nativeLogin,
  wxLogin,
  phoneLogin
}