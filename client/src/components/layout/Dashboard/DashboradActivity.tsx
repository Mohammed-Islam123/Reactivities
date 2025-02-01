import { Activity } from "../../../types/activity.type";
import { Button, Item, Label } from "semantic-ui-react";

import agent from "../../../api/agent";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";

interface Props {
  activity: Activity;
}
const DashboradActivity = ({ activity }: Props) => {
  const { activityStore } = useStore();

  async function handleDelete(id: string) {
    activityStore.setDeleting(true);
    activityStore.setOperationTarget(id);
    try {
      await agent.Activities.deleteActivity(id);
      activityStore.setSelectedItem(undefined);
      activityStore.activities.delete(id);
    } catch (error) {
      console.error(error);
    } finally {
      activityStore.setDeleting(false);
      activityStore.setOperationTarget("");
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
        <Item.Extra>
          <Label basic> {activity.category} </Label>
          <Button
            floated="right"
            color="blue"
            content="View"
            onClick={() => {
              activityStore.setSelectedItem(activity);
            }}
          />{" "}
          <Button
            floated="right"
            color="red"
            content="Delete"
            onClick={() => handleDelete(activity.id)}
            id={activity.id}
            loading={
              activityStore.deleting &&
              activityStore.operationTarget == activity.id
            }
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default observer(DashboradActivity);
