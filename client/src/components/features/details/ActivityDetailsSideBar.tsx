import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Attendee } from "../../../types/activity.type";
import { useStore } from "../../../stores/Store";

interface Props {
  attendees?: Attendee[];
}

export default observer(function ActivityDetailedSidebar({ attendees }: Props) {
  const { activityStore } = useStore();

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees
          ? `${attendees.length} ${
              attendees.length == 1 ? "Person" : "People"
            } are going`
          : "Error Fething list number of attendees"}
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees?.map((att) => (
            <Item style={{ position: "relative" }} key={att.userName}>
              {activityStore.selectedItem?.hostUserName == att.userName ? (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              ) : null}
              <Image size="tiny" src={"/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`#`}>{att.displayName} </Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
