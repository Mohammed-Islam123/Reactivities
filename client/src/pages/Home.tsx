import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../stores/Store";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useStore().userStore;

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
        {currentUser ? (
          <Button as={Link} to="/activities" size="huge" inverted>
            Go to Activities !!
          </Button>
        ) : (
          <>
            <Button as={Link} to="/login" size="huge" inverted>
              Login
            </Button>
            <Button as={Link} to="/register" size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default Home;
