import { getComments } from './service'
import { Toast } from 'mint-ui'

export default {
  namespaced: true,

  state: {
    messagelist: {
      data: []
    }
  },
  mutations: {
    setCommentList(state, payload) {
      console.log('setCommentList--', payload)
      state.messagelist = payload.data.result.data
      console.log(2, state.messagelist)
    }
  },
  actions: {
    async getCommentsList({ commit }, payload) {
      console.log('getCommentsList--', payload)
      let { data } = await getComments(payload).catch(err => {
        Toast('网络开小差啦~')
      }) 
      console.log('data--', data)
      if(typeof(data.code) != undefined && data.code == 0) {
        commit({
          type: 'setCommentList',
          data
        })
      }
    }
  }
}