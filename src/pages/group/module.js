import { getGroupInfo, getGroupList, joinGroup, applyToJoinGroup } from './service'
import { Toast } from 'mint-ui'
import { getCommunityList } from '../community/index/service';
export default {
  namespaced: true,
  state: {
    group: {},
    groupFeedList: [],
    groupFeedTitle: ""
  },
  mutations: {
    SET_GROUP_INFO(state, param) {
      console.log("set group", param)
      state.group = param;
    },
    SET_GROUP_LIST(state, param) {
      console.log("set group list", param)
      state.groupFeedList = param;
    },
    SET_GROUP_FEED_TITLE(state, param) {
      console.log("set group title", param)
      state.groupFeedTitle = param;
    },

  },
  actions: {
    async getGroupInfo({ commit, state, rootState }, payload) {
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
    async getGroupList({ commit, state, rootState, dispatch }, payload) {
      try {
        let { data } = await getGroupList(payload);
        if (data.code === 0) {
          let arr = await data.result.data.map(x => {
            x.content = JSON.parse(x.content);
            return x;
          });
          // 没有群作品 则显示栏目贴子
          if (arr.length > 0) {
            commit("SET_GROUP_LIST", arr)
            commit("SET_GROUP_FEED_TITLE", "群作品")
          } else {
            dispatch("getCommunityList", { "communityid": state.group.group_info.communityid });
          }
        }
      } catch (error) {
        console.error("getGroupList", error)
      }
    },
    async getCommunityList({ commit, state, rootState }, payload) {
      console.log(payload)
      try {
        let { data } = await getCommunityList(payload);
        console.log("getCommunityList", data)
        if (data.code === 0) {
          let arr = await data.result.data.map(x => {
            if (x.content) {
              x.content = JSON.parse(x.content);
            }
            return x;
          });
          commit("SET_GROUP_LIST", arr)
          commit("SET_GROUP_FEED_TITLE", "热门文章")
        }
      } catch (error) {
        console.error("getGroupList", error)
      }
    },
    async joinGroup({ commit, state, rootState }, {
      classid,
      join_limit
    }) {
      let self = this,
        para;
      console.log('join_limit:',join_limit)
      if (join_limit == 0) {
        para = {
          classid,
        }
        let {data} = await joinGroup(para)
        return data.code == 0
      } else if (join_limit == 1) {
        para = {
          id: classid || state.group.group_info.id,
          type: 'group',
          name: state.group.group_info.name || '',
          communityId: state.group.group_info.communityid || ''
        }
        let {data} = await applyToJoinGroup(para)
        return data.code == 0
      } else {
        return false
      }
    }
  }
}