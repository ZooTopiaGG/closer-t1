import Vue from 'vue';
import Router from 'vue-router';
import api from './utils/api';
import Store from './store';
import { Toast } from 'mint-ui'

// test
const Test = {
    template: '<h1>test</h1>'
}

const Article = () =>
    import ('@/pages/article/index/index')

// 长图文
const Essay = () =>
    import ('@/pages/essay/index/index')

Vue.use(Router)

const router = new Router({

    mode: 'history',
    routes: [{
        path: '/',
        name: 'test',
        component: Test,
    }, {
        path: '/article',
        name: 'article',
        component: Article,
    }, {
        path: '/essay/:id',
        name: 'essay',
        component: Essay,
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