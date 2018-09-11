import api from '../../../utils/api';

export async function getComments(payload) {
  return await Axios.post(api.command.comments, payload);
}