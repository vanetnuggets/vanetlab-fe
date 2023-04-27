function requiredValidator () {
  return function required (value) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required'
  }
}

function positiveFloatValidator () {
  return function float (value) {
    if ( value == null || (!Number.isNaN(Number(value)) && Number(value) >= 0)) {
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

  
  export {
    requiredValidator,
    integerValidation,
    positiveFloatValidator,
  }
  