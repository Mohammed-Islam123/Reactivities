import { useEffect, useState } from "react";
import { Activity } from "../../../types/activity.type";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import agent from "../../../api/agent";
import { useStore } from "../../../stores/Store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";

const ActivityForm = () => {
  const {
    activityStore: {
      activitiesMap,
      submitting,
      selectedItem,
      setSubmitting,
      setSelectedItem,
      setEditedActivity,
      loadSingleActivity,
    },
  } = useStore();

  const { id } = useParams();

  const [currentActivityValue, setCurrentActivityValue] = useState<Activity>({
    id: uuid(),
    category: "",
    city: "",
    date: "",
    description: "",
    title: "",
    venue: "",
  });

  useEffect(() => {
    if (!id) return;
    loadSingleActivity(id).then(() => {
      if (selectedItem) setCurrentActivityValue(selectedItem);
    });
  }, [id, selectedItem, loadSingleActivity, setSelectedItem]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setSubmitting(true);
    const exist = activitiesMap.has(currentActivityValue.id);

    try {
      if (!exist) {
        const created = await agent.Activities.addActivity(
          currentActivityValue
        );

        created.date = created.date.split("T")[0];
        currentActivityValue.id = created.id;
        activitiesMap.set(created.id, created);
      } else {
        await agent.Activities.editActivity(currentActivityValue);
        activitiesMap.set(currentActivityValue.id, currentActivityValue);
      }
      setSelectedItem(currentActivityValue);
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
    setEditedActivity(undefined);
    navigate(`/activities/${currentActivityValue.id}`);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCurrentActivityValue({ ...currentActivityValue, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={currentActivityValue.title}
          required
        />
        <Form.TextArea
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={currentActivityValue.description}
          required
        />
        <Form.Input
          type="date"
          placeholder="Date"
          onChange={handleChange}
          name="date"
          value={currentActivityValue.date}
          required
        />
        <Form.Input
          placeholder="Category"
          onChange={handleChange}
          name="category"
          value={currentActivityValue.category}
        />
        <Form.Input
          placeholder="City"
          onChange={handleChange}
          name="city"
          value={currentActivityValue.city}
          required
        />
        <Form.Input
          placeholder="Venue"
          onChange={handleChange}
          required
          name="venue"
          value={currentActivityValue.venue}
        />
        <Button loading={submitting} positive type="submit" content="Submit" />
        <Button
          type="button"
          content="Cancel"
          onClick={() => {
            if (selectedItem) setSelectedItem(selectedItem);
          }}
          as={Link}
          to={
            currentActivityValue.category == ""
              ? `/activities`
              : `/activities/${currentActivityValue.id}`
          }
        />{" "}
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
