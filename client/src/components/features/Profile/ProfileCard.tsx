import { Attendee } from "../../../types/activity.type";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ProfileCard({ attendee }: { attendee: Attendee }) {
  return (
    <Card as={Link} to={`/profile/${attendee.userName}`}>
      <Image src={attendee.image || `/assets/user.png`} />
      <Card.Content>
        <Card.Header> {attendee.displayName} </Card.Header>
        <Card.Description>
          {" "}
          {attendee.bio || "Bio placeholder"}{" "}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        999 followers
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;
