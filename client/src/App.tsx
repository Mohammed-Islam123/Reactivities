import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect, useState } from "react";
import { Activity } from "./types/activity.type";
import ActivitiesDashboard from "./components/layout/Dashboard/ActivitiesDashboard";
import Loading from "./components/common/Loading";
import agent from "./api/agent";

function App() {
  const [activitites, setActivities] = useState<Activity[] | undefined>([]);
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Activity | undefined>();
  const [editedActivity, setEditedActivity] = useState<Activity | undefined>();
  const [loading, setLoading] = useState(true);
  function OpenCreateActivityHandler() {
    setEditedActivity(undefined);
    setOpenActivityForm(true);
    setSelectedItem(undefined);
  }

  useEffect(() => {
    try {
      agent.Activities.getAll().then((res) => {
        res.forEach((act) => (act.date = act.date.split("T")[0]));
        setActivities(res);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <NavBar OpenCreateActivityHandler={OpenCreateActivityHandler} />
      <Container style={{ marginTop: "8rem" }}>
        {activitites?.length === 0 ? (
          <h1>There is no Activitities</h1>
        ) : (
          <ActivitiesDashboard
            activities={activitites}
            openActivityForm={openActivityForm}
            setOpenActivityForm={setOpenActivityForm}
            editedActivity={editedActivity}
            selectedItem={selectedItem}
            setEditedActivity={setEditedActivity}
            setSelectedItem={setSelectedItem}
            setActivities={setActivities}
          />
        )}
      </Container>
    </>
  );
}

export default App;
