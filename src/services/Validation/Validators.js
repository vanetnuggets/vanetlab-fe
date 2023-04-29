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
  
function positiveIntegerValidation() {
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



  
  export {
    requiredValidator,
    positiveIntegerValidation,
    positiveFloatValidator,
    portValidator,
    higherValueValidator

  }
  