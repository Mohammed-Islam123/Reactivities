import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const handleEditOnClick = () => {
    activityStore.setEditedActivity(activityStore.selectedItem);
    activityStore.setSelectedItem(undefined);
    activityStore.setOpenActivityForm(true);
  };
  return (
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
          <Button basic color="blue" onClick={handleEditOnClick}>
            Edit
          </Button>
          <Button
            basic
            color="black"
            onClick={() => {
              activityStore.setSelectedItem(undefined);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
