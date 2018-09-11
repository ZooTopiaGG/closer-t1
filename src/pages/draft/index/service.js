import api from '../../../config/api';

export async function getComments(payload) {
  return await Axios.post(api.command.comments, payload);
}