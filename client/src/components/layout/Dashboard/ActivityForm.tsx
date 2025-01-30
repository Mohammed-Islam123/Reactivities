import { useState } from "react";
import { Activity } from "../../../types/activity.type";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import agent from "../../../api/agent";

interface Props {
  editedActivity: Activity | undefined;
  activities: Activity[] | undefined;
  setEditedActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<Activity | undefined>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[] | undefined>>;
  setOpenActivityForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActivityForm = ({
  editedActivity,
  setActivities,
  setSelectedItem,
  setOpenActivityForm,
  activities,
}: Props) => {
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
    const temp = activities ? activities : [];
    const index = temp.findIndex((ele) => ele.id === currentActivityValue.id);
    try {
      if (index === -1) {
        const created = await agent.Activities.addActivity(
          currentActivityValue
        );
        created.date = created.date.split("T")[0];
        setActivities([...temp, created]);
      } else {
        await agent.Activities.editActivity(currentActivityValue);
        temp[index] = currentActivityValue;
        setActivities(temp);
      }
      setSelectedItem(currentActivityValue);
      setOpenActivityForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCurrentActivityValue({ ...currentActivityValue, [name]: value });
  };

  return (
    <Segment clearing style={{ position: "fixed" }}>
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
        <Button positive type="submit" content="Submit" />
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

export default ActivityForm;
