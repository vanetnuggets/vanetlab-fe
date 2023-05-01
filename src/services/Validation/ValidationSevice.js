import { writable } from 'svelte/store'
import { buildValidator } from './BuildValidator.js'

export function setValidator (...validators) {
  const { subscribe, set } = writable({valid: false, message: null })
  const validator = buildValidator(validators)

  function action (node, binding) {
    function validate (value) {
      const result = validator(value)
      // @ts-ignore
      set(result)
    }
    
    validate(binding)

    return {
      update (value) {
        validate(value)
      }
    }
  }


  return [  {subscribe}, action ]
}