import api from '../../../utils/api';

export async function addReply(payload) {
  return await Axios.post(api.command.add_reply, payload);
}

export async function getAdcookie(payload) {
  return await Axios.post(api.statitics.get_adcookie, payload);
}

