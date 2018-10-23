import api from '../../config/api';
//  群组信息
export async function getGroupInfo(payload) {
  return await Axios.post(api.group.share_group, payload);
}
//群组列表
export async function getGroupList(payload) {
  return await Axios.post(api.group.group_subject_list, payload);
}