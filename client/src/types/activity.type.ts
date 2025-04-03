import { User } from "./user.type";

interface IActivity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
  IsCancelled: boolean;
  hostUserName: string;
  host: Attendee | undefined;
  isAttendee: boolean;
  isHost: boolean;
  attendees: Attendee[];
}
class Activity implements IActivity {
  id: string = "";
  title: string = "";
  date: Date = new Date();
  description: string = "";
  category: string = "";
  city: string = "";
  venue: string = "";
  IsCancelled: boolean = false;
  hostUserName: string = "";
  host: Attendee | undefined = undefined;
  isAttendee: boolean = false;
  isHost: boolean = false;
  attendees: Attendee[] = [];

  constructor(init?: Partial<Activity>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
class ActivityFormValues {
  id: string = "";
  title: string = "";
  date: Date = new Date();
  description: string = "";
  category: string = "";
  city: string = "";
  venue: string = "";
  constructor(init?: ActivityFormValues) {
    if (init) {
      this.id = init.id;
      this.title = init.title;
      this.date = init.date;
      this.description = init.description;
      this.category = init.category;
      this.city = init.city;
      this.venue = init.venue;
    }
  }
}
interface IAttendee {
  userName: string;
  displayName: string;
  bio: string;
  image?: string;
}

class Attendee implements IAttendee {
  userName: string = "";
  displayName: string = "";
  bio: string = "";
  image?: string = "";
  constructor(init: User) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

export type { IActivity, IAttendee };
export { Activity, ActivityFormValues, Attendee };
