import Vue from 'vue';
import Router from 'vue-router';
import api from './utils/api';
import Store from './store';
import {
    Toast
} from 'mint-ui'

//神议论
const Comment = () =>
    import ('@/pages/comment/index')

// 长图文
const Article = () =>
  import ('@/pages/article/index')

// 留言板 
const Draft = () =>
  import ('@/pages/draft/index/index')

// 留言板 
const Message = () =>
  import ('@/pages/message/index/index')

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
  }, {
    path: '/draft/:sid',
    name: 'draft',
    component: Draft,
  }, {
    path: '/message/:sid?/:id?',
    name: 'message',
    component: Message,
  }]

})
router.beforeEach(({
    meta,
    path,
    query,
    name,
    params
}, from, next) => {
    let pathName = path.split('/').slice(1),
        pathLength = pathName.length,
        {
            type,
            category
        } = query;
    // 根据meta设置页面title
    document.title = meta.title ? meta.title : '贴近';
    // 根据path和query跳转到对应页面
    switch (pathName[0]) {
        case 'feed':
            if (type == '2' && category == '0') {
                // 长图文
                router.replace({
                    path: path.replace("feed", "article")
                })
            } else if (type == '2' && category == '1') {
                // 征稿
                router.replace({
                    path: path.replace("feed", "draft")
                })
            } else if (type == '2' && category == '2') {
                // 神议论
                router.replace({
                    path: path.replace("feed", "comment")
                })
            } else {
                next();
            }
            break;
        default:
            next();
            break;
    }

})

export default router