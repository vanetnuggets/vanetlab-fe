export function integerValidation(value, form) {
    if (!Number.isInteger(Number(value)) || Number(value) < 0)
		return { integerValidation: true } 
}

export function floatValidation(value, form) {
    if (Number.isNaN(Number(value)) || Number(value) < 0)
		return { floatValidation: true } 
}