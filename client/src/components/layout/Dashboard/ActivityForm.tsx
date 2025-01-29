import { useState } from "react";
import { Activity } from "../../../types/activity.type";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

interface Props {
  editedActivity: Activity | undefined;
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
  const handleSubmit = () => {
    setActivities((old) => {
      const temp = old ? [...old] : [];
      const index = temp.findIndex((ele) => ele.id === currentActivityValue.id);
      if (index === -1) temp.push(currentActivityValue);
      temp[index] = currentActivityValue;
      return temp;
    });
    setOpenActivityForm(false);
    setSelectedItem(currentActivityValue);
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
          type="text"
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
