function emailValidator () {
  return function email (value) {
    return (value && !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Please enter a valid email'
  }
}

function requiredValidator () {
  return function required (value) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required'
  }
}

function positiveFloatValidator () {
  return function float (value) {
    if (parseFloat(value) >= 0) {
      return true;
    } else {
      return 'Please enter a positive floating point number';
    }
  }
}
  
function integerValidation(value, form) {
    if (!Number.isInteger(Number(value)) || Number(value) < 0)
		return { integerValidation: true } 
}

function floatValidation(value, form) {
    if (Number.isNaN(Number(value)) || Number(value) < 0)
		return { floatValidation: true } 
}
  
  export {
    emailValidator,
    requiredValidator,
    integerValidation,
    floatValidation,
    positiveFloatValidator,
  }
  