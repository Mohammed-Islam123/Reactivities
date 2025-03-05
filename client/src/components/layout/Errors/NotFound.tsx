import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search"></Icon>
        Hey Hey .... What Are You Doing Here ??
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities">
          {" "}
          Go Home{" "}
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
