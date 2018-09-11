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
      console.timeEnd();
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
          // let data = { "result": { "double_longitude": 0, "long_time_line": 0, "int_post_limit": 4, "int_use": 0, "bool_delete": false, "bool_tip": false, "className": "19群组名群凤凤栏目1-名", "isOffical": false, "title": "19群的神议论-请勿删除", "int_read": 1, "userid": "9cvwbcsKxN", "content": "{\"summary\":\"这是描述文案\",\"html\":\"<p>&#36825;&#26159;&#25551;&#36848;&#25991;&#26696;<\\/p><p>&#19979;&#38754;&#26159;&#22270;&#29255;<\\/p><p><img src=\\\"http:\\/\\/file-sandbox.tiejin.cn\\/public\\/9ElLfd9ISi\\/IMG_20180717_151634.jpg.jpg\\\" width=\\\"2016\\\" height=\\\"1512\\\" size=\\\"1513616\\\" \\/><\\/p><p>&#19979;&#38754;&#26159;&#35270;&#39057;<\\/p><p><video vid=\\\"fcdff29ae04744ccb29cb9fe5e4967db\\\" src=\\\"http:\\/\\/video.tiejin.cn\\/sv\\/18bb5c03-164a7221d50\\/18bb5c03-164a7221d50.mp4\\\" imageUrl=\\\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/202304E262B54047B60AFEDD777F0A77-6-2.png\\\" width=\\\"720\\\" height=\\\"1456\\\" duration=\\\"3274.0\\\" size=\\\"425912\\\" \\/><\\/p>\",\"end_html\":\"<p>&#36825;&#26159;&#24635;&#32467;&#25991;&#26696;<\\/p><p>&#23567;&#38754;&#26159;&#22270;&#29255;<\\/p><p><img src=\\\"http:\\/\\/file-sandbox.tiejin.cn\\/public\\/9ElLg4Cyjt\\/IMG_20180717_151650.jpg.jpg\\\" width=\\\"1512\\\" height=\\\"2016\\\" size=\\\"1593633\\\" \\/><\\/p><p>&#19979;&#38754;&#26159;&#35270;&#39057;<\\/p><p><video vid=\\\"827f9b69de1f4751af24089f432fd011\\\" src=\\\"http:\\/\\/video.tiejin.cn\\/sv\\/8213efc-164a7221d04\\/8213efc-164a7221d04.mp4\\\" imageUrl=\\\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/FAD1AF9B64D1443DBFC72993E78DD42D-6-2.png\\\" width=\\\"720\\\" height=\\\"1456\\\" duration=\\\"4733.0\\\" size=\\\"660711\\\" \\/><\\/p>\",\"discuss\":[{\"createTime\":1531811722023,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElBYeFpct\",\"text\":\"Jdjdjdjdz\",\"type\":0,\"userId\":\"9f1mt2zKIF\"},{\"createTime\":1531811724516,\"nickname\":\"集体伺候我是002\",\"avatar\":\"\\/avatar\\/u\\/8Vrm1jbf4B?v=1526613902922\",\"id\":\"9ElBZYhlxU\",\"text\":\"某事607你这个\",\"type\":0,\"userId\":\"9cw7PJ1hLd\"},{\"createTime\":1531811727364,\"nickname\":\"凤凤栏目主名\",\"avatar\":\"\\/public\\/9s1LnfdCqZ\\/temp.jpg\",\"id\":\"9ElC2zhIz0\",\"text\":\" 图库洛牌\",\"type\":0,\"userId\":\"9cvwbcsKxN\"},{\"image\":{\"size\":0,\"link\":\"\\/public\\/9ElCbecZin\\/1531809186.jpg\",\"width\":828,\"height\":828},\"createTime\":1531811737529,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElCbeciKn\",\"text\":\"\",\"type\":1,\"userId\":\"9f1mt2zKIF\"},{\"createTime\":1531811765450,\"nickname\":\"集体伺候我是002\",\"avatar\":\"\\/avatar\\/u\\/8Vrm1jbf4B?v=1526613902922\",\"id\":\"9ElCztovIv\",\"text\":\"\",\"video\":{\"duration\":0.0,\"vid\":\"29666050af0846378847fc6bee92ebcd\",\"size\":0,\"src\":\"http:\\/\\/video.tiejin.cn\\/sv\\/c14387e-164a71895e3\\/c14387e-164a71895e3.mp4\",\"imageUrl\":\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/1F81294CFEE548C8978FF6E0C6FE1BD0-6-2.png\",\"width\":0,\"height\":0},\"type\":2,\"userId\":\"9cw7PJ1hLd\"},{\"feed\":{\"summary\":\"[图片][图片][图片]\",\"feedId\":\"wmJ5IrsVKFgv\",\"feedType\":0,\"imageUrl\":\"\\/public\\/9ElDNG0vzi\\/IMG_20180717_151634.jpg.jpg\",\"title\":\"图集贴-用户发帖\"},\"createTime\":1531811854697,\"nickname\":\"凤凤栏目主名\",\"avatar\":\"\\/public\\/9s1LnfdCqZ\\/temp.jpg\",\"id\":\"9ElDOxsEss\",\"text\":\"wmJ5IrsVKFgv\",\"type\":3,\"userId\":\"9cvwbcsKxN\"},{\"feed\":{\"summary\":\"[视频]\",\"feedId\":\"wmJ5Wbcf3b7e\",\"feedType\":1,\"imageUrl\":\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/EB4810D3D26B47198CE92B758F2F3F4D-6-2.png\",\"title\":\"Android拍摄视频贴\"},\"createTime\":1531811898171,\"nickname\":\"集体伺候我是002\",\"avatar\":\"\\/avatar\\/u\\/8Vrm1jbf4B?v=1526613902922\",\"id\":\"9ElEqDCo1T\",\"text\":\"wmJ5Wbcf3b7e\",\"type\":3,\"userId\":\"9cw7PJ1hLd\"},{\"feed\":{\"summary\":\"[视频]\",\"feedId\":\"wmJ69UVylGXX\",\"feedType\":1,\"imageUrl\":\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/55D70AFA28744496A4A4B7B3DD0DBA98-6-2.jpg\",\"title\":\"ios拍摄视频贴\"},\"createTime\":1531811942712,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElF2K6a90\",\"text\":\"wmJ69UVylGXX\",\"type\":3,\"userId\":\"9f1mt2zKIF\"},{\"createTime\":1531811978593,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElFxUB0X5\",\"text\":\"\",\"video\":{\"duration\":0.0,\"vid\":\"c5118d1265df4113b111e00ff21ae77d\",\"size\":0,\"src\":\"http:\\/\\/video.tiejin.cn\\/c5118d1265df4113b111e00ff21ae77d\\/199e6a3afa3f400a9a129b514072b082-d4c7e8bf879f94da3a840dc4f1f78a1a-ld.mp4\",\"imageUrl\":\"http:\\/\\/video.tiejin.cn\\/image\\/cover\\/AE88162AC59941208F6C43435890C7FE-6-2.jpg\",\"width\":0,\"height\":0},\"type\":2,\"userId\":\"9f1mt2zKIF\"},{\"createTime\":1531811994156,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElFLLAJW8\",\"text\":\" Ios横向拍摄\",\"type\":0,\"userId\":\"9f1mt2zKIF\"},{\"feed\":{\"summary\":\"哈哈哈\",\"feedId\":\"wmJ6MWDuNn71\",\"feedType\":2,\"imageUrl\":\"\\/public\\/9ElGM7fdbB\\/crop_1531812010867.png.jpg\",\"title\":\"群组内发帖\"},\"createTime\":1531812067832,\"nickname\":\"凤凤栏目主名\",\"avatar\":\"\\/public\\/9s1LnfdCqZ\\/temp.jpg\",\"id\":\"9ElGMZ3B0a\",\"text\":\"wmJ6MWDuNn71\",\"type\":3,\"userId\":\"9cvwbcsKxN\"},{\"createTime\":1531812127578,\"nickname\":\"集体伺候我是002\",\"avatar\":\"\\/avatar\\/u\\/8Vrm1jbf4B?v=1526613902922\",\"id\":\"9ElHCWaRaX\",\"text\":\"https:\\/\\/www.baidu.com\",\"type\":0,\"userId\":\"9cw7PJ1hLd\"},{\"createTime\":1531812166030,\"nickname\":\"00083我我也nfncmbkv\",\"avatar\":\"\\/avatar\\/u\\/9f1mt2zKIF?v=1529923996433\",\"id\":\"9ElIaI2jVz\",\"text\":\"http:\\/\\/www.baidu.com\",\"type\":0,\"userId\":\"9f1mt2zKIF\"},{\"createTime\":1531812096728,\"nickname\":\"集体伺候我是002\",\"avatar\":\"\\/avatar\\/u\\/8Vrm1jbf4B?v=1526613902922\",\"id\":\"9ElHc5EeE1\",\"text\":\"www.baidu.com\",\"type\":0,\"userId\":\"9cw7PJ1hLd\"}]}", "cover": "/public/9ElLelmQTr/default.jpg.jpg", "view": 219, "double_latitude": 0, "release_subjectid": "0", "int_verify": 1, "int_release_type": 1, "long_publish_time": 1533189337461, "communityName": "凤凤测试栏目1", "blogo": "http://file-sandbox.tiejin.cn/public/9cw0i80BHG/1526642448000.jpg", "long_create_time": 1531812389417, "bool_task": false, "int_category": 3, "commentNumber": 26, "long_like": 0, "like": 0, "int_type": 2, "isTask": false, "region_id": "wfXYXEpsBEyN", "long_view": 200, "subjectid": "wmJ8ptL07jte", "long_update_time": 1533525923948, "tags": "0", "long_share": 4, "int_cover_mode": 0, "verify_user": "wi4ThMgunRmN", "classid": "9f32omiOVs", "communityid": "9cvwbctrap", "long_modify_time": 0, "user": { "gender": 2, "attributes": { "roster": { "uid": "9cvwbcsKxN", "gender": 0, "name": "我是花名", "attributes": { "security_signal": "02810000107" }, "id": "9s1LpQfvi7", "avatar": "/public/9s1LnfdCqZ/temp.jpg", "community": "9cvwbctrap" } }, "fullname": "凤凤栏目主名哈哈xx", "avatar": "/avatar/u/9cvwbcsKxN?v=1529488290734", "username": "12081040001" } }, "code": 0 }
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