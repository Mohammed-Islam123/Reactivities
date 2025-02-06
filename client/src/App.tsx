import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect } from "react";
import { useStore } from "./stores/activityStore";

import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <>
      {" "}
      <NavBar />
      <Container style={{ marginTop: "8rem" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
