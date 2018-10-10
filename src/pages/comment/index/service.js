import api from '../../../config/api';

// 栏目实体
export async function getCommandShow(payload) {
    return await Axios.post(api.command.show, payload);
}

// 获取栏目下帖子列表
export async function getCommanList(payload) {
    return await Axios.post(api.command.community_subject_list_index, payload);
}

// 订阅、取消订阅
export async function getSubscription(payload) {
    return await Axios.post(api.command.subscription, payload);
}