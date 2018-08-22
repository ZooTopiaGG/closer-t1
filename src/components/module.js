import { getHotSubject } from './service'
import { Toast } from 'mint-ui'
import { makeHtmlContent } from '../utils'

export default {
    namespaced: true,
    state: {
        hotSubjects: []
    },
    mutations: {
        setHotSubjects(state, payload) {
            console.log("hotSubject", payload)
            state.hotSubjects = payload;
        }
    },
    actions: {
        async getHotSubject({ commit }, payload) {
            console.log("hotSubject")
            let { data } = await getHotSubject(payload).catch(function() {
                Toast("网络开小差啦~")
            })

            if (typeof(data.code) != "undefined" && data.code == 0) {
                let arr = data.result.data.map(x => {
                    if (x.content) {
                        x.content = JSON.parse(x.content);
                    }
                    return x;
                });
                commit("setHotSubjects", arr);
            }
        }
    }
}