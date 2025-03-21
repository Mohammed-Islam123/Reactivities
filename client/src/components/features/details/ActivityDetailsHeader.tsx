import { observer } from "mobx-react-lite";

import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Activity } from "../../../types/activity.type";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
  if (activity)
    return (
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
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
                  <p>{format(activity.date, "dd mmm yyyy h:mm a")}</p>
                  <p>
                    Hosted by <strong>Bob</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached="bottom">
          <Button color="teal">Join Activity</Button>
          <Button>Cancel attendance</Button>
          <Button
            as={Link}
            to={`/activities/edit/${activity.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    );
});
