import Vue from 'vue'
import Vuex from 'vuex'
import { makeHtmlContent } from "./utils";

import common from './components/module'
import article from './pages/article/index/module'
import comment from './pages/comment/index/module'

import { fetchContent } from './pages/article/index/service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UA: "",
    IS_APP: false,
    IS_NEW_USER: false,
    IS_DEV: false,
    nvgtype: '',
    nvgTypeToPowerCase: '',
    nvgversion: '',
    res: {},
    GET_MESSAGE_STATE: false,
    GET_IS_APP: false,
    GET_APP_TOKEN: '',
    version_1_2: false,
    is_follow: false,
    extension_text: '',
    alert_stat: '',
    get_login_type: '',
    visibleLogin: '',
    content: {},
    exist: true,
  },
  actions: {
    // 获取文章内容
    async fetch_content({ commit, state, rootState }, { id }) {
      try {
        // 获取贴子详情
        let res = await fetchContent(id)
        if (res.code != 0) {
          // 贴子被删除状态
          commit("GET_EXIST_STATUS", false);
        } else {
          console.log(res)
          // 验证content
          if (res.result.content) {
            var content = JSON.parse(res.result.content);
          
            // 解析长图文html
            if (res.result.int_type === 2) {
              let _html = makeHtmlContent(
                content.html,
                !state.IS_APP
              );
              if (_html) {
                content.html = _html;
              }
              if (res.result.int_category === 3 && content.end_html) {
                let end_html = makeHtmlContent(
                  content.end_html,
                  !state.IS_APP
                );
                if (end_html) {
                  content.end_html = end_html;
                }
              }
            }
            if (content.discuss) {
              var discuss = content.discuss.map(x => {
                if (x.text) {
                  let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
                  let res = x.text.match(reg);
                  if (res) {
                    x.weblink = true;
                    res.map(y => {
                      // 正则替换文本
                      let tag = `<a href="${y}" target="_blank">${y}</a>`;
                      let newtag = x.text.replace(reg, tag);
                      x.newText = newtag;
                    });
                  } else {
                    x.weblink = false;
                  }
                }
                return x;
              });
            }
            // 返回在渲染页面之前得结果
            commit("SET_CONTENT", content);
          }
          commit("SET_RES", res.result);
        }
      } catch (err) {
        commit("GET_EXIST_STATUS", false);
        throw err;
      }
    }
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
    comment
  }
})