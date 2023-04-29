import { requiredValidator, positiveFloatValidator, positiveIntegerValidation, portValidator, higherValueValidator} from "../services/validation/Validators.js"
import { writable } from "svelte/store";
import { buildValidator } from "../services/validation/ValidationSevice.js";

export const mobility_attributes = writable({
  time: {
    validation: buildValidator(positiveIntegerValidation()),
    name: "Time",
    type: "number",
    end: "sec",
    placeholder: "Movement end time"
  },
  x: {
    validation: buildValidator(positiveFloatValidator()),
    name: "X",
    type: "number",
    end: "px",
    placeholder: "Position on x-axis"
  },
  y: {
    validation: buildValidator(positiveFloatValidator()),
    name: "Y",
    type: "number",
    end: "px",
    placeholder: "Position on y-axis"
  },
  z: {
    validation: buildValidator(positiveFloatValidator()),
    name: "Z",
    type: "number",
    end: "px",
    placeholder: "Position on z-axis"
  },
});

export const l3_attributes = writable({
  port: {
    validation: buildValidator(requiredValidator(),portValidator()),
    name: "Port",
    type: "number",
    end: "",
    placeholder: "Port for communication"
  },
  start: { 
    validation: buildValidator(requiredValidator(),positiveIntegerValidation()),
    name: "Start",
    type: "number",
    end: "sec",
    placeholder: "Start of communication"
  },
  stop: {
    validation: buildValidator(requiredValidator(),positiveIntegerValidation(),higherValueValidator()),
    name: "Stop",
    type: "number",
    end: "sec",
    placeholder: "Stop of communication"
  },
  comm: {
    validation: buildValidator(requiredValidator()),
    name: "Communication",
    type: "select",
    end: "",
    placeholder: "Node to communicate with"
  }
});



