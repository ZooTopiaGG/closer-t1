import { fetchContent, getCommunityFocusStat } from './service';

import { makeHtmlContent, compareVersion } from "../../../utils/utils";
const state = {
  GET_MESSAGE_STATE: false,
  GET_IS_APP: false,
  GET_APP_TOKEN: '',
  version_1_2: false,
  agent: '',
  isPre: false,
  nvgversion: '',
  nvgtype: '',
  nvgTypeToPowerCase: '',
  res: {},
  content: {},
  discuss: {},
  isLongVideo: false,
  webNoFooter: true,
  exist: false,
  incr_view: 0,
  alert_stat: false
}

const actions = {
  // 获取文章内容
  async fetch_content({ commit, state }, { id }) {
    try {
      // 获取贴子详情
      let res = await fetchContent(id)
      if (res.code != 0) {
        // 贴子被删除状态
        // store.commit("GET_EXIST_STATUS", false);
      } else {
        // 验证content
        if (res.result.content) {
          var content = JSON.parse(res.result.content);
         
          // 解析长图文html
          if (res.result.int_type === 2) {
            let _html = makeHtmlContent(
              content.html,
              state.GET_MESSAGE_STATE
            );
            if (_html) {
              content.html = _html;
            }
            if (res.result.int_category === 3 && content.end_html) {
              let end_html = makeHtmlContent(
                content.end_html,
                state.GET_MESSAGE_STATE
              );
              if (end_html) {
                content.end_html = end_html;
              }
            }
          }
          if (content.discuss) {
            var discuss = content.discuss.map(x => {
              if (x.text) {
                let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
                let res = x.text.match(reg);
                if (res) {
                  x.weblink = true;
                  res.map(y => {
                    // 正则替换文本
                    let tag = `<a href="${y}" target="_blank">${y}</a>`;
                    let newtag = x.text.replace(reg, tag);
                    x.newText = newtag;
                  });
                } else {
                  x.weblink = false;
                }
              }
              return x;
            });
          }
          // 返回在渲染页面之前得结果
          commit("SET_CONTENT", content);
        }
        commit("SET_RES", res.result);
      }
    } catch (err) {
      commit("GET_EXIST_STATUS", false);
      throw err;
    }
  },
  async get_community_focus_stat({ commit, state }) {
    let communityFocusStat = await getCommunityFocusStat(state.res.communityid);
    if (communityFocusStat.code === 0) {
      // 获取关注状态
      if (communityFocusStat.result.isFollowed) {
        commit(
          "SET_FOCUS_STAT",
          communityFocusStat.result.isFollowed
        );
      }
    }
  },
  async get_incr_view({ commit }) {
    let self = this;
    try {
      let para = {
        subjectid: self.$route.params.id
      };
      let view = await axios.get(
        `${api.command.incr_view}?subjectid=${
          self.$route.params.id
        }&timestamp=${Date.now()}`
      );
      // 静态增加 阅读量
      if (view.code === 0) {
        self.$store.commit("GET_INCR_VIEW", view.result);
      }
    } catch (e) {
      console.log(e);
    }
  },
  // 通过code进行登录，如果get_wx_auth被调用，get_code_by_login才会被调用
  async get_code_by_login({ commit }, { code, inv_id, type }) {
    let self = this,
      para;
    // 注意： code 只能用一次，所以这里校验了 就不能再登录了，需要将校验放在登录里面
    // $router 是否存在 验证是否是奖励金登录
    if (type && type === 'bonus') {
      let unionId,
        nickName,
        avatar,
        paras = {
          code: code
        }
      // 校验账号是否存在
      let check = await self.$axios.$post(`${api.admin.check_wechat}`, paras)
      if (check.code != 0) {
        return false
      } else {
        if (check.result.hasRegist) {
          return false
        } else {
          unionId = check.result.unionId;
          nickName = check.result.nickName;
          avatar = check.result.avatar;
        }
      }
      if (inv_id) {
        para = {
          unionid: unionId,
          inviter: inv_id,
          nickName: nickName,
          avatar: avatar,
          protocol: "WEB_SOCKET",
          udid: Cookie.get('h5Cookies'),
          adid: Cookie.get('h5Adid') || 'closer-invitenew',
        }
      } else {
        return false
      }
    } else {
      para = {
        plateform: 2,
        code: code,
        protocol: "WEB_SOCKET",
        udid: Cookie.get('h5Cookies'),
        adid: Cookie.get('h5Adid') || 'closer-share'
      }
    }
    let data = await self.$axios.$post(`${api.admin.login_with_wechat}`, para);
    if (data.code === 0) {
      // 返回的数据
      let userInfo = {
        gender: data.result.user.gender,
        phones: data.result.user.phones,
        updateTime: data.result.user.updateTime,
        avatar: data.result.user.avatar,
        createTime: data.result.user.createTime,
        teamID: data.result.user.teamID,
        // 姓名
        fullname: data.result.user.fullname,
        security_signal: data.result.user.security_signal,
        objectID: data.result.user.objectID,
        email: data.result.user.email,
        username: data.result.user.username,
        status: data.result.user.status
      };
      let userToken = data.result.token;
      // // 存cookies
      Cookie.set('token', userToken, {
        expires: 7
      })
      Cookie.set('user', userInfo, {
        expires: 7
      })
      commit('SET_USER', userInfo)
      commit('SET_TOKEN', userToken)
      return true
    } else {
      return false
    }
  },
  // 通过token登录， 先获取cookie查看token是否过期 如果过期则调用授权，如果没有过期则调用get_token_by_login获取用户信息
  async get_token_by_login({ commit }, { phone, token, type }) {
    // 点击必须登录的按 钮，可获取cookie进行判断 信息
    // 邀新 inviter参数
    try {
      let self = this,
        para;
      if (type && type === 'bonus') {
        para = {
          type: 'phone',
          code: phone
        }
        let check = await self.$axios.$post(`${api.admin.check}`, para)
        if (check.code != 0) {
          Toast({
            message: '您不是新用户或者您已经领取过了',
            position: 'top'
          })
          location.href = '/invite/alreadyget'
          return false
        }
        if (Cookie.get('inviter')) {
          let inv = JSON.parse(Cookie.get('inviter'))
          para = {
            phone: phone,
            token: token,
            inviter: inv.id,
            udid: Cookie.get('h5Cookies'),
            adid: Cookie.get('h5Adid') || 'closer-invitenew',
            protocol: 'WEB_SOCKET'
          }
        } else {
          Toast({
            message: '该账号没有被邀请',
            position: 'top'
          })
          return false
        }
      } else {
        para = {
          phone: phone,
          token: token,
          udid: Cookie.get('h5Cookies'),
          protocol: 'WEB_SOCKET',
          adid: Cookie.get('h5Adid') || 'closer-share'
        }
      }
      let data = await self.$axios.$post(`${api.admin.closeruser_regist}`, para)
      if (data.code === 0) {
        let userInfo = {
          gender: data.result.user.gender,
          phones: data.result.user.phones,
          updateTime: data.result.user.updateTime,
          avatar: data.result.user.avatar,
          createTime: data.result.user.createTime,
          teamID: data.result.user.teamID,
          // 姓名
          fullname: data.result.user.fullname,
          security_signal: data.result.user.security_signal,
          objectID: data.result.user.objectID,
          email: data.result.user.email,
          username: data.result.user.username,
          status: data.result.user.status
        };
        let userToken = data.result.token;
        // // 存cookies
        Cookie.set('token', userToken, {
          expires: 7
        })
        Cookie.set('user', userInfo, {
          expires: 7
        })
        commit('SET_USER', userInfo)
        commit('SET_TOKEN', userToken)
        if (type && type === "bonus") {
          Toast({
            message: '领取成功，前往App直接领取',
            position: 'top'
          })
        }
        return true
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
        return false
      }
    } catch (err) {
      Toast({
        message: 'throw new error not be normal',
        position: 'top'
      })
      throw err;
    }
  },
  // 关注，取消关注栏目
  async get_focus_stat({ commit }, { communityid, flag }) {
    let self = this
    try {
      let para = {
        communityid: communityid,
        flag: flag
      }
      let data = await self.$axios.$post(`${api.community.subscription}`, para)
      if (data.code === 0) {
        if (flag == 0) {
          commit('SET_FOCUS_STAT', false)
        } else {
          commit('SET_FOCUS_STAT', true)
          // Toast({
          //   message: '关注成功',
          //   position: 'top'
          // })
          return true
        }
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
      }
    } catch (err) {
      Toast({
        message: err,
        position: 'top'
      })
    }
  },
}

const mutations = {
  // 设置特殊状态
  GET_USER_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行 判断路由类型
    let nvg = para.nvg.toLowerCase(),
     refer = para.ref,
     r = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1,
     _result = r || refer.indexOf('/invite') > -1;
    state.version_1_2 = compareVersion(nvg);     
    state.GET_MESSAGE_STATE = !_result;
    state.GET_IS_APP = r
    state.agent = nvg;
    state.isPre = refer.indexOf('?view=pre') > -1;
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
  // 设置贴子详情内容
  SET_CONTENT(state, para) {
    state.content = para
  },
  // 设置贴子返回详情
  SET_RES(state, para) {
    state.res = para
  },
  // 设置贴子是否被删除
  GET_EXIST_STATUS(state, para) {
    state.exist = para
  }
}

export default {
  state,
  actions,
  mutations
}