function buildValidator (...validators) {
    return function validate (value,comparator) {
      if (!validators || validators.length === 0) {
        return { valid: true }
      }
  
      const failing = validators.find(v => v(value,comparator) !== true)
  
      return {
        valid: !failing,
        message: failing && failing(value)
      }
    }
  }
  
  export { buildValidator }