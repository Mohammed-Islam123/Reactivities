import { Button, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";
import { useStore } from "../../../stores/Store";
import { observer } from "mobx-react-lite";

export default observer(function TestErrors() {
  const baseUrl = "http://localhost:5000/api/";
  const store = useStore();
  const errorStore = store.errorStore;
  function handleNotFound() {
    errorStore.setValidationErros(null);

    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    errorStore.setValidationErros(null);

    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    errorStore.setValidationErros(null);

    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    errorStore.setValidationErros(null);

    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    errorStore.setValidationErros(null);
    errorStore.setValidationErros(null);
    axios
      .get(baseUrl + "activities/notaguid")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + "activities", { title: "HEllo" }).catch((err) => {
      if (typeof err == "string") console.log(err);
      else {
        errorStore.setValidationErros(err);
      }
    });
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorised}
            content="Unauthorised"
            basic
            primary
          />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
      </Segment>
      {errorStore.validationErros && (
        <ValidationErrors errors={errorStore.validationErros} />
      )}
    </>
  );
});
