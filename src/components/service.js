import api from '../utils/api';
export async function getHotSubject(payload) {
    return await Axios.post(api.command.hot_subjects, payload);
}