import { getSubject } from './service'
import { Toast } from 'mint-ui'
import { makeHtmlContent } from '../../../utils'

export default {
  namespaced: true,
  state: {
    discuss: {},
    content: {},
    subject: {},
    subjectExist: true
  },
  mutations: {
    setContent(state, payload) {
      state.content = payload;
    },
    setDiscuss(state, payload) {
      state.discuss = payload;
    },
    setSubject(state, payload) {
      state.subject = payload;
    },
    setSubjectState(state, param) {
      state.subjectExist = param;
    }
  },
  actions: {
    async getSubject({ commit, state, rootState }, payload) {
      try {
        let { data } = await getSubject(payload)
        console.log('getSubject:', data)
        if (typeof(data.code) != "undefined" && data.code == 0) {
          if (!window.ENV.app) {
            if (
              data.result.int_verify === 0 ||
              ((data.result.int_verify === -1 &&
                  data.result.int_category != 4 &&
                  data.result.int_category != 6) ||
                data.result.bool_delete)
            ) {
              commit("setSubjectState", false);
              return;
            }
          }
          if (data.result.content) {
            let content = JSON.parse(data.result.content);
            if (data.result.int_type === 2) {
              rootState.CONTENT_IMGS == [];
              rootState.IMG_INDEX = 0;
              let _html = makeHtmlContent(
                content.html
              );
              if (_html) {
                content.html = _html;
              }
              console.log(content.discuss)
              if (content.discuss) {
                let discuss = content.discuss.map(x => {
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
                  if (x.image) {
                    x.image['index'] = rootState.IMG_INDEX;
                    rootState.CONTENT_IMGS.push(x.image.link)
                    rootState.IMG_INDEX++;
                  }
                  return x;
                });
                commit("setDiscuss", discuss);
              }
              if (data.result.int_category === 3 && content.end_html) {
                let end_html = makeHtmlContent(
                  content.end_html
                );
                if (end_html) {
                  content.end_html = end_html;
                }
              }
              commit("setContent", content);
              delete data.result.content;
              rootState.SUBJECT = data.result;
              commit("setSubject", data.result);
            }

          }
        } else {
          commit("setSubjectState", false);
        }
      } catch (e) {
        commit("setSubjectState", false);
      }
    }
  }
}