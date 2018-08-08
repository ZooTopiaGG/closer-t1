import Vue from 'vue';
import Router from 'vue-router';
import api from './utils/api';
import { compareVersion } from './utils'
import Store from './store';
import { Toast } from 'mint-ui'


const Comment = () =>
    import ('@/pages/comment/index')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/comment/:sid',
        name: 'comment',
        component: Comment,
    }]

})
router.beforeEach(({
    meta,
    path,
    query,
    name,
    params
}, from, next) => {
    document.title = meta.title ? meta.title : '贴近';
    let ua = navigator.userAgent || window.navigator.userAgent;
    ua = ua.toLowerCase();
    Store.state.UA = ua;
    Store.state.V_1_2 = compareVersion(ua)
    next();
})

export default router