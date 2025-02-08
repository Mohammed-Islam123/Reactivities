import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { Activity } from "../types/activity.type";
import agent from "../api/agent";

class activityStore {
  activitiesMap: Map<string, Activity> = new Map();

  openActivityForm: boolean = false;
  selectedItem: Activity | undefined;
  editedActivity: Activity | undefined;
  loading: boolean = false;
  submitting: boolean = false;
  operationTarget = "";
  deleting = false;

  constructor() {
    makeAutoObservable(this);
  }
  loadActivities = async () => {
    try {
      this.setLoadingState(true);
      const temp = await agent.Activities.getAll();
      temp.forEach((act) => {
        runInAction(() => {
          act.date = act.date.split("T")[0];
          this.activitiesMap.set(act.id, act);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingState(false);
    }
  };
  get activitiesByDate() {
    return Array.from(this.activitiesMap.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce(
        (acc: { [key: string]: Activity[] }, act) => {
          if (!acc[act.date]) acc[act.date] = [act];
          else acc[act.date] = [...acc[act.date], act];
          return acc;
        },
        {} as { [key: string]: Activity[] }
      )
    );
  }
  setLoadingState = (state: boolean) => {
    this.loading = state;
  };
  setOpenActivityForm = (state: boolean) => {
    this.openActivityForm = state;
  };
  setEditedActivity = (Activity: Activity | undefined) => {
    this.editedActivity = Activity;
  };
  setSelectedItem = (Activity: Activity | undefined) => {
    this.selectedItem = Activity;
  };
  setActivities = (Activities: Activity[]) => {
    Activities.forEach((act) => {
      this.activitiesMap.set(act.id, act);
    });
  };
  setSubmitting = (state: boolean) => {
    this.submitting = state;
  };
  setOperationTarget = (id: string) => {
    this.operationTarget = id;
  };
  setDeleting = (state: boolean) => {
    this.deleting = state;
  };
  loadSingleActivity = async (id: string) => {
    if (!this.selectedItem) {
      try {
        this.setLoadingState(true);
        const act = await agent.Activities.getOne(id);
        act.date = act.date.split("T")[0];
        this.selectedItem = act;
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoadingState(false);
      }
    }
  };
}
interface Store {
  activityStore: activityStore;
}
export const store: Store = {
  activityStore: new activityStore(),
};
export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
