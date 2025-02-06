import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Loading from "../../common/Loading";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const handleEditOnClick = () => {
    activityStore.setEditedActivity(activityStore.selectedItem);
  };
  const { id } = useParams<"id">();
  useEffect(() => {
    if (id) activityStore.loadSingleActivity(id);
  }, [activityStore, id]);

  return activityStore.loading ? (
    <Loading />
  ) : (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activityStore.selectedItem?.category}.jpg`}
      />
      <Card.Content>
        <Card.Header>{activityStore.selectedItem?.title} </Card.Header>
        <Card.Meta> {activityStore.selectedItem?.date} </Card.Meta>
        <Card.Description>
          {activityStore.selectedItem?.description}{" "}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            onClick={handleEditOnClick}
            as={Link}
            to={`/activities/${activityStore.selectedItem?.id}/edit`}
          >
            Edit
          </Button>
          <Button
            basic
            color="black"
            onClick={() => activityStore.setSelectedItem(undefined)}
            as={Link}
            to={`/activities`}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
