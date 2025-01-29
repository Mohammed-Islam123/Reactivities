import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect, useState } from "react";
import { Activity } from "./types/activity.type";
import axios from "axios";
import ActivitiesDashboard from "./components/layout/Dashboard/ActivitiesDashboard";

function App() {
  const [activitites, setActivities] = useState<Activity[] | undefined>([]);
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Activity | undefined>();
  const [editedActivity, setEditedActivity] = useState<Activity | undefined>();
  function OpenCreateActivityHandler() {
    setEditedActivity(undefined);
    setOpenActivityForm(true);
    setSelectedItem(undefined);
  }
  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/activities`;
      axios.get<Activity[]>(url).then((res) => setActivities(res.data));
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
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
