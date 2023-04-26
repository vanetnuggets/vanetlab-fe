import {emailValidator, requiredValidator, positiveFloatValidator} from "../../services/Validation/Validators.js"
import { writable } from "svelte/store";
import { buildValidator } from "../../services/Validation/BuildValidator.js";

const mobility_attributes = writable({
  Time: {
    validation: buildValidator(requiredValidator(), emailValidator()),
    name: "Time",
    value: null,
    end: "s",
    placeholder: "Movement end time",
    valid: false,
    error_msg: "This field is required",
  },
  X: {
    validation: buildValidator(requiredValidator(), positiveFloatValidator()),
    name: "X",
    value: null,
    end: "",
    placeholder: "Position on x-axis",
    valid: false,
    error_msg: "This field is required",
  },
  Y: {
    name: "Y",
    value: null,
    end: "",
    placeholder: "Position on y-axis",
    validation: "Positive Float",
    valid: false,
    error_msg: "This field is required",
  },
  Z: {
    name: "Z",
    value: null,
    end: "",
    placeholder: "Position on z-axis",
    validation: "Positive Float",
    valid: false,
    error_msg: "This field is required",
  },
});

export default  mobility_attributes;