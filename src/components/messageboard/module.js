import { getComments, isLike, getAuthPath, loginWithWechat } from './service'
import { Toast } from 'mint-ui'

export default {
  namespaced: true,

  state: {
    user: {},
    wxurl: '',
    authSuccess: false,
    messagelist: {
      data: []
    }
  },
  mutations: {
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
    }
  }
}