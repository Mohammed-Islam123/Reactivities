import { Activity } from "../../../types/activity.type";
import { Button, Icon, Item, Segment } from "semantic-ui-react";

import agent from "../../../api/agent";

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../stores/Store";

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
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src="/assets/user.png" circular size="tiny" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description> Hosted By Bob </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Icon name="marker" />
          {activity.city}
        </span>
      </Segment>
      <Segment secondary>Attendies goes here</Segment>
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

/**
 *   <Item>
      <Item.Content
        verticalAlign="top"
        style={{ padding: "1rem", lineHeight: "150%" }}
      >
        <Item.Header
          as={Link}
          to={`/activities/${activity.id}`}
          onClick={() => {
            activityStore.setSelectedItem(activity);
          }}
        >
          <Image
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            avatar
            size="tiny"
          />
          {activity.title}
        </Item.Header>
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
            as={Link}
            to={`/activities/${activity.id}`}
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
 
 */
