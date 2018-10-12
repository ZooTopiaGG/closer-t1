import {
  getCode,
  Login,
  getAuthPath,
  loginWithWechat
} from './service'
import {
  Toast,
  Indicator
} from 'mint-ui'

export default {
  namespaced: true,

  state: {
    visible: false,
    smsCode: ''
  },
  mutations: {
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
    }
  },
  actions: {
    async getWxAuth({ commit, state }, payload) {
      console.log('getWxAuth')
      let data = await getAuthPath(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      console.log(data.data.result)
      if(typeof(data.data.code != undefined) && data.data.code == 0) {
        location.href = data.data.result
        commit('setAuthStatus')
        console.log('state.authSuccess---', state.authSuccess)
      } else {
        data.result && Toast(data.result)
        // next()
      }
    },
    async getUserInfoWithWx({ commit, state }, payload) {
      console.log(payload)
      let user = Cookies.get('user')
      let token = Cookies.get('GroukAuth')
      if(user && token) {
        console.log('user-from-cookie:', JSON.parse(user));
        commit('SET_USER', JSON.parse(user));
        return true;
      } else {
        
        let { data } = await loginWithWechat(payload).catch(err => {
          Toast('网络开小差啦~')
        })
        console.log('data:', data)
        if(typeof(data.code != undefined) && data.code == 0) {
          user = data.result.user
          token = data.result.token
          console.log('user-from-server:', user)
          commit('SET_USER', user)
          console.log('token', token)
          console.log('user', user)
          Cookies.set('GroukAuth', token, {
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
      } = await getCode(payload).catch(err => {
        Indicator.close()
        Toast('网络开小差啦~')
      })
      Indicator.close()
      if (typeof (data.code) != undefined && data.code == 0) {
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
      } = await Login(payload).catch(err => {
        Indicator.close()
        Toast('网络开小差啦~')
      })
      Indicator.close()
      if (typeof (data.code) != undefined && data.code == 0) {
        if (data.result && data.result.token) {
          Cookies.set("GroukAuth", data.result.token, {
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
    }
  }
}