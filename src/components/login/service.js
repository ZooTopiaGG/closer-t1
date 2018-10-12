import api from '../../config/api'

export async function getCode(payload) {
  return await Axios.post(api.admin.get_code_by_phone, payload);
}
/**
 * 登录/注册 验证码
 */
export async function Login(payload) {
  return await Axios.post(api.admin.closeruser_regist, payload)
}

/**
 * @param payload
 * 获取微信授权code
 */
export async function getAuthPath(payload) {
  return await Axios.post(api.admin.get_auth_path, payload)
}

export async function loginWithWechat(payload) {
  return await Axios.post(api.admin.login_with_wechat, payload)
}