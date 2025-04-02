import { createContext, useContext } from "react";
import { activityStore } from "./activityStore";
import { ErrorStore } from "./ErrorStore";
import { UserStore } from "./userStore";

interface Store {
  activityStore: activityStore;
  errorStore: ErrorStore;
  userStore: UserStore;
}
export const store: Store = {
  activityStore: new activityStore(),
  errorStore: new ErrorStore(),
  userStore: new UserStore(),
};
export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
