import { addReply, getAdcookie } from './service'
import { Toast, Indicator } from 'mint-ui'

export default {
  namespaced: true,

  state: {
    visible: false,
    replyData: {},
  },
  mutations: {
    updateData(state, payload) {
      console.log(1,payload)
      state.replyData = payload
    }
  },
  actions: {
    async addReplyData({ commit }, payload) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      console.log(2, payload)
      let { data } = await addReply(payload).catch(err => {
        Indicator.close()
        Toast('网络开小差啦~')
      })
      console.log('2-data---', data)
      Indicator.close()
      if(typeof(data.code) != undefined && data.code == 0) {
        commit({
          type: 'updateData',
          data
        })
      } else {
        data.result && Toast(data.result)
      }
    },

    async getAdCookie({ rootState }, payload) {
      let { data } =    await getAdcookie(payload).catch(err => {
        Toast('网络开小差啦~')
      })
      if(typeof(data.code) != undefined && data.code == 0) {
        console.log(1, data)
        if (data.result) {
          let result = data.result;
          if (result.udid) {
              Cookies.set("uid", result.udid, { expires: 30 })
          }
      }
      return null;
      } else {
        data.result && Toast(data.result)
      }
    }
  }
}