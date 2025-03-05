import { createContext, useContext } from "react";
import { activityStore } from "./activityStore";
import { ErrorStore } from "./ErrorStore";

interface Store {
  activityStore: activityStore;
  errorStore: ErrorStore;
}
export const store: Store = {
  activityStore: new activityStore(),
  errorStore: new ErrorStore(),
};
export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
