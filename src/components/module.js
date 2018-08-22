import {mergeJsonObject} from '../utils';
import service from './service';
import Cookie from 'js-cookie';

const namespaced = true;
const state = {
}

const actions = {
  // h5设置cookies埋点
  async get_adcookie({
    commit
  }, {
    webUdid
  }) {
    let self = this
    try {
      let para = {
        webUdid: webUdid
      }
      let data = await service.get_adcookie(para)
      if (data.code === 0) {
        commit('SET_H5COOKIES', data.result.udid)
        return data.result.udid
      }
    } catch (e) {
      console.log('e==', e)
    }
  },
  // 点击下载按钮时调用get_adcookies做统计
  async down_adcookies({
    state,
    rootState,
    commit
  }) {
    let self = this,
      para = {
        webUdid: false,
        deviceType: rootState.nvgtype || 'ios',
        deviceVersion: rootState.nvgversion || '11_0_0',
        adid: Cookie.get('h5Adid') || 'closer-share'
      }
    let data = await service.get_adcookie(para)
    return true
  },
  // 点击下载按钮时统计
  // 通用h5分享统计，目前主要针对 帖子 栏目 群组 活动
  async down_statistics({
    state,
    rootState,
    commit
  }, {
    p1
  }) {
    if (Cookie.get("user")) {
      var userId = JSON.parse(Cookie.get("user")).objectID || "";
    }
    let self = this,
      p2 = {
        userId: userId || "", // '用户ID，用户全网唯一标示，级别从高到底：userId>deviceId>cookie，userId，deviceId，cookie三个中必须要传一个'
        deviceId: "", //	'设备ID，移动设备的唯一标示，比如iOS系统的IDFA、IDFV，安卓系统的IMEI，mac地址等 ，userId，deviceId，cookie三个中必须要传一个'
        cookie: Cookie.get("h5Cookies") || "", //	'cookie，以H5接入时使用，userId，deviceId，cookie三个中必须要传一个'
        platform: "H5", //	'设备平台,参数取值:Android IOS H5'
        attachPlatform: rootState.nvgTypeToPowerCase || "", //	'H5的载体，当platform为H5时，如果设备为安卓设备，则传Android，IOS设备则传IOS，其他不传'
        communityId: rootState.res.communityid || "", //		'栏目id,统计对象有该属性则需要填写'
        title: rootState.res.title || "", //		'标题 如果是文章或视频该参数需要上传'
        action: "click", //		'行为类型(曝光 浏览结束点击返回 负反馈 点击下载)，参数取值:exposure back feedback download'
        dreason: "", //		'负反馈内容，当action为feedback时必填，格式为：["负反馈内容1", "负反馈内容2"]'
        time: Date.now(), //		'行为发生的时间戳，单位毫秒'
        cost: Date.now() - state.enter_time || 0, //		'浏览时长/曝光时长，单位毫秒'
        totalTime: state.duration_time || 0, //		'内容总时长，单位毫秒
      }
    let para = mergeJsonObject(p1, p2);
    console.log('para:',para)
    let data = await service.common(para);
    console.log('data:',data)
    if (data.code === 0) {
      return true
    }
  },
  
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
          commit('SET_FOCUS_STAT', false, {root: true})
        } else {
          commit('SET_FOCUS_STAT', true, {root: true})
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
}

const mutations = {
  // 设置h5cookies到浏览器
  SET_H5COOKIES(state, para) {
    state.h5Cookies = para
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations
}