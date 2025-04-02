import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../types/activity.type";
import { delay } from "../utils/helpers";
import { toast } from "react-toastify";
import { router } from "../router/Router";
import userLogin, { User } from "../types/user.type";
import { store } from "../stores/Store";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.interceptors.request.use((conf) => {
  conf.headers.Authorization = `Bearer ${store.userStore.token}`;
  return conf;
});
axios.interceptors.response.use(
  async (res) => {
    await delay(1000);
    return res;
  },
  (err: AxiosError) => {
    const { response } = err;
    const { data, status } = response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          throw data.errors;
          // store.errorStore.setValidationErros(data.errors);
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("Internal Server Error");
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

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

const Account = {
  currentUser: async () => await request.get<User>("/account"),
  login: async (userData: userLogin) =>
    await request.post<User>("/account/login", userData),
  register: async (userData: userLogin) =>
    await request.post<User>("/account/register", userData),
};
const agent = {
  Activities,
  Account,
};
export default agent;
