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