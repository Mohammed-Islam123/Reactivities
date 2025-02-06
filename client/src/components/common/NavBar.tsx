import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import styles from "./NavBar.module.css";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu className={styles.navbar} inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "1rem" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="activities" content="Activities" />
        <MenuItem>
          <Button
            as={NavLink}
            to="createActivity"
            positive
            content="Create Activity"
          />
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
