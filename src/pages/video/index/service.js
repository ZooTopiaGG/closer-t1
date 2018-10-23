import api from "../../../config/api";

export async function fetchContent(payload) {
  return Axios.post(api.command.show, payload);
}