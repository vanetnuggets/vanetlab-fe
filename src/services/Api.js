import axios from 'axios'

let baseURL = `https://vanetlab.ml/api`

if (import.meta.env.VITE_BE_API_URL != null) {
  baseURL = import.meta.env.VITE_BE_API_URL
}

let api = axios.create({
  baseURL: baseURL
})

function addApiKey(headers) {
  let key = localStorage.getItem("apiKey");
  if (key == null) {
    return
  }
  headers['Authorization'] = `Bearer: ${key}`;
}

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
    addApiKey(other['headers']);
    return api.post(path, data, other)
  },

  get(path, params={}) {
    let headers = {
      'Referrer-Policy': 'no-referrer'
    };
    addApiKey(headers);
    return api.get(path, {
      headers: headers,
      params: params
    });
  },

  delete(path, params={}) {
    let headers = {
      'Referrer-Policy': 'no-referrer'
    };
    addApiKey(headers);
    return api.delete(path, {
      headers: headers,
      params: params
    });
  },

  getBlob(path, params={}) {
    let headers = {
      'Referrer-Policy': 'no-referrer'
    };
    addApiKey(headers);
    return api.get(path, {
      headers: headers,
      responseType: 'blob',
      params: params
    });
  }
}