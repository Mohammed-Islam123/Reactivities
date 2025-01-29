import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import styles from "./NavBar.module.css";

interface Props {
  OpenCreateActivityHandler: () => void;
}
const NavBar = ({ OpenCreateActivityHandler }: Props) => {
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

export default NavBar;
