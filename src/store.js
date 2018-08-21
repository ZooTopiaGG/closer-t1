import Vue from 'vue'
import Vuex from 'vuex'

import article from './pages/article/index/module'
import comment from './pages/comment/index/module'
import common from './components/module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UA: "",
        IS_APP: false,
        IS_NEW_USER: false,
        IS_DEV: false
    },
    modules: {
        article,
        comment,
        common
    }
})