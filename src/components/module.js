import { mergeJsonObject } from '../utils';
import service from './service';
import Cookie from 'js-cookie';

const namespaced = true;
const state = {
  h5Cookies: '',
  incr_view: 0,
  hotSubjects: []
}

const actions = {
  // 关注，取消关注栏目
  async get_focus_stat({
    commit
  }, {
    communityid,
    flag
  }) {
    let self = this
    try {
      let para = {
        communityid: communityid,
        flag: flag
      }
      let data = await service.subscription(para);
      if (data.code === 0) {
        if (flag == 0) {
          commit('SET_FOCUS_STAT', false, { root: true })
        } else {
          commit('SET_FOCUS_STAT', true, { root: true })
            // Toast({
            //   message: '关注成功',
            //   position: 'top'
            // })
          return true
        }
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
      }
    } catch (err) {
      Toast({
        message: err,
        position: 'top'
      })
    }
  },

  // 阅读数量
  async get_incr_view({
    commit
  }, params) {
    let self = this;
    try {
      let view = await service.incr_view(params);
      console.log(view)
        // 静态增加 阅读量
      if (view.code === 0) {
        commit("SET_INCR_VIEW", view.result);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getHotSubjects({ commit }, params) {
    try {
      let data = await service.get_hot_subjects(params)
      if (data.code === 0) {
        data.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        })
        if (data.result.data) {
          commit("SET_HOT_SUBJECTS", data.result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const mutations = {
  // 设置h5cookies到浏览器
  SET_H5COOKIES(state, para) {
    state.h5Cookies = para
  },
  // 设置阅读量
  SET_INCR_VIEW(state, para) {
    state.incr_view = para
  },
  SET_HOT_SUBJECTS(state, para) {
    console.log("SET_HOT_SUBJECTS", para)
    state.hotSubjects = para
  }
}


export default {
  namespaced,
  state,
  actions,
  mutations
}