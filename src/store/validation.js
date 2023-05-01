import { requiredValidator, positiveFloatValidator, positiveIntegerValidator, portValidator, higherValueValidator,ipAddressValidator,nameValidator} from "../services/validation/Validators.js"
import { writable } from "svelte/store";
import { buildValidator } from "../services/validation/ValidationSevice.js";

export const mobility_attributes = writable({
  time: {
    validation: buildValidator(positiveIntegerValidator()),
    name: "Time",
    end: "sec",
    placeholder: "Movement end time"
  },
  x: {
    validation: buildValidator(positiveFloatValidator()),
    name: "X",
    end: "px",
    placeholder: "Position on x-axis"
  },
  y: {
    validation: buildValidator(positiveFloatValidator()),
    name: "Y",
    end: "px",
    placeholder: "Position on y-axis"
  },
  z: {
    validation: buildValidator(positiveFloatValidator()),
    name: "Z",
    end: "px",
    placeholder: "Position on z-axis"
  },
});

export const networks_attributes = writable({
  name: {
    validation: buildValidator(requiredValidator(),nameValidator()),
    name: "Network name",
    placeholder: "example_name"
  },
  address: {
    validation: buildValidator(requiredValidator(),ipAddressValidator()),
    name: "Network address",
    placeholder: "example_address"
  }
});

export const l3_attributes = writable({
  port: {
    validation: buildValidator(requiredValidator(),portValidator()),
    name: "Port",
    end: "",
    placeholder: "Port for communication"
  },
  start: { 
    validation: buildValidator(requiredValidator(),positiveIntegerValidator()),
    name: "Start",
    end: "sec",
    placeholder: "Start of communication"
  },
  stop: {
    validation: buildValidator(requiredValidator(),positiveIntegerValidator(),higherValueValidator()),
    name: "Stop",
    end: "sec",
    placeholder: "Stop of communication"
  },
  comm: {
    validation: buildValidator(requiredValidator()),
    name: "Communication",
    end: "",
    placeholder: "Node to communicate with"
  }
});

export const l3_optional_attributes = writable({
  udpclient: {
      interval:{
        validation: buildValidator(requiredValidator(),positiveFloatValidator()),
        name: "Interval",
        end: "",
        placeholder: "Interval"
      },
      packet_size: {
        validation: buildValidator(requiredValidator(),positiveFloatValidator()),
        name: "Packet size",
        end: "Mb",
        placeholder: "Packet size"
      },
      max_packets: {
        validation: buildValidator(requiredValidator(),positiveIntegerValidator()),
        name: "Max Packets",
        end: "ks",
        placeholder: "Maximum number of packets"
      },
  },
  udpserver: {
  },
  tcpclient: {
      max_bytes: {
        validation: buildValidator(requiredValidator(),positiveIntegerValidator()),
        name: "Max Bytes",
        end: "byte",
        placeholder: "Maximum number of bytes"
      },
  },
  tcpserver: {
  },
});

export const l2_optional_attributes = writable({
  wifi: {
      RxGain : {
        validation: buildValidator(requiredValidator(),positiveFloatValidator()),
        name: "RxGain",
        end: "",
        placeholder: "RxGain"
      },
      TxGain : {
        validation: buildValidator(requiredValidator(),positiveFloatValidator()),
        name: "TxGain",
        end: "",
        placeholder: "TxGain"
      }
  },
  eth: {
      DataRate  : {
        validation: buildValidator(requiredValidator(),positiveIntegerValidator()),
        name: "DataRate",
        end: "Mbps",
        placeholder: "DataRate"
      },
      Delay : {
        validation: buildValidator(requiredValidator(),positiveIntegerValidator()),
        name: "Delay",
        end: "ms",
        placeholder: "Delay"
      },
  }
});




