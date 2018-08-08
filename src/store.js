import Vue from 'vue'
import Vuex from 'vuex'
import comment from './pages/comment/index/module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UA: "",
        IS_APP: false,
        IS_NEW_USER: false,
        IS_DEV: false
    },
    modules: {
        comment,
    }
})