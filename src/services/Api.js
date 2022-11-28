import axios from 'axios'

let api = axios.create({
  baseURL: `http://127.0.0.1:9000`
})

export default {
    post(path, data){
      return api.post(path, data, {headers: {
        'Content-Type': 'application/json',
    }})
    },
    get(path, params) {
      return api.get(path, params);
    }
  }