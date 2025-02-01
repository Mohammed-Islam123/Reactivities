import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect } from "react";
import ActivitiesDashboard from "./components/layout/Dashboard/ActivitiesDashboard";
import Loading from "./components/common/Loading";
import { useStore } from "./stores/activityStore";

import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return activityStore.loading ? (
    <Loading />
  ) : (
    <>
      <NavBar />

      <Container style={{ marginTop: "8rem" }}>
        {activityStore.activities.size === 0 ? (
          <h1>There is no Activitities</h1>
        ) : (
          <ActivitiesDashboard />
        )}
      </Container>
    </>
  );
}

export default observer(App);
