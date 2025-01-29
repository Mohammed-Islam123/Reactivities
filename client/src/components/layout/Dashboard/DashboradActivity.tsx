import { Activity } from "../../../types/activity.type";
import { Button, Item, Label } from "semantic-ui-react";
import styles from "./DashboradActivity.module.css";
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
  function handleDelete(id: string) {
    setActivities((old) => old?.filter((act) => act.id != id));
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
        <div className={styles.container}>
          <Label basic> {activity.category} </Label>
          <div className={styles["button-container"]}>
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
          </div>
        </div>
      </Item.Content>
    </Item>
  );
};

export default DashboradActivity;
