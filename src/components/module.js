import {
  addUrlParams
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
  hotColletions0: [],
  hotColletions1: []
}

const actions = {
  // 关注，取消关注栏目
  async get_focus_stat({
    commit
  }, {
    payload,
    after
  }) {
    let self = this
    try {
      let { data } = await service.subscription(payload);
      if (data.code === 0 && data.result) {
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
    after && after();
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
  async getWxAuth({
    commit,
    state
  }, { payload, before }) {
    console.log('getWxAuth', payload)
    let _params = {
      path: baseUrl.wxAuthorization + encodeURIComponent(baseUrl.href + addUrlParams(payload.path , payload.query))
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
      commit('SET_USER', JSON.parse(user));
      return true;
    } else {

      let {
        data
      } = await service.loginWithWechat(payload).catch(err => {
        Toast('网络开小差啦~')
      })
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
    if (Cookies.get("uid")) {
      payload['udid'] = Cookies.get("uid");
    }
    if (Cookies.get("aid")) {
      payload['adid'] = Cookies.get("aid");
    }
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
    commit
  }, payload) {
    let data = await service.isLike(payload).catch(err => {
      Toast('网络开小差啦~')
    })
    if (typeof(data.code != undefined) && data.code == 0) {

    } else {
      data.result && Toast(data.result)
    }
  },
  async getHotCollections({ commit }, payload) { //征稿精华、全部
    console.log("hotCollections", payload)
    if (typeof(payload.type) != "undefined") {
      // let { result, code } = await service.getCollections(payload).catch(err => {
      //     Toast('网络开小差啦~')
      //   })
      let { result, code } = {
        "result": {
          "data": [{
            "double_longitude": 0,
            "long_time_line": 0,
            "int_post_limit": 4,
            "int_use": 0,
            "bool_delete": false,
            "bool_tip": false,
            "isOffical": true,
            "title": "title",
            "int_read": 0,
            "userid": "9cvwbcsKxN",
            "articleUrl": "https://t1-sandbox.tiejin.cn/feed/wwyeHYLpsp9y?type=0&category=5",
            "content": '{"text":"直接发布_我是图片描述_凤凤测试栏目1_1539311591458","images":[{"link":"/public/9RARjdBbUY/%E9%95%BF%E5%9B%BE1.jpg","width":500,"height":2852,"size":254840},{"link":"/public/9BcXjHwltE/%E6%88%91%E6%98%AF+GIF1.gif","width":500,"height":236,"size":988541},{"link":"/public/9vrQ6U2QdK/%E5%85%A8%E6%99%AF%E5%9B%BE1.jpg","width":1056,"height":300,"size":23147},{"link":"/public/9I8HvFmGat/1532499467000.jpg","width":750,"height":414,"size":283898},{"link":"/public/9I8Jxe750G/1532499611000.jpg","width":750,"height":930,"size":995935}]}',
            "view": 190,
            "double_latitude": 0,
            "release_subjectid": "0",
            "int_verify": 1,
            "int_release_type": 0,
            "long_publish_time": 1539311592651,
            "slogo": "http://file-sandbox.tiejin.cn/public/9Ayl8hpyrW/1531123167000.jpg",
            "communityName": "凤凤测试栏目1",
            "blogo": "http://file-sandbox.tiejin.cn/public/9cw0i80BHG/1526642448000.jpg",
            "long_create_time": 1539311592651,
            "bool_task": false,
            "int_category": 5,
            "authorsString": "",
            "commentNumber": 1,
            "long_like": 0,
            "like": 2,
            "int_type": 0,
            "isTask": false,
            "region_id": "wfXYXEpsBEyN",
            "long_view": 100,
            "subjectid": "wwyeHYLpsp9y",
            "long_update_time": 1539311592651,
            "tags": "0",
            "long_share": 2,
            "int_cover_mode": 0,
            "verify_user": "",
            "classid": "0",
            "int_new_source": 0,
            "shareUrl": "https://h5-sandbox.tiejin.cn/feed/wwyeHYLpsp9y?type=0&category=5",
            "communityid": "9cvwbctrap",
            "long_modify_time": 0,
            "user": {
              "gender": 2,
              "attributes": {
                "roster": {
                  "uid": "9cvwbcsKxN",
                  "gender": 0,
                  "name": "我是001花名",
                  "attributes": {
                    "security_signal": "02810000107"
                  },
                  "id": "9s1LpQfvi7",
                  "avatar": "/public/9s1LnfdCqZ/temp.jpg",
                  "community": "9cvwbctrap"
                }
              },
              "fullname": "凤凤栏目主名哈哈xx",
              "avatar": "/avatar/u/9cvwbcsKxN?v=1529488290734",
              "username": "12081040001"
            }
          }]
        },
        "code": 0
      }
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
  }
}

const mutations = {
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
    console.log("tab1")
    state.hotColletions1 = payload;
  },
  SET_HOT_COLLECTIONS0(state, payload) {
    console.log("tab0")
    state.hotColletions0 = payload

  }
}

export default {
  namespaced,
  state,
  actions,
  mutations
}