import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../types/activity.type";
import agent from "../api/agent";
import { format } from "date-fns";

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
          act.date = new Date(act.date);
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
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce(
        (acc: { [key: string]: Activity[] }, act) => {
          const date = format(act.date, "dd MMM yyyy");
          if (!acc[date]) acc[date] = [act];
          else acc[date] = [...acc[date], act];
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
        act.date = new Date(act.date);
        this.selectedItem = act;
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoadingState(false);
      }
    }
  };
}
export { activityStore };
