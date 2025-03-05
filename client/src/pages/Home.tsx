import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masterhead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="huge"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginButtom: 12 }}
          />
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take Me To Activities !!
        </Button>
      </Container>
    </Segment>
  );
};

export default Home;
