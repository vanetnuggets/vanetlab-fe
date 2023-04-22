import { simData, currentStatus, loading, isOk, isError, errorData } from "../store/summary";
import Api from "./Api";

let baseURL = `ws://vanetlab.ml/api/ws/`
if (import.meta.env.VITE_BE_WS_URL != null) {
  baseURL = import.meta.env.VITE_BE_WS_URL
}

export default function createSock(name) {
  const addr = `${baseURL}status/${name}`
  const socket = new WebSocket(addr);

  socket.addEventListener('message', ev => {
    const data = JSON.parse(ev.data);
    currentStatus.set(data);

    if (data.finished) {
      // simulation done - error or not
      loading.update(val => ({
        ...val, scenario: false
      }));

      // simulation finished
      if (data.status.error) {
        // error during simulation
        isError.set(true);
        errorData.set(data.status.message);
      } else {
        // simulation successfull
        
        Api.get(`/summary/${name}`)
         .then(resp => {
           const data = resp.data.data;
           simData.set(data);
           isOk.set(true);
         })
      }
    }
    else {
      // still simulating / in queue
      loading.update(val => ({
        ...val, scenario: true
      }));
    }
  });
} 