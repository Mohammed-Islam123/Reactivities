import { useState } from "react";
import { Activity } from "../../../types/activity.type";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import agent from "../../../api/agent";
import { useStore } from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const {
    activityStore: {
      editedActivity,
      activities,
      setOpenActivityForm,
      submitting,
      setSubmitting,
      setSelectedItem,
    },
  } = useStore();

  const initialActivity: Activity = editedActivity ?? {
    id: uuid(),
    category: "",
    city: "",
    date: "",
    description: "",
    title: "",
    venue: "",
  };

  const [currentActivityValue, setCurrentActivityValue] =
    useState(initialActivity);
  const handleSubmit = async () => {
    setSubmitting(true);
    const exist = activities.has(currentActivityValue.id);

    try {
      if (!exist) {
        const created = await agent.Activities.addActivity(
          currentActivityValue
        );
        created.date = created.date.split("T")[0];
        activities.set(created.id, created);
      } else {
        await agent.Activities.editActivity(currentActivityValue);
        activities.set(currentActivityValue.id, currentActivityValue);
      }
      setSelectedItem(currentActivityValue);
      setOpenActivityForm(false);
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
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
            setOpenActivityForm(false);
            if (editedActivity) setSelectedItem(editedActivity);
          }}
        />{" "}
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
