import api from '../../../utils/api';
export async function getSubject(payload) {
    return await Axios.post(api.command.show, payload);
}