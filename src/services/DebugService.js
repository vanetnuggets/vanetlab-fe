let debug = false

if (import.meta.env.VITE_DEBUG != null) {
  debug = import.meta.env.VITE_DEBUG
}

export default debug;