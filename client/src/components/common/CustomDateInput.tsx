import { FormField, Label } from "semantic-ui-react";
import { ErrorMessage, useField } from "formik";
import DatePicker, { DatePickerProps } from "react-datepicker";

const CustomDatePicker = (props: DatePickerProps) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <FormField error={meta.touched && !!meta.error} style={{ width: "100%" }}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date: Date | null) => {
          helpers.setValue(date);
        }}
        placeholderText={props.placeholderText}
      />
      <ErrorMessage
        name={props.name!}
        render={(err) => <Label basic color="red" content={err} />}
      />
    </FormField>
  );
};

export default CustomDatePicker;
