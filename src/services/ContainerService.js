function wifi_container(id, name) {
  return {
    "id": id, 
    "name": name,
    "type": 'wifi',
    "network_address": "",
    "network_mask": "",
    "ssid": "",
    "AP": null,
    "mobility": "default",
    "log_pcap": false,
    "log_ascii": false,
    "nodes": []
  };
}

function csma_container(id, name) {
  return {
    "id": id, 
    "name": name,
    "type": 'csma',
    "network_address": "",
    "network_mask": "",
    "data_rate": { 
      "value": 0, 
      "format": "" 
    },
    "delay": { 
      "value": 0, 
      "format": "" 
    },
    "log_pcap": false,
    "log_ascii": false,
    "nodes": []
  };
}

function point_to_point_container(id, name) {
  let cont = csma_container(id, name);
  cont.type = 'point_to_point';
  cont.name = name;
  return cont;
}

export {
  wifi_container,
  csma_container,
  point_to_point_container
}