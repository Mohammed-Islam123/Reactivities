import { makeAutoObservable, runInAction } from "mobx";
import userLogin, { User } from "../types/user.type";
import agent from "../api/agent";
import { router } from "../router/Router";
import { store } from "./Store";

class UserStore {
  currentUser: User | null = null;
  submitting: boolean = false;
  token: string | null = localStorage.getItem("jwt");
  constructor() {
    makeAutoObservable(this);
  }
  setSubmitting = (value: boolean) => {
    this.submitting = value;
  };
  setCurrentUser = (user: User | null) => {
    this.currentUser = user;
  };
  login = async (userData: userLogin) => {
    const result = await agent.Account.login(userData);
    this.setCurrentUser(result);
    localStorage.setItem("jwt", result.token!);
    runInAction(() => {
      this.token = result.token!;
    });
    router.navigate("/activities");
  };
  register = async (userData: userLogin) => {
    const result = await agent.Account.register(userData);
    this.setCurrentUser(result);
    localStorage.setItem("jwt", result.token!);
    runInAction(() => {
      this.token = result.token!;
    });
    router.navigate("/activities");
  };
  logout = () => {
    this.setCurrentUser(null);
    localStorage.removeItem("jwt");
    runInAction(() => {
      this.token = null;
    });
    router.navigate("/");
  };
  loadCurrent = async () => {
    store.activityStore.setLoadingState(true);

    const user = await agent.Account.currentUser();
    runInAction(() => {
      this.currentUser = user;
    });
    store.activityStore.setLoadingState(false);
  };
}
export { UserStore };
