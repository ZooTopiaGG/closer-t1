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
  let pathName = path.split('/').slice(1),
    {
      type,
      category
    } = query;
  // 根据meta设置页面title
  document.title = meta.title ? meta.title : '贴近';
  // 根据path和query跳转到对应页面
  switch (pathName[0]) {
    case 'feed':
      if (type == '2') {
        if (category == '3') {
          // 神议论
          router.replace({
            path: path.replace("feed", "comment")
          })
        } else {
          router.replace({
            path: path.replace("feed", "article")
          })
        }
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