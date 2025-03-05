import { makeAutoObservable } from "mobx";
import { ValidationError } from "../types/validationErrors.type";

class ErrorStore {
  validationErros: ValidationError | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setValidationErros = (errors: ValidationError | null) => {
    this.validationErros = errors;
  };
}
export { ErrorStore };
