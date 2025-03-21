import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useStore } from "./stores/Store";

function App() {
  const location = useLocation();
  const { activityStore } = useStore();
  useEffect(() => {
    if (activityStore.activitiesMap.size === 0 && location.pathname !== "/")
      activityStore.loadActivities();
  }, [activityStore, location]);
  return location.pathname === "/" ? (
    <Home />
  ) : (
    <>
      <ToastContainer />
      <NavBar />
      <Container style={{ marginTop: "8rem" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
