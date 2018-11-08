import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'mint-ui'
import {
  makeHtmlContent,
  mergeJsonObject,
  wxShareConfig,
  makeFileUrl,
  replaceParamVal
} from "./utils";

import baseUrl from './config'

import common from './components/module'
import article from './pages/article/index/module'
import comment from './pages/comment/index/module'
import community from './pages/community/index/module'
import message from './pages/message/index/module'
import service from './components/service'
import group from './pages/group/module'
import draft from './pages/draft/module'
import video from './pages/video/index/module'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UA: "",
    IS_APP: false,
    IS_NEW_USER: false,
    IS_DEV: false,
    IMG_INDEX: 0,
    CONTENT_IMGS: [],
    content: '',
    res: {},
    exist: true,
    extension_text: '',
    alert_stat: false,
    is_follow: false,
    get_login_type: false,
    visibleLogin: '',
    h5Cookies: '',
    isLogin: false,
    user: {},
    h5Adid: '',
    extension_text: '', // 来自某个按钮的点击
    get_login_type: '', // toFocus 来自关注后弹窗 toDown 来自登录后直接跳转下载 inviter 来自奖励金,
    visibleLogin: false,
    authSuccess: false,
    res: {},
    exist: true,
    shareLink: "",
    preShow: false,
    preImgs: [],
    preIndex: 0,
    enter_time: 0, //进入页面时间
    duration_time: 0, //内容进度
    wxConfig: {

    },
    shareConfig: {
      title: "贴近一点，看身边",
      desc: "能赚稿费的本地内容社区",
      link: "",
      imgUrl: ""
    }
  },
  mutations: {
    // 设置贴子详情内容
    SET_CONTENT(state, para) {
      console.log("content", para)
      state.content = para
    },
    // 设置贴子是否被删除
    GET_EXIST_STATUS(state, para) {
      state.exist = para
    },
    // 设置贴子返回详情
    SET_RES(state, para) {
      state.res = para
    },
    SET_DISCUSS(state, payload) {
      state.discuss = payload;

    },
    // 设置来自某个按钮的状态
    SET_EXTENSION_TEXT(state, para) {
      state.extension_text = para
    },
    // 显示alert弹窗组件
    SHOW_ALERT(state, para) {
      state.alert_stat = para
    },
    // 设置关注状态
    SET_FOCUS_STAT(state, para) {
      state.is_follow = para
    },
    // 获取登录类型
    GET_LOGIN_TYPE(state, para) {
      state.get_login_type = para
    },
    // 分享feed
    SET_VISIBLE_LOGIN(state, para) {
      state.visibleLogin = para
    },
    // 前端获取手机浏览器版本以及内核
    GET_VERSION(state) {
      let nvg = navigator.userAgent.toLowerCase(),
        nvgtype, nvgversion, nvgTypeToPowerCase;
      // window.navigator.appVersion 获取手机版本
      if (nvg.indexOf('android') > -1 || nvg.indexOf('adr') > -1 || nvg.indexOf('linux') > -1) {
        // android终端
        nvgtype = 'android';
        nvgTypeToPowerCase = 'Android';
        // android版本
        if (!!nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))) {
          let v = nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))
          nvgversion = v[1].replace(/\./g, "_")
        }
      } else if (nvg.indexOf('iphone') > -1 || nvg.indexOf('ipad') > -1 || nvg.indexOf('safari') > -1) {
        // ios终端
        nvgtype = 'ios'
        nvgTypeToPowerCase = 'IOS'
          // ios版本 new RegExp("version/(\\d+(?:\\.\\d*)?)") // 匹配尽量少的一项
          // new RegExp("version/(\\d+(?:\\.\\d*)+)") 匹配尽量多的项
        if (!!nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))) {
          let v = nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))
          nvgversion = v[1].replace(/\./g, "_")
        }
      } else {
        nvgtype = 'windows'
        nvgTypeToPowerCase = 'Windows'
      }
      state.nvgversion = nvgversion;
      state.nvgtype = nvgtype;
      state.nvgTypeToPowerCase = nvgTypeToPowerCase
    },
    // 设置h5cookies到浏览器
    SET_H5COOKIES(state, para) {
      console.log("h5", para)
      state.h5Cookies = para
    },
    // enter page time 
    SET_ENTER_TIME(state, para) {
      state.enter_time = para
    },
    SET_DURATION_TIME(state, para) {
      state.duration_time = para
    },
    // 设置微信授权后用户信息
    SET_USER(state, para) {
      state.user = para
      state.isLogin = true;
    },
    setAuthStatus(state) {
      state.authSuccess = true
    },
    SET_WX_CONFIG(state, para) {
      state.wxConfig = para
    }
  },
  modules: {
    common,
    article,
    comment,
    community,
    message,
    group,
    draft,
    video
  },
  actions: {
    getWxAuth({
      commit,
      state
    }, payload) {
      console.log('getWxAuth')
      let _params = {
        path: baseUrl.wxAuthorization + encodeURIComponent(baseUrl.href + payload)
      }
      return service.getAuthPath(_params).then(({ data }) => {
        console.log(data.result)
        if (typeof(data.code != undefined) && data.code == 0) {
          location.href = data.result
          commit('setAuthStatus')
          console.log('state.authSuccess---', state.authSuccess)
        } else {
          data.result && Toast(data.result)
        }
      }).catch(err => {
        Toast('网络开小差啦~')
      })
    },
    getUserInfoWithWx({
      commit,
      state
    }, payload) {
      console.log(payload)
      let user = Cookies.get('user')
      let token = Cookies.get('token')
      if (user && token) {
        console.log('user-from-cookie:', JSON.parse(user));
        commit('SET_USER', JSON.parse(user));
        return true;
      } else {
        return service.loginWithWechat(payload).then(({ data }) => {
          console.log('data:', data)
          if (typeof(data.code != undefined) && data.code == 0) {
            user = data.result.user
            token = data.result.token
            console.log('user-from-server:', user)
            commit('SET_USER', user)
            console.log('token', token)
            console.log('user', user)
            Cookies.set('token', token, {
              expires: 7
            })
            Cookies.set('user', user, {
              expires: 7
            })
            return user
          } else {
            data.result && Toast(data.result)
            return false
          }
        }).catch(err => {
          Toast('网络开小差啦~')
        })
      }
    },
    // h5设置cookies埋点
    async get_adcookie({
      commit,
      state
    }, {
      webUdid
    }) {
      let self = this
      try {
        let para = {
          webUdid: webUdid
        }
        let data = await service.get_adcookie(para)
        if (data.code === 0) {
          Cookies.set("h5cookies", data.result.udid)
        }
      } catch (e) {
        console.log('e==', e)
      }
    },
    // 点击下载按钮时调用get_adcookies做统计
    async down_adcookies({
      state,
      rootState,
      commit
    }) {
      let self = this,
        para = {
          webUdid: false,
          deviceType: rootState.nvgtype || 'ios',
          deviceVersion: rootState.nvgversion || '11_0_0',
          adid: Cookies.get('h5Adid') || 'closer-t1'
        }
      let data = await service.get_adcookie(para)
      return true
    },
    // 点击下载按钮时统计
    // 通用h5分享统计，目前主要针对 帖子 栏目 群组 活动
    async down_statistics({
      state,
      commit
    }, {
      p1
    }) {
      var userId, h5cookie;
      if (Cookies.get("user")) {
        userId = JSON.parse(Cookies.get("user")).objectID;
      } else if (state.auth) {
        userId = state.auth.objectID;
      } else {
        userId = null
      }
      if (state.h5Cookies) {
        h5cookie = state.h5Cookies
      } else {
        h5cookie = null
      }
      let self = this,
        p2 = {
          userId: userId, // '用户ID，用户全网唯一标示，级别从高到底：userId>deviceId>cookie，userId，deviceId，cookie三个中必须要传一个'
          deviceId: null, //	'设备ID，移动设备的唯一标示，比如iOS系统的IDFA、IDFV，安卓系统的IMEI，mac地址等 ，userId，deviceId，cookie三个中必须要传一个'
          cookie: h5cookie, //	'cookie，以H5接入时使用，userId，deviceId，cookie三个中必须要传一个'
          platform: "H5", //	'设备平台,参数取值:Android IOS H5'
          attachPlatform: state.nvgTypeToPowerCase || null, //	'H5的载体，当platform为H5时，如果设备为安卓设备，则传Android，IOS设备则传IOS，其他不传'
          communityId: state.res.communityid || null, //		'栏目id,统计对象有该属性则需要填写'
          title: state.res.title || null, //		'标题 如果是文章或视频该参数需要上传'
          dreason: null, //		'负反馈内容，当action为feedback时必填，格式为：["负反馈内容1", "负反馈内容2"]'
          time: Date.now(), //		'行为发生的时间戳，单位毫秒'
          cost: Date.now() - state.enter_time || 0, //		'浏览时长/曝光时长，单位毫秒'
          totalTime: state.duration_time || 0, //		'内容总时长，单位毫秒
        }
      let para = await mergeJsonObject(p1, p2);
      let data = await service.common(para);
      if (data.code === 0) {
        return true
      }
    },
    async wx_config({ state, commit }, payload) {
      if (ENV.wx) {
        console.log("wx_config")
        let params = {
          url: location.href
        };
        let { data } = await service.wechatConfig(params).catch(err => {
          Toast('网络开小差啦，请稍后再试')
          return;
        })
        if (typeof(data.code) != "undefined" && data.code == 0) {
          commit('SET_WX_CONFIG', data.result);
          let wxConfig = data.result;
          let title, imgUrl, desc, author, link;
          let { res, content, group } = state;
          if (JSON.stringify(res) == "{}" && JSON.stringify(group.group) == "{}") {
            console.info("not index")
            if (Cookies.get("shareConfig")) {
              wxShareConfig(wxConfig, JSON.parse(Cookies.get("shareConfig")))
            }
            return;
          }
          if (location.href.indexOf("/community") > -1) {
            // 分享栏目主页
            title = res.name ?
              res.name :
              "栏目主页";
            desc = res.description ?
              res.description :
              "贴近一点 看身边";
            imgUrl = res.slogo ?
              res.slogo :
              res.blogo;
          } else if (location.href.indexOf("/group") > -1) {
            console.log("res", JSON.stringify(group.group))
              // 分享群组
            if (
              group.group &&
              group.group.group_info.group
            ) {
              let group = group.group.group_info.group;
              title = group.name ? group.name : "贴近群组";
              if (group.description) {
                let description;
                try {
                  description = JSON.parse(
                    group.group.group_info.group.description
                  );
                  desc = description[0].content ?
                    description[0].content :
                    "贴近一点 看身边";
                } catch (e) {
                  desc =
                    group.group.group_info.group.description;
                }
              } else {
                desc = "贴近一点 看身边";
              }
              imgUrl = makeFileUrl(group.avatar);
            }
          } else {
            console.log("content", content)
            let authorName = res.user.attributes.roster.name || res.user.fullname
            let shareAuthor = authorName.length > 6 ? (authorName.substr(0, 6) + '...') : authorName
              // 分享长图文
            if (res.int_type === 0) {
              // 图集
              if (content.text) {
                title = content.text;
              } else {
                title = "分享图片";
              }
              if (content.images && content.images.length > 0) {
                // let d = content.images.map(x => {
                //   x = `[图片]\n贴近 @${shareAuthor} 出品`;
                //   return x;
                // });
                desc = `[图片]\n贴近 @${shareAuthor} 出品`;
                imgUrl = makeFileUrl(content.images[0].link);
              } else {
                desc = `[图片]\n贴近 @${shareAuthor} 出品`;
                imgUrl = "";
              }
            } else if (res.int_type === 1) {
              // 视频
              if (content.text) {
                title = content.text;
              } else {
                title = "分享视频";
              }
              if (content.videos && content.videos.length > 0) {
                let d = content.videos.map(x => {
                  x = `[视频]\n贴近 @${shareAuthor} 出品`;
                  return x;
                });
                desc = d.join(" ");
                imgUrl = makeFileUrl(content.videos[0].imageUrl);
              } else {
                desc = `[视频]\n贴近 @${shareAuthor} 出品`;
                imgUrl = "";
              }
            } else if (res.int_type === 2 && (res.int_category == 1 || res.int_category == 2)) {
              console.log("征稿分享", res)
              imgUrl = makeFileUrl(res.cover) ?
                makeFileUrl(res.cover) : 'https://h5-qa.tiejin.cn/_nuxt/img/a6fa258.png'
              if (res.int_category == 1) {
                title = res.title;
                desc = `贴近号： ${res.communityName.substring(0,10)}`
                if (res.collectionTotalCount > 0) {
                  desc += `\n ${res.collectionTotalCount}参与`;
                }
              } else if (res.int_category == 2) {
                title = res.releaseSubjectTitle;
                desc = content.summary ? content.summary.substring(0, 14) : "分享文章";
              }
              if (res.user.attributes.roster.name || res.user.fullname) {
                author = `贴近 @${shareAuthor} 出品`;
                desc = `${desc}\n${author}`;
              }
            } else {
              // 长图文
              if (res.title) {
                title = res.title;
              } else if (content.text) {
                title = content.text;
              } else {
                title = content.summary;
              }
              desc = content.summary ? content.summary.substring(0, 14) : "分享文章";
              if (res.user.attributes.roster.name || res.user.fullname) {
                author = `贴近 @${shareAuthor} 出品`;
                desc = `${desc}\n${author}`;
              }
              imgUrl = makeFileUrl(res.bigcover) ?
                makeFileUrl(res.bigcover) :
                makeFileUrl(res.cover);
            }
          }

          if (location.href.indexOf("?") > -1) {
            if (location.href.indexOf("sto") > -1 && location.href.indexOf("udid") > -1) {
              link = replaceParamVal(location.href, "sto", "weixin2share");
              link = replaceParamVal(link, "udid", Cookies.get("h5cookies"));
            } else {
              link = `${location.href}&sto=weixin2share&udid=${Cookies.get("h5cookies")}`
            }
          } else {
            link = `${location.href}?sto=weixin2share&udid=${Cookies.get("h5cookies")}`
          }
          let shareConfig = {
            title,
            desc,
            imgUrl,
            link
          }
          Cookies.set("shareConfig", shareConfig)
          wxShareConfig(wxConfig, shareConfig)
        }
      } else {
        return;
      }
    }
  }

})