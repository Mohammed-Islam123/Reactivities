import "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./components/common/NavBar";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useStore } from "./stores/Store";
import Loading from "./components/common/Loading";

function App() {
  const { loadCurrent, token, currentUser } = useStore().userStore;
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { activityStore } = useStore();
  useEffect(() => {
    if (
      activityStore.activitiesMap.size === 0 &&
      location.pathname !== "/" &&
      token
    )
      activityStore.loadActivities();

    if (token && !currentUser) {
      loadCurrent().then(() => {
        setLoading(false);
      });
    } else setLoading(false);
  }, [activityStore, loadCurrent, token, currentUser, location]);
  if (loading) return <Loading />;
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
