import {
    getCommunityShow,
    getCommunityList,
    getSubscription,
    getGroupList
} from './service'
import {
    Toast
} from 'mint-ui'

export default {
    namespaced: true,
    state: {
        communityShow: {},
        groupList: {},
        descResult: {},
        isFollow: false,
        visible: false
    },
    mutations: {
        setCommunityShow(state, payload) {
            console.log('payload', payload)
            let data = payload.data
            state.communityShow = data.result
            console.log('communityShow', state.communityShow)
        },
        getGroupList(state, payload) {
            console.log('payload', payload)
            let data = payload.data
            state.groupList = data.result
            console.log('groupList', state.groupList)
        },
        getDescResult(state, payload) {
            console.log('payload', payload)
            state.descResult = payload
            console.log('descResult', state.descResult)
        },
        isFollow(state, payload) {
            console.log('payload', payload)
            state.isFollow = payload
        },
        show(state) {
            state.visible = true
        },
        hide(state) {
            state.visible = false
        },
    },
    actions: {
        async getCommunityShow({
            commit,
            state,
            rootState
        }, communityid) {
            let params = {
                communityid: communityid
            }
            let {
                data
            } = await getCommunityShow(params).catch(err => {
                Toast('网络开小差啦~')
            })

            console.log('data--', data)
            if (typeof (data.code != undefined && data.code == 0)) {
                commit({
                    type: "setCommunityShow",
                    data
                })
            } else {
                data.result && Toast(data.result)
            }
        },
        async getSubscription({
            commit,
            state,
            rootState
        }, payload) {
            let {
                data
            } = await getSubscription(payload).catch(err => {
                Toast('网络开小差啦~')
            })
            console.log('data', data)
            if (typeof (data.code != undefined) && data.code == 0) {
                if (data) {
                    commit("isFollow", true)
                    commit('show')
                    commit("SET_FOCUS_STAT", "true", {
                        root: true
                      });
                }
            } else {
                data.result & Toast(data.result)
            }
        },
        // 获取群组列表
        async getGroupList({
            commit,
            state
        }, payload) {
            let {
                data
            } = await getGroupList(payload).catch(err => {
                Toast('网络开小差啦~')
            })
            if (typeof (data.code != undefined) && data.code == 0) {
                commit({
                    type: "getGroupList",
                    data
                })
            } else {
                data.result && Toast(data.result)
            }
        }
    }
}