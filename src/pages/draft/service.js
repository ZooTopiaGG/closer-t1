import api from "../../config/api";

export async function fetchContent(payload) {
  return Axios.get(`${api.command.show}?subjectid=${payload}`).then(res => res.data);
}