import { Grid, GridColumn, Item, Segment } from "semantic-ui-react";
import DashboradActivity from "./DashboradActivity";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";
import Loading from "../../common/Loading";
import { useEffect } from "react";

const ActivitiesDashboard = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    if (activityStore.activities.size === 0) activityStore.loadActivities();
  }, [activityStore]);

  return activityStore.loading ? (
    <Loading />
  ) : activityStore.activities.size === 0 ? (
    <h1>There is no Activitities</h1>
  ) : (
    <Grid>
      <GridColumn width={9} style={{ padding: "0" }}>
        <Segment>
          <Item.Group divided>
            {Array.from(activityStore.activities).map((activity) => (
              <DashboradActivity key={activity[1].id} activity={activity[1]} />
            ))}
          </Item.Group>
        </Segment>
      </GridColumn>
      <GridColumn width={1}></GridColumn>
    </Grid>
  );
};
export default observer(ActivitiesDashboard);
