import { fetchContent, getCommunityFocusStat } from './service';

import { makeHtmlContent } from "../../../utils/utils";
const state = {
  GET_MESSAGE_STATE: false,
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
            commit("SET_DISSCUSS", discuss);
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
  // 设置贴子详情内容
  SET_CONTENT(state, para) {
    state.content = para
  },
  // 设置贴子返回详情
  SET_RES(state, para) {
    state.res = para
  },
  // 设置神议论列表信息
  SET_DISSCUSS(state, para) {
    state.discuss = para
  },
  // 设置阅读量
  GET_INCR_VIEW(state, para) {
    state.incr_view = para
  },
  // 显示alert弹窗组件
  SHOW_ALERT(state, para) {
    state.alert_stat = para
  },

  // 竖视频
  ITS_LONG_VIDEO(state, para) {
    state.isLongVideo = para
  },
  // 设置底部悬浮显示状态
  SET_NO_FOOTER(state, para) {
    state.webNoFooter = para
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