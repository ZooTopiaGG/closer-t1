import api from '../../config/api';

/**
 * 
 * @param payload 
 * 获取评论
 */
export async function getComments(payload) {
  return await Axios.post(api.command.comments, payload);
}

/**
 * @param payload 
 * {
 *  subjectid，
 *  commentid，
 *  flag
 * }
 * 对评论点赞或取消点赞
 */
export async function isLike(payload) {
  return await Axios.post(api.command.like, payload);
}

/**
 * @param payload
 * 获取微信授权code
 */
export async function getAuthPath(payload) {
  return await Axios.post(api.admin.get_auth_path, payload)
}

export async function wechatConfig(payload) {
  return await Axios.post(api.admin.wechat_config, payload)
}

/**
 * 
 */
export async function loginWithWechat(payload) {
  return await Axios.post(api.admin.login_with_wechat, payload)
}
