import { ErrorMessage, Form, Formik } from "formik";
import userLogin from "../../../types/user.type";
import ValidatedField from "../Dashboard/ValidatedField";
import { Button, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/Store";
function LoginForm() {
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const { login } = useStore().userStore;
  const handleSubmit = async (userData: userLogin) => {
    await login(userData);
  };
  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "", error: "" }}
        onSubmit={(values, { setErrors }) =>
          handleSubmit(values).catch(() => {
            setErrors({ error: "Invalid Email or password" });
          })
        }
      >
        {({ handleSubmit, isSubmitting, dirty, isValid, errors }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="false"
          >
            <ValidatedField name="email" placeholder="Enter Your Email" />
            <ValidatedField
              name="password"
              placeholder="Enter Your Password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: "15px" }}
                  content={errors.error}
                />
              )}
            />
            <Button
              fluid
              loading={isSubmitting}
              positive
              type="submit"
              content="Login"
              disabled={isSubmitting || !dirty || !isValid}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(LoginForm);
