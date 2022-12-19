import axios from 'axios'

let baseURL = `http://127.0.0.1:9000/api`

if (import.meta.env.VITE_BE_API_URL != null) {
  baseURL = import.meta.env.VITE_BE_API_URL
}

let api = axios.create({
  baseURL: baseURL
})

export default {
  post(path, data){
    return api.post(path, data, {
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referrer'
      }
    })
  },
  get(path, params) {
    return api.get(path, {
      headers: {
        'Referrer-Policy': 'no-referrer'
      },
      params: params
    });
  }
}