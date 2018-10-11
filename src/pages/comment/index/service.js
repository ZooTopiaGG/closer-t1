import api from '../../../config/api';
export async function getSubject(payload) {
    return await Axios.post(api.command.show, payload);
}