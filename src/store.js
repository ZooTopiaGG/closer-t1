import Vue from 'vue'
import Vuex from 'vuex'

import article from './pages/article/index/module'
import comment from './pages/comment/index/module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UA: "",
        IS_APP: false,
        IS_NEW_USER: false,
        IS_DEV: false,
        IMG_INDEX: 0,
        CONTENT_IMGS: []

    },
    modules: {
        article,
        comment
    }
})