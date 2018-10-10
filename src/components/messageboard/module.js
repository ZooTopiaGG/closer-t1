import { getComments, isLike, getAuthPath, loginWithWechat } from './service'
import { Toast } from 'mint-ui'

export default {
  namespaced: true,

  state: {
    user: {},
    wxurl: '',
    messagelist: {
      data: []
    }
  },
  mutations: {
    // 设置微信授权后用户信息
    SET_USER(state, para) {
      state.user = para
      state.isLogin = true;
    },
    setCommentList(state, payload) {
      state.messagelist = payload.data.result.data
    }
  },
  actions: {
    async getCommentsList({ commit }, payload) {
      console.log('getCommentsList--', payload)
      let { data } = await getComments(payload).catch(err => {
        Toast('网络开小差啦~')
      }) 
      if(typeof(data.code) != undefined && data.code == 0) {
        commit({
          type: 'setCommentList',
          data
        })
      }
    },
    async checkIsLike({ commit }, payload) {
      let data = await isLike(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      if(typeof(data.code != undefined) && data.code == 0) {
        
      } else {
        data.result && Toast(data.result)
      }
    },
    async getWxAuth({ commit, state }, payload) {
      console.log('getWxAuth')
      let data = await getAuthPath(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      console.log(data.data.result)
      if(typeof(data.data.code != undefined) && data.data.code == 0) {
        location.href = data.data.result
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
    }
  }
}