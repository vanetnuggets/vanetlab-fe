import { requiredValidator, positiveFloatValidator} from "../services/Validation/Validators.js"
import { writable } from "svelte/store";
import { buildValidator } from "../services/Validation/ValidationSevice.js";

export const validator = writable(false)
export const mobility_valid = writable(false)

export const mobility_attributes = writable({
  time: {
    validation: buildValidator(positiveFloatValidator()),
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



