import { observer } from "mobx-react-lite";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Activity } from "../../../types/activity.type";
import { format } from "date-fns";

interface Props {
  activity: Activity | undefined;
}

export default observer(function ActivityDetailedInfo({ activity }: Props) {
  if (activity)
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size={"large"} color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{activity.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name={"calendar"} size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(activity.date, "dd MMM yyyy h:mm a")}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name={"marker"} size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {activity.venue}, {activity.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
});
