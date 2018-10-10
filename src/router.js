import Vue from 'vue';
import Router from 'vue-router';
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

// jssdk DEMO
const Jssdk = () =>
  import ('@/pages/jssdk/index')


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
    path: "/jssdk",
    name: 'jssdk',
    component: Jssdk,
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
  /**
   * @type 帖子类型
   *  0 - 图片
   *  1 - 视频
   *  2 - 长图文
   *    @category 长图文下类型，以此判断是否有留言功能
   *       0 - 普通贴子(用户投到栏目的) 有
   *       1 - 征稿(栏目运营人员发出) 没有留言功能
   *       2 - 投稿到征稿(用户投的)
   *       3 - 神议论(班长合成的)
   *       5 - 官方普通(栏目运营人员发出的)
   */
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