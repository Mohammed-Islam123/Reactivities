import axios from "axios";
import { Activity } from "../types/activity.type";
import { delay } from "../utils/helpers";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.interceptors.response.use(async (res) => {
  await delay(1000);
  return res;
});

const request = {
  get: <T>(url: string) => axios.get<T>(url).then((res) => res.data),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then((res) => res.data),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then((res) => res.data),
  delete: <T>(url: string) => axios.delete<T>(url).then((res) => res.data),
};

const Activities = {
  getAll: () => request.get<Activity[]>("/activities"),
  getOne: (id: string) => request.get<Activity>(`/activities/${id}`),
  editActivity: (body: Activity) =>
    request.put<void>(`/activities/${body.id}`, body),
  addActivity: (body: Activity) => request.post<Activity>("/activities/", body),
  deleteActivity: (id: string) => request.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};
export default agent;
