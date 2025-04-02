import { ErrorMessage, Form, Formik } from "formik";
import userLogin from "../../../types/user.type";
import ValidatedField from "../Dashboard/ValidatedField";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/Store";
import ValidationErrors from "../Errors/ValidationErrors";
import { ValidationError } from "../../../types/validationErrors.type";
function RegisterForm() {
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    username: Yup.string().required(),
    displayName: Yup.string().required(),
  });
  const { register } = useStore().userStore;
  const handleSubmit = async (userData: userLogin) => {
    await register(userData);
  };
  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
          displayName: "",
          username: "",
          error: "",
        }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          handleSubmit(values).catch((reason) => {
            setErrors({ error: reason });
            setSubmitting(false);
          });
        }}
      >
        {({ handleSubmit, isSubmitting, dirty, isValid, errors }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="false"
          >
            <ValidatedField name="email" placeholder="Enter Your Email" />
            <ValidatedField name="displayName" placeholder="Enter Full Name" />
            <ValidatedField
              name="username"
              placeholder="Enter Your Username "
            />
            <ValidatedField
              name="password"
              placeholder="Enter Your Password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <ValidationErrors
                  errors={errors.error as unknown as ValidationError}
                />
              )}
            />
            <Button
              fluid
              loading={isSubmitting}
              positive
              type="submit"
              content="Register"
              disabled={isSubmitting || !dirty || !isValid}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(RegisterForm);
