import React from "react";
import { Activity } from "../../../types/activity.type";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
interface Props {
  activity: Activity;
  setSelectedItem: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setEditedActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setOpenActivityForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActivityDetails = ({
  activity,
  setSelectedItem,
  setEditedActivity,
  setOpenActivityForm,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title} </Card.Header>
        <Card.Meta> {activity.date} </Card.Meta>
        <Card.Description>{activity.description} </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            onClick={() => {
              setSelectedItem(undefined);
              setEditedActivity(activity);
              setOpenActivityForm(true);
            }}
          >
            Edit
          </Button>
          <Button
            basic
            color="black"
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
