import Vue from 'vue'
import Vuex from 'vuex'
import {
  makeHtmlContent
} from "./utils";

import common from './components/module'
import article from './pages/article/index/module'
import comment from './pages/comment/index/module'
import draft from './pages/draft/index/module'
import message from './pages/message/index/module'
import login from './components/login/module'

import {
  fetchContent
} from './pages/article/index/service';

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
  },
  mutations: {
    // 设置贴子详情内容
    SET_CONTENT(state, para) {
      state.content = para
    },
    // 设置贴子是否被删除
    GET_EXIST_STATUS(state, para) {
      state.exist = para
    },
    // 设置贴子返回详情
    SET_RES(state, para) {
      state.res = para
    },
    // 设置来自某个按钮的状态
    SET_EXTENSION_TEXT(state, para) {
      state.extension_text = para
    },
    // 显示alert弹窗组件
    SHOW_ALERT(state, para) {
      state.alert_stat = para
    },
    // 设置关注状态
    SET_FOCUS_STAT(state, para) {
      state.is_follow = para
    },
    // 获取登录类型
    GET_LOGIN_TYPE(state, para) {
      state.get_login_type = para
    },
    // 分享feed
    SET_VISIBLE_LOGIN(state, para) {
      state.visibleLogin = para
    },
  },
  modules: {
    common,
    article,
    comment,
    draft,
    message,
    login
  }
})