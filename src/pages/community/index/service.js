import api from '../../../config/api';

// 栏目实体
export async function getCommunityShow(payload) {
    return await Axios.post(api.community.show, payload);
}

// 获取栏目下帖子列表
export async function getCommunityList(payload) {
    return await Axios.post(api.community.community_subject_list_index, payload);
}

// 订阅、取消订阅
export async function getSubscription(payload) {
    return await Axios.post(api.community.subscription, payload);
}

// 获取群组列表
export async function getGroupList(payload) {
  return await Axios.post(api.group.recruiting, payload);
}
