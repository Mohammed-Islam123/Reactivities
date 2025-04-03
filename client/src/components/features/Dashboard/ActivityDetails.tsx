import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/Store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import ActivityDetailsHeader from "../details/ActivityDetailsHeader";
import ActivityDetailsInfos from "../details/ActivityDetailsInfos";
import ActivityDetailsChat from "../details/ActivityDetailsChat";
import ActivityDetailsSideBar from "../details/ActivityDetailsSideBar";

const ActivityDetails = () => {
  const { activityStore } = useStore();

  const { id } = useParams<"id">();
  useEffect(() => {
    const loadCurrenActivity = async (id: string) => {
      await activityStore.loadSingleActivity(id);
    };

    if (id) loadCurrenActivity(id);
  }, [activityStore, id]);

  return !activityStore.loading ? (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activityStore.selectedItem} />
        <ActivityDetailsInfos activity={activityStore.selectedItem} />
        <ActivityDetailsChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailsSideBar
          attendees={activityStore.selectedItem?.attendees}
        />
      </Grid.Column>
    </Grid>
  ) : (
    <Loading />
  );
};

export default observer(ActivityDetails);
