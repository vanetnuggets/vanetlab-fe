import axios from 'axios'

// let baseURL = `https://vanetlab.ml/api`
let baseURL = `https://vanetlab.ml/api`

if (import.meta.env.VITE_BE_API_URL != null) {
  baseURL = import.meta.env.VITE_BE_API_URL
}

let api = axios.create({
  baseURL: baseURL
})

export default {
  post(path, data, other=null){
    if (other === null) {
      other = {
        headers: {
          'Content-Type': 'application/json',
          'Referrer-Policy': 'no-referrer'
        }
      }
    }
    return api.post(path, data, other)
  },
  get(path, params={}) {
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