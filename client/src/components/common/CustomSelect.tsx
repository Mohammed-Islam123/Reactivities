import { FormField, Label, Select } from "semantic-ui-react";
import { ErrorMessage, useField } from "formik";
interface Props {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  options: { text: string; value: string }[];
}
const CustomSelect = ({ name, options, label }: Props) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      {label && <label>{label} </label>}
      <Select
        options={options}
        clearable
        value={field.value || null}
        onChange={(_, d) => {
          helpers.setValue(d.value);
        }}
        onBlur={() => helpers.setTouched(true)}
      />
      <ErrorMessage
        name={name}
        render={(err) => <Label basic color="red" content={err} />}
      />
    </FormField>
  );
};

export default CustomSelect;
