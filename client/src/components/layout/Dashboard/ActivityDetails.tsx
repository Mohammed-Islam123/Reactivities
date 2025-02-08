import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/activityStore";
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
    if (id) activityStore.loadSingleActivity(id);
  }, [activityStore, id]);

  return activityStore.loading ? (
    <Loading />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activityStore.selectedItem} />
        <ActivityDetailsInfos activity={activityStore.selectedItem} />
        <ActivityDetailsChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailsSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
