import { nodes, networks, max_at } from "../store/scenario";
import { scenarioName } from "../store/store";
import { current_time, current_node } from "../store/store";
import { isOk, isValidated, isError, errorData, loading, simData } from "../store/summary";
import Init from "../services/initService";

import { get } from 'svelte/store'
// import { max_at } from "../store/store";

export function clearAll() {
  isOk.set(Init.OK);
  isValidated.set(Init.VALIDATED);
  isError.set(Init.ERR);
  errorData.set(Init.ERR_DATA);
  loading.set(Init.LOADING);
  simData.set(Init.SIM_DATA);

  current_node.set(Init.CURRENT_NODE)
  current_time.set(Init.CURRENT_TIME);

  networks.set(Init.NETWORKS);
  nodes.update(Init.NODES);
  max_at.update(Init.MAX_AT);
}


export function initNetworks() {
  networks.update(val => {
    let tmp = val;
    tmp[-1] = {
      id: -1,
      color: "#000000",
      ssid: "default",
      type: null,
      addr: null
    }
    return tmp;
  })
}

export function loadConfig(conf) {
  networks.update(_ => conf.networks);
  initNetworks();
  nodes.update(_ => conf.nodes);
  max_at.update(_ => conf.max_at);
}

export function assembleConfig() {
  let nets = get(networks);
  let no_default = JSON.parse(JSON.stringify(nets));
  delete no_default[-1];

  return {
    nodes: get(nodes),
    networks: no_default,
    max_at: get(max_at)
  };
}

export function download(data, type) {
  const dataURI = `data:${type};charset=utf-8,` + encodeURIComponent(JSON.stringify(data, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataURI);
  link.setAttribute("download", `${get(scenarioName)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function saveLocal() {
  let config = assembleConfig();
  download(config, 'application/json')
}

export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}