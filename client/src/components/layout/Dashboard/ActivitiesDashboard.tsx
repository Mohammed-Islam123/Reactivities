import { Grid, GridColumn, Item, Segment } from "semantic-ui-react";
import DashboradActivity from "./DashboradActivity";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivitiesDashboard = () => {
  const { activityStore } = useStore();

  return (
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
      <GridColumn width="6">
        {activityStore.selectedItem ? (
          <ActivityDetails />
        ) : (
          activityStore.openActivityForm && <ActivityForm />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
