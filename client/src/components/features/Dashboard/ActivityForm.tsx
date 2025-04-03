import { useEffect, useState } from "react";
import { ActivityFormValues } from "../../../types/activity.type";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/Store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ValidatedField from "./ValidatedField";
import { Options } from "../../common/Data";
import CustomSelect from "../../common/CustomSelect";
import CustomDatePicker from "../../common/CustomDateInput";
const ActivityForm = () => {
  const {
    activityStore: {
      createActivity,
      selectedItem,

      setSelectedItem,
      setEditedActivity,
      loadSingleActivity,
    },
  } = useStore();

  const { id } = useParams();

  const [currentActivityValue, setCurrentActivityValue] =
    useState<ActivityFormValues>(new ActivityFormValues());

  useEffect(() => {
    if (!id) return;
    loadSingleActivity(id).then(() => {
      if (selectedItem) setCurrentActivityValue(selectedItem);
    });
  }, [id, selectedItem, loadSingleActivity, setSelectedItem]);
  const navigate = useNavigate();

  const handleFormSubmit = async (activity: ActivityFormValues) => {
    await createActivity(activity);
    setEditedActivity(undefined);
    navigate(`/activities/${activity.id}`);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    date: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });
  return (
    <Segment clearing>
      <Formik
        initialValues={currentActivityValue}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, dirty, isValid }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <ValidatedField placeholder="Title" name="title" />
            <ValidatedField
              placeholder="Description"
              name="description"
              type="text"
              inputType="textarea"
              rows={4}
            />
            <CustomSelect
              options={Options}
              name="category"
              placeholder="Descriptions"
            />
            <CustomDatePicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
            <ValidatedField placeholder="City" name="city" />
            <ValidatedField placeholder="Venue" name="venue" />
            <Button
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
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
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
