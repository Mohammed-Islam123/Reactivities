import { Message } from "semantic-ui-react";
import { ValidationError } from "../../../types/validationErrors.type";
import { observer } from "mobx-react-lite";
interface Props {
  errors: ValidationError;
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <Message error>
      {Object.entries(errors).map(([key, value]) => {
        return (
          <Message.List key={key}>
            <Message.Header content={key} />
            {value.map((err) => (
              <Message.Item key={err}>{err}</Message.Item>
            ))}
          </Message.List>
        );
      })}
    </Message>
  );
};

export default observer(ValidationErrors);
