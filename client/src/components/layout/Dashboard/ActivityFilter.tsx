import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilter = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: "5%" }}>
        <Header content="Filters" icon="filter" attached color="teal" />
        <Menu.Item content="Filter 1" />
        <Menu.Item content="Filter 2" />
        <Menu.Item content="Filter 3" />
      </Menu>
      <Header content="Calender" />
      <Calendar />
    </>
  );
};

export default ActivityFilter;
