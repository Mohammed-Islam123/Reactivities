import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues, Attendee } from "../types/activity.type";
import agent from "../api/agent";
import { format } from "date-fns";
import { store } from "./Store";

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
        this.setAcivity(act);
        runInAction(() => {
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
  createActivity = async (activity: ActivityFormValues) => {
    const exist = this.activitiesMap.has(activity.id);

    try {
      let activityToAdd: Activity;
      if (!exist) {
        const created = await agent.Activities.addActivity(activity);
        activity.id = created.id;
        activityToAdd = new Activity(created);
      } else {
        await agent.Activities.editActivity(activity);
        activityToAdd = new Activity(activity);
        this.activitiesMap.set(activity.id, activityToAdd);
      }
      this.setAcivity(activityToAdd);
      this.activitiesMap.set(activityToAdd.id, activityToAdd);
      this.setSelectedItem(activityToAdd);
    } catch (error) {
      console.error(error);
    }
  };
  setAcivity = (act: Activity) => {
    const user = store.userStore.currentUser;
    act.date = new Date(act.date);
    if (user) {
      act.isAttendee = act.attendees.some(
        (att) => att.userName == user.userName
      );
      act.isHost = act.hostUserName == user.userName;

      act.host = act.attendees.find((att) => att.userName == act.hostUserName);
    }
  };
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
        const act =
          this.activitiesMap.size !== 0
            ? this.activitiesMap.get(id)
            : await agent.Activities.getOne(id);

        if (!act) return;
        act.date = new Date(act.date);
        this.setSelectedItem(act);
        this.setAcivity(act);
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoadingState(false);
      }
    }
  };
  updateActivityAttendance = async () => {
    const user = store.userStore.currentUser;
    if (!user) return null;
    try {
      this.setSubmitting(true);
      await agent.Activities.attendActivity(this.selectedItem?.id as string);
      if (this.selectedItem?.isHost)
        this.selectedItem.IsCancelled = !this.selectedItem.IsCancelled;
      else if (this.selectedItem?.isAttendee)
        runInAction(() => {
          if (this.selectedItem && this.selectedItem) {
            this.selectedItem.isAttendee = false;
            this.selectedItem.attendees = this.selectedItem?.attendees.filter(
              (att) => {
                return att.userName != user.userName;
              }
            );
          }
        });
      else if (!this.selectedItem?.isHost) {
        runInAction(() => {
          if (this.selectedItem) this.selectedItem.isAttendee = true;
          this.selectedItem?.attendees.push({
            userName: user.userName,
            displayName: user.displayName,
            image: user.image,
            bio: user.bio,
          } as Attendee);
        });
        runInAction(() => {
          this.activitiesMap.set(
            this.selectedItem?.id as string,
            this.selectedItem!
          );
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setSubmitting(false);
    }
  };
}
export { activityStore };
