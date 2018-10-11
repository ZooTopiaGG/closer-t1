import { getGroupInfo, getGroupList } from './service'
import { Toast } from 'mint-ui'
import { getCode } from '../../components/login/service';
export default {
  namespaced: true,
  state: {
    group: {},
    groupList: []
  },
  mutations: {
    SET_GROUP_INFO(state, param) {
      console.log("set group", param)
      state.group = param;
    },
    SET_GROUP_LIST(state, param) {
      console.log("set group list", param)
      state.groupList = param;
    },
  },
  actions: {
    async getGroupInfo({ commit, state }, payload) {
      try {
        let { data } = await getGroupInfo(payload);
        console.log("code", data)
        if (data.code === 0) {
          if (data.result) {
            commit("SET_GROUP_INFO", data.result)
          }
        }
      } catch (error) {
        console.error("getGroupInfo", error)
      }
    },
    async getGroupList({ commit, state }, payload) {
      try {
        let { data } = await getGroupList(payload);
        console.log("code", data)
        if (data.code === 0) {
          if (data.result) {
            commit("SET_GROUP_LIST", data.result)
          }
        }
      } catch (error) {
        console.error("getGroupList", error)
      }
    }
  }
}