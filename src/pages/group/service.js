import api from '../../config/api';
//  群组信息
export async function getGroupInfo(payload) {
  return await Axios.post(api.group.share_group, payload);
}
//群组列表
export async function getGroupList(payload) {
  return await Axios.post(api.group.group_subject_list, payload);
}
//加入群组
export async function joinGroup(payload) {
  return await Axios.post(api.group.join, payload);
}
//申请加入群组
export async function applyToJoinGroup(payload) {
  return await Axios.post(api.admin.send_message, payload);
}