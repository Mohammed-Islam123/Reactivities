import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import styles from "./NavBar.module.css";
import { useStore } from "../../stores/activityStore";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const { activityStore } = useStore();
  const OpenCreateActivityHandler = () => {
    activityStore.setOpenActivityForm(true);
    activityStore.setEditedActivity(undefined);
    activityStore.setSelectedItem(undefined);
  };
  return (
    <Menu className={styles.navbar} inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "1rem" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item content="Activities" />
        <MenuItem>
          <Button
            positive
            content="Create Activity"
            onClick={OpenCreateActivityHandler}
          />
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
