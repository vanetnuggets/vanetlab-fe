function requiredValidator () {
  return function required (value,comparator) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required'
  }
}

function positiveFloatValidator () {
  return function float (value,comparator) {
    if ( value == null || (!Number.isNaN(Number(value)) && Number(value) >= 0)) {
      return true;
    } else {
      return 'Please enter a positive floating point number';
    }
  }
}
  
function positiveIntegerValidator() {
  return function int (value,comparator) {
    if ( value == null || (Number.isInteger(Number(value)) && Number(value) >= 0)) {
      return true;
    } else {
      return 'Please enter a positive integer point number';
    }
  }
}

function portValidator() {
  return function port (value,comparator) {
    if ( value == null || (Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 65535)) {
      return true;
    } else {
      return 'Please enter a positive integer value between 1 - 65535';
    }
  }
}

function higherValueValidator() {
  
  return function higher (value,comparator) {
    if ( value == null || (Number(value) >= Number(comparator))) {
      return true;
    } else {
      return 'Please enter value higher then Start' ;
    }
  }
}

function ipAddressValidator() {  

  return function ipaddress (value,comparator) {
    if ( value == null || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|([1]?|[2]?)[0-9])$/.test(value)) {
      return true;
    } else {
      return 'Must be ip address in CIDR notation' ;
    }
  }
}  

function nameValidator() {  

  return function name (value,comparator) {
    let valid = true
    if(value != null){
      Object.values(comparator).forEach(network => {
        if(network.ssid == value)
          valid = false
      });
    }
    if(!valid){
      return 'Name must be unique'
    } else 
      return true
  }
}  



  
  export {
    requiredValidator,
    positiveIntegerValidator,
    positiveFloatValidator,
    portValidator,
    higherValueValidator,
    ipAddressValidator,
    nameValidator
  }
  