import { Activity } from "../../../types/activity.type";
import {
  Button,
  Icon,
  Item,
  Label,
  List,
  Popup,
  Segment,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../stores/Store";
import ProfileCard from "../Profile/ProfileCard";

interface Props {
  activity: Activity;
}

const DashboradActivity = ({ activity }: Props) => {
  const { activityStore } = useStore();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          {activity.IsCancelled && (
            <Item
              style={{ backgroundColor: "red", width: "100%", hight: "50px" }}
            >
              <Item.Content>This Event is cancelled</Item.Content>{" "}
            </Item>
          )}
          <Item>
            <Item.Image
              src="/assets/user.png"
              style={{ marginButton: 3 }}
              circular
              size="tiny"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                {" "}
                Hosted By {activity.host?.displayName}{" "}
              </Item.Description>

              {activity.isAttendee && (
                <Label
                  style={{ marginTop: "10px" }}
                  basic
                  color={`${activity.isHost ? "orange" : "green"}`}
                >
                  {activity.isAttendee && !activity.isHost
                    ? "You are going to the activity"
                    : "You are hosting the activity"}
                </Label>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name={"clock"} /> {activity.date.toDateString()}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Icon name="marker" />
          {activity.city}
        </span>
      </Segment>
      <Segment secondary clearing>
        {AttendeeListForActivity(activity)}
      </Segment>
      <Segment>{activity.description} </Segment>
      <Segment clearing>
        <Button
          floated="right"
          color="teal"
          content="View"
          onClick={() => {
            activityStore.setSelectedItem(activity);
          }}
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(DashboradActivity);

function AttendeeListForActivity(activity: Activity) {
  return (
    <List horizontal>
      {activity.attendees.map((ele, index) => (
        <Popup
          hoverable
          key={ele.userName}
          trigger={
            <List.Item key={index}>
              <Item.Image
                src={`${ele.image || "/assets/user.png"}`}
                size="mini"
                circular
                floated="left"
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard attendee={ele} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}
