import { observer } from "mobx-react-lite";

import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../types/activity.type";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../stores/Store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity | undefined;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const { updateActivityAttendance, submitting } = useStore().activityStore;

  if (!activity) return null;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.IsCancelled && <Label style={{ zIndex: "1000" }}></Label>}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "dd MMM yyyy h:mm a")}</p>
                <p>
                  Hosted by <strong> {activity.host?.displayName} </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              as={Link}
              to={`/activities/edit/${activity.id}`}
              color="orange"
            >
              Manage Event
            </Button>
            <Button
              onClick={updateActivityAttendance}
              color={`${activity.IsCancelled ? "teal" : "red"}`}
              floated="right"
            >
              {`${
                activity.IsCancelled ? "Reactivate Activity" : "Cancel Activity"
              }`}
            </Button>
          </>
        ) : activity.isAttendee ? (
          <Button onClick={updateActivityAttendance} loading={submitting}>
            Cancel Attendance
          </Button>
        ) : (
          <Button
            onClick={updateActivityAttendance}
            loading={submitting}
            color="teal"
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
