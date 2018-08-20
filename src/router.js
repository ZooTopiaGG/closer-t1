import Vue from 'vue';
import Router from 'vue-router';
import { Toast } from 'mint-ui';
import { checkType } from './utils'

const Comment = () =>
    import ('@/pages/comment/index')

// 长图文
const Article = () =>
    import ('@/pages/article/index/index')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/article/:id',
        name: 'article',
        component: Article,
    }, {
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
    if (path.includes('feed') && query.int_type && query.category_type) {
        let routerPath = checkType(parseInt(query.int_type), parseInt(query.category_type));
        router.push(path.replace("feed", routerPath));
        next();
    } else {
        next();
    }
})
export default router