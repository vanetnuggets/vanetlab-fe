import axios from 'axios'

// let baseURL = `https://vanetlab.ml/api`
let baseURL = `http://localhost:5000/api`

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
  },
  getBlob(path, params) {
    return api.get(path, {
      headers: {
        'Referrer-Policy': 'no-referrer'
      },
      responseType: 'blob',
      params: params
    })
  }
}