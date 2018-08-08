import api from "../../../utils/api";

export async function fetchContent(payload) {
  return axios.get(`${api.command.show}?subjectid=${payload}`).then(res => res.data);
}