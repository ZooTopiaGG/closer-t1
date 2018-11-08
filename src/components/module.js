import {
  addUrlParams,
  makeHtmlContent
} from '../utils';
import service from './service';
import Cookie from 'js-cookie';
import {
  Toast,
  Indicator
} from 'mint-ui'

import baseUrl from '../config'
const namespaced = true;
const state = {
  h5Cookies: '',
  incr_view: 0,
  hotSubjects: [],
  visible: false,
  smsCode: '',
  isLogin: false,
  user: {},
  authSuccess: false,
  messagelist: {
    data: []
  },
  hotColletions0: null,
  hotColletions1: null,
  res: {},
  content: {},
  exist: true,
  discuss: {},
  like: false
}

const actions = {
  async getFocusState({ commit }, payload) {
    let { data } = await service.getCommunityShow({
      communityid: payload
    });
    if (data.code === 0) {
      // 获取关注状态
      if (data.result.isFollowed) {
        commit(
          "SET_FOCUS_STAT",
          data.result.isFollowed, {
            root: true
          }
        );
        commit(
          "SET_COMMUNITY",
          data.result, {
            root: true
          }
        );
      }
    }
  },
  // 关注，取消关注栏目
  async get_focus_stat({
    commit
  }, {
    payload,
    after
  }) {
    let self = this
    try {
      let data = await service.subscription(payload);
      console.log('focus:', after, data)
      if (data.code === 0) {
        if (payload.flag == 0) {
          commit('SET_FOCUS_STAT', false, {
            root: true
          })
        } else {
          commit('SET_FOCUS_STAT', true, {
              root: true
            })
            // Toast({
            //   message: '关注成功',
            //   position: 'top'
            // })
        }
        after && after();
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

  // 阅读数量
  async get_incr_view({
    commit
  }, params) {
    let self = this;
    try {
      let view = await service.incr_view(params);
      console.log(view)
        // 静态增加 阅读量
      if (view.code === 0) {
        commit("SET_INCR_VIEW", view.result);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getHotSubjects({
    commit
  }, params) {
    try {
      let data = await service.get_hot_subjects(params)
      if (data.code === 0) {
        data.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        })
        if (data.result.data) {
          commit("SET_HOT_SUBJECTS", data.result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getCommunitySubjects({
    commit
  }, params) {
    try {
      let data = await service.get_community_subjects(params)
      if (data.code === 0) {
        data.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        })
        if (data.result.data) {
          commit("SET_HOT_SUBJECTS", data.result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getWxAuth({
    commit,
    state
  }, { payload, before }) {
    console.log('getWxAuth', payload)
    let _params = {
      path: baseUrl.wxAuthorization + encodeURIComponent(baseUrl.href + addUrlParams(payload.path, payload.query))
    }
    before && before();
    let data = await service.getAuthPath(_params).catch(err => {
      Toast('网络开小差啦~')
    })
    console.log(data.data.result)
    if (typeof(data.data.code != undefined) && data.data.code == 0) {
      location.href = data.data.result
        // commit('setAuthStatus')
        // console.log('state.authSuccess---', state.authSuccess)
    } else {
      data.result && Toast(data.result)
        // next()
    }
  },
  async getUserInfoWithWx({
    commit,
    state
  }, payload) {
    console.log(payload)
    let user = Cookies.get('user')
    let token = Cookies.get('token')
    if (user && token) {
      console.log('user-from-cookie:', JSON.parse(user));
      commit('SET_USER', JSON.parse(user), {
        root: true
      });
      return true;
    } else {
      console.log('getUserInfoWithWx:', payload)
      let {
        data
      } = await service.loginWithWechat(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      console.log('data:')
      if (typeof(data.code != undefined) && data.code == 0) {
        user = data.result.user
        token = data.result.token
        console.log('user-from-server:', user)
        commit('SET_USER', user, {
          root: true
        })
        console.log('token', token)
        console.log('user', user)
        Cookies.set('token', token, {
          expires: 7
        })
        Cookies.set('user', user, {
          expires: 7
        })
        return true
      } else {
        data.result && Toast(data.result)
        return false
      }
    }
  },
  async getCode({
    commit
  }, payload) {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    let {
      data
    } = await service.getCode(payload).catch(err => {
      Indicator.close()
      Toast('网络开小差啦~')
    })
    Indicator.close()
    if (typeof(data.code) != undefined && data.code == 0) {
      commit({
        type: 'getSmsCode',
        data
      })
    } else {
      data.result && Toast(data.result)
    }
  },
  // 登录
  async login({
    rootState,
    state,
    commit
  }, payload) {
    console.log('login, payload ', payload)
    let phoneReg = /^(0|86|17951)?(1[23456789][0-9])[0-9]{8}$/
    if (payload.phone && !phoneReg.test(payload.phone)) {
      Toast('请输入正确的手机号');
      return;
    }
    if (payload.token.length == 0) {
      Toast("请输入验证码")
      return;
    }
    if (Cookies.get("h5cookies")) {
      payload['udid'] = Cookies.get("h5cookies");
    }
    payload.adid = Cookie.get('h5Adid') || 'closer-t1'
    payload['protocol'] = 'WEB_SOCKET';
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    let {
      data
    } = await service.Login(payload).catch(err => {
      Indicator.close()
      Toast('网络开小差啦~')
    })
    Indicator.close()
    if (typeof(data.code) != undefined && data.code == 0) {
      if (data.result && data.result.token) {
        Cookies.set("token", data.result.token, {
          expires: 60
        });
        if (data.result.user) {
          Cookies.set("user", JSON.stringify(data.result.user), {
            expires: 60
          });
          if (payload.push) {
            return data.result.user;
          }
        }
      }
      commit({
        type: 'hide'
      })
      return true;
    } else {
      Toast('网络开小差啦，请稍后再试')
      Indicator.close()
      return;
    }
  },
  async getCommentsList({
    commit
  }, payload) {
    console.log('getCommentsList--', payload)
    let {
      data
    } = await service.getComments(payload).catch(err => {
      Toast('网络开小差啦~')
    })
    if (typeof(data.code) != undefined && data.code == 0) {
      commit({
        type: 'setCommentList',
        data
      })
    }
  },
  async checkIsLike({
    commit, state
  }, payload) {
    if(state.like) return
    let data = await service.isLike(payload).catch(err => {
      Toast('网络开小差啦~')
    })
    let _data = data.data
    if (typeof(_data.code != undefined) && _data.code == 0) {
      commit('SET_LIKE')
    } else {
      data.result && Toast(data.result)
    }
  },
  async getHotCollections({ commit }, payload) { //征稿精华、全部
    if (typeof(payload.type) != "undefined") {
      let { result, code } = await service.getCollections(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      if (typeof(code) != undefined && code == 0) {
        if (parseInt(payload.type) == 0) {
          commit("SET_HOT_COLLECTIONS0", result.data) //全部
        } else if (parseInt(payload.type) == 1) {
          commit("SET_HOT_COLLECTIONS1", result.data) //精华
        }
      } else {
        result && Toast(result)
      }
    }
  },
  async fetch_content({
    commit,
    state
  }, params) {
    try {
      if (Cookies.get("h5cookies")) {
        params['udid'] = Cookies.get("h5cookies")
      }
      // 获取贴子详情
      let { data } = await service.fetchContent(params)
      if (data.code != 0) {
        // 贴子被删除状态
        commit("GET_EXIST_STATUS", false);
      } else {
        if (!window.ENV.app) {
          if (
            data.result.int_verify === 0 ||
            ((data.result.int_verify === -1 &&
                data.result.int_category != 4 &&
                data.result.int_category != 6) ||
              data.result.bool_delete)
          ) {
            commit("GET_EXIST_STATUS", false, { root: true });
            return;
          }
        }
        // 验证content
        if (data.result.content) {
          let content = JSON.parse(data.result.content);
          if (data.result.int_type === 2) {
            let _html = makeHtmlContent(
              content.html
            );
            if (_html) {
              content.html = _html;
            }
            if (content.discuss) {
              let discuss = content.discuss.map(x => {
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
              commit("SET_DISCUSS", discuss, { root: true });
            }
            if (data.result.int_category === 3 && content.end_html) {
              let end_html = makeHtmlContent(
                content.end_html
              );
              if (end_html) {
                content.end_html = end_html;
              }
            }
          }
          commit("SET_CONTENT", content, { root: true });
          delete data.result.content;
          commit("SET_RES", data.result, { root: true });
          commit("SET_FOCUS_STAT", data.result.isFollowed, { root: true });

        }
      }
    } catch (err) {
      console.log('content.catch', err)
      commit("GET_EXIST_STATUS", false);
      return;
    }
  }
}


const mutations = {
  // 设置贴子是否被删除
  GET_EXIST_STATUS(state, para) {
    state.exist = para
  },
  // 设置h5cookies到浏览器
  SET_H5COOKIES(state, para) {
    state.h5Cookies = para
  },
  // 设置阅读量
  SET_INCR_VIEW(state, para) {
    console.log('para:', para)
    state.incr_view = para
  },
  SET_HOT_SUBJECTS(state, para) {
    console.log("SET_HOT_SUBJECTS", para)
    state.hotSubjects = para
  },
  // 设置微信授权后用户信息
  SET_USER(state, para) {
    state.user = para
    state.isLogin = true;
  },
  setAuthStatus(state) {
    state.authSuccess = true
  },
  show(state) {
    state.visible = true
  },
  hide(state) {
    state.visible = false
  },
  getSmsCode(state, payload) {
    state.smsCode = payload
  },
  setCommentList(state, payload) {
    state.messagelist = payload.data.result.data
  },
  SET_HOT_COLLECTIONS1(state, payload) {
    state.hotColletions1 = payload;
  },
  SET_HOT_COLLECTIONS0(state, payload) {
    state.hotColletions0 = payload

  },
  SET_LIKE(state) {
    state.like = true
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations
}