import api from './config/api';

export default {
  get_adcookie(payload) {
    return Axios.post(api.share.get_adcookie, payload).then(res => res.data);
  },
  common(payload) {
    return Axios.post(api.share.common, payload).then(res => res.data);
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
  }
}