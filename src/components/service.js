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
  },
  incr_view(payload) {
    return Axios.post(api.command.incr_view, payload).then(res => res.data);
  }
}