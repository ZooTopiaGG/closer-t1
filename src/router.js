import Vue from 'vue';
import Router from 'vue-router';
import api from './utils/api';
import Store from './store';
import { Toast } from 'mint-ui'


const Article = () =>
    import ('@/pages/article/index/index')

Vue.use(Router)

const router = new Router({

    mode: 'history',
    routes: [{
        path: '/article',
        name: 'article',
        component: Article,
    }]

})
router.beforeEach(({
    meta,
    path,
    query,
    name,
    params
}, from, next) => {
    document.title = meta.title ? meta.title : '贴近'
    next();
})

export default router