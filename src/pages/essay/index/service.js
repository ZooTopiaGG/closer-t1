import api from "../../../utils/api";

export async function fetchContent(payload) {
  return axios.get(`${api.command.show}?subjectid=${payload}`).then(res => res.data);
}

export async function getCommunityFocusStat(payload) {
  return axios.get(`${api.community.show}?communityid=${payload}`)
}

export async function getIncrView(payload) {
  return axios.get(`${api.command.incr_view}?subjectid=${payload}&timestamp=${Date.now()}`)
}