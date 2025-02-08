import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";
import Loading from "../../common/Loading";
import { useEffect } from "react";
import { ActivityListByDate } from "./ActivityListByDate";
import ActivityFilter from "./ActivityFilter";

const ActivitiesDashboard = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    if (activityStore.groupedActivities.length === 0)
      activityStore.loadActivities();
  }, [activityStore]);

  return activityStore.loading ? (
    <Loading />
  ) : activityStore.groupedActivities.length === 0 ? (
    <h1>There is no Activitities</h1>
  ) : (
    <Grid>
      <GridColumn width={10} style={{ padding: "0" }}>
        {activityStore.groupedActivities.map(([date, value]) => (
          <ActivityListByDate key={date} date={date} list={value} />
        ))}
      </GridColumn>
      <GridColumn width={6}>
        <ActivityFilter />
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivitiesDashboard);
