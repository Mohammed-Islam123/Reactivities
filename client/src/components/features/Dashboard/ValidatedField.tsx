import { FormField, Label } from "semantic-ui-react";
import { ErrorMessage, Field, useField } from "formik";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  rows?: number;
}
const ValidatedField = ({ name, placeholder, type, label, rows }: Props) => {
  const [field, meta] = useField(name);
  return (
    <FormField error={meta.touched && !!meta.error}>
      {label && <label>{label} </label>}
      <Field
        {...field}
        name={name}
        placeholder={placeholder}
        type={type || "text"}
        as={type ? type : ""}
        rows={rows}
      />
      <ErrorMessage
        name={name}
        render={(err) => <Label basic color="red" content={err} />}
      />
    </FormField>
  );
};

export default ValidatedField;
