import api from '../utils/api';

export default {
  get_adcookie(payload) {
    return Axios.post(api.share.get_adcookie, payload).then(res => res.data);
  },
  common(payload) {
    return Axios.post(api.share.common, payload).then(res => res.data);
  },
  subscription(payload) {
    return Axios.post(api.community.subscription, payload).then(res => res.data);
  }
}