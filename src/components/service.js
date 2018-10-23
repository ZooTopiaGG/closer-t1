import api from '../config/api';

export default {
  get_adcookie(payload) {
    return Axios.post(api.share.get_adcookie, payload).then(res => res.data);
  },
  common(payload) {
    return Axios.post(api.share.common, payload).then(res => res.data);
  },
  subscription(payload) {
    return Axios.post(api.community.subscription, payload).then(res => res.data);
  },
  incr_view(payload) {
    return Axios.post(api.command.incr_view, payload).then(res => res.data);
  },
  get_hot_subjects(payload) {
    return Axios.post(api.command.hot_subjects, payload).then(res => res.data);
  },
  getCode(payload) {
    return Axios.post(api.admin.get_code_by_phone, payload);
  },
  /**
   * 登录/注册 验证码
   */
  Login(payload) {
    return Axios.post(api.admin.closeruser_regist, payload)
  },

  /**
   * @param payload
   * 获取微信授权code
   */
  getAuthPath(payload) {
    return Axios.post(api.admin.get_auth_path, payload)
  },

  loginWithWechat(payload) {
    return Axios.post(api.admin.login_with_wechat, payload)
  },
  /**
   * 
   * @param payload 
   * 获取评论
   */
  getComments(payload) {
    return Axios.post(api.command.comments, payload);
  },

  /**
   * @param payload 
   * {
   *  subjectid，
   *  commentid，
   *  flag
   * }
   * 对评论点赞或取消点赞
   */
  isLike(payload) {
    return Axios.post(api.command.like, payload);
  },
  wechatConfig(payload) {
    return Axios.post(api.admin.wechat_config, payload);
  },
  wechatConfig(payload) {
    return Axios.post(api.admin.wechat_config, payload);
  },
  getCollections(payload) {
    return Axios.post(`${api.command.collectionsV2}`, payload).then(res => res.data);
  }
}