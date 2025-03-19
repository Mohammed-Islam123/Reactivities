import { Activity } from "../../../types/activity.type";
import DashboradItem from "./DashboradItem";
import { Header } from "semantic-ui-react";

interface Props {
  date: string;
  list: Activity[];
}

export const ActivityListByDate = ({ date, list }: Props) => {
  return (
    <>
      <Header as={"h3"} color="teal">
        {date}
      </Header>
      {list.map((activity) => (
        <DashboradItem key={activity.id} activity={activity} />
      ))}
    </>
  );
};
