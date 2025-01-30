import { Activity } from "../../../types/activity.type";
import { Button, ButtonGroup, Container, Item, Label } from "semantic-ui-react";

import agent from "../../../api/agent";
interface Props {
  activity: Activity;
  setSelectedItem: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>;

  key: string;
}
const DashboradActivity = ({
  activity,
  setSelectedItem,
  setActivities,
}: Props) => {
  async function handleDelete(id: string) {
    try {
      await agent.Activities.deleteActivity(id);
      setActivities((old) => old?.filter((act) => act.id != id));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Item>
      <Item.Content
        verticalAlign="top"
        style={{ padding: "1rem", lineHeight: "150%" }}
      >
        <Item.Header as={"h2"}> {activity.title} </Item.Header>
        <Item.Meta>{activity.date} </Item.Meta>
        <Item.Extra>{activity.description} </Item.Extra>
        <Item.Description>
          {activity.venue}, {activity.city}{" "}
        </Item.Description>
        <Container>
          <Label basic> {activity.category} </Label>
          <ButtonGroup attached="left">
            <Button
              color="red"
              content="Delete"
              onClick={() => handleDelete(activity.id)}
              id={activity.id}
            />
            <Button
              color="blue"
              content="View"
              onClick={() => {
                setSelectedItem(activity);
              }}
            />
          </ButtonGroup>
        </Container>
      </Item.Content>
    </Item>
  );
};

export default DashboradActivity;
