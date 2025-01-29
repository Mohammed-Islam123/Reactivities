import { Grid, GridColumn, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../types/activity.type";
import DashboradActivity from "./DashboradActivity";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

type Props = {
  activities: Activity[] | undefined;
  openActivityForm: boolean;
  setOpenActivityForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: Activity | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  editedActivity: Activity | undefined;
  setEditedActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>;
};
const ActivitiesDashboard = ({
  activities,
  setOpenActivityForm,
  openActivityForm,
  editedActivity,
  selectedItem,
  setEditedActivity,
  setSelectedItem,
  setActivities,
}: Props) => {
  return (
    <Grid>
      <GridColumn width={9} style={{ padding: "0" }}>
        <Segment>
          <Item.Group divided>
            {activities?.map((act) => (
              <DashboradActivity
                activity={act}
                setSelectedItem={setSelectedItem}
                setActivities={setActivities}
                key={act.id}
              />
            ))}
          </Item.Group>
        </Segment>
      </GridColumn>
      <GridColumn width={1}></GridColumn>
      <GridColumn width="6">
        {selectedItem ? (
          <ActivityDetails
            activity={selectedItem}
            setSelectedItem={setSelectedItem}
            setEditedActivity={setEditedActivity}
            setOpenActivityForm={setOpenActivityForm}
          />
        ) : (
          openActivityForm && (
            <ActivityForm
              editedActivity={editedActivity}
              setEditedActivity={setEditedActivity}
              setOpenActivityForm={setOpenActivityForm}
              setSelectedItem={setSelectedItem}
              setActivities={setActivities}
            />
          )
        )}
      </GridColumn>
    </Grid>
  );
};

export default ActivitiesDashboard;
