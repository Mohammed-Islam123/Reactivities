import { FormField, Label } from "semantic-ui-react";
import { ErrorMessage, useField } from "formik";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  rows?: number;
  inputType?: string;
}
const ValidatedField = ({ inputType, ...props }: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <FormField error={meta.touched && !!meta.error}>
      {props.label && <label>{props.label} </label>}
      {inputType == "textarea" ? (
        <textarea {...field} {...props} />
      ) : (
        <input {...field} {...props} />
      )}

      <ErrorMessage
        name={props.name}
        render={(err) => <Label basic color="red" content={err} />}
      />
    </FormField>
  );
};

export default ValidatedField;
