import { addReply, getAdcookie } from './service'
import { Toast, Indicator } from 'mint-ui'

export default {
  namespaced: true,

  state: {
    visible: false,
    replyData: {},
  },
  mutations: {
    show(state) {
      state.visible = true
    },
    hide(state) {
      state.visible = false
    },
    updateData(state, payload) {
      console.log(1, payload)
      state.replyData = payload
    }
  },
  actions: {
    async addReplyData({ commit, state }, payload) {
      commit({
        type: 'hide'
      })
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let { data } = await addReply(payload).catch(err => {
        Indicator.close()
        Toast('网络开小差啦~')
      })
      Indicator.close()
      if (typeof(data.code) != undefined && data.code == 0) {
        commit({
          type: 'updateData',
          data
        })
        commit({
          type: 'show'
        })
        console.log('state.show:', state.visible)
      } else {
        data.result && Toast(data.result)
      }
    }
  }
}