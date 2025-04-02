import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import styles from "./NavBar.module.css";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../../stores/Store";

const NavBar = () => {
  const { logout, currentUser } = useStore().userStore;

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
        <Menu.Item as={NavLink} to="errors" content="Test Errors" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
        {currentUser && (
          <Menu.Item position="right">
            <Image src={`/assets/user.png`} avatar spaced="right" />

            <Dropdown pointing="top left" text={currentUser?.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${currentUser?.username}`}
                  content="My profile"
                />
                <Dropdown.Item
                  as={Link}
                  to={`/`}
                  content="Logout"
                  onClick={() => logout()}
                  icon="power"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
