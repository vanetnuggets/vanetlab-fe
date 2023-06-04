import { nodes, networks, max_at, connections, labels } from "../store/scenario";
import { labelId, scenarioName } from "../store/store";
import { current_time, current_node, nextNetworkId, nextNodeId, scenarioReadOnly } from "../store/store";
import { isOk, isValidated, isError, errorData, loading, simData } from "../store/summary";
import Init from "./initService";
import { getRemote } from "../lib/api/scenarios";

import { get } from 'svelte/store'
import { scenarioList } from "../store/welcome";
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
  nodes.set(Init.NODES);
  max_at.set(Init.MAX_AT);
  nextNetworkId.set(0)
  nextNodeId.set(0)
  labelId.set(0);
  scenarioReadOnly.set(false)
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
    };
    return tmp;
  })
}

export function checkAndLoad(scenario) {
  // check if the `scenario_name` store variable is set
  let name = get(scenarioName);
  if (name === null || name === undefined || name === "") {
    getRemote(scenario)
      .then((data) => {
        // hopefully enough data's
        loadConfig(data.data.data);
        scenarioName.set(scenario);
      })
      .catch(() => {
        // scenario does not exist or be is fucked
        clearAll();
        initNetworks();
      });
  }
}

export function loadConfig(conf) {
  clearAll();
  networks.update(_ => conf.networks);
  initNetworks();
  nodes.set(conf.nodes);
  max_at.set(conf.max_at);
  if (Object.keys(conf.networks).length > 0) {
    nextNetworkId.set(parseInt(Object.keys(conf.networks).reduce((a, b) => conf.networks[a].id > conf.networks[b].id ? a : b))+1)
  } else {
    nextNetworkId.set(0);
  }
  if (Object.keys(conf.nodes).length > 0) {
    nextNodeId.set(parseInt(Object.keys(conf.nodes).reduce((a, b) => conf.nodes[a].id > conf.nodes[b].id ? a : b))+1)
  } else {
    nextNodeId.set(0);
  }
  connections.set(conf.connections);
  if (conf.labels !== undefined) {
    labelId.set(conf.labels.length);
    labels.set(conf.labels);
  } else {
    labels.set([]);
  }
}

export function assembleConfig() {
  let nets = get(networks);
  let no_default = JSON.parse(JSON.stringify(nets));
  delete no_default[-1];

  return {
    nodes: get(nodes),
    networks: no_default,
    max_at: get(max_at),
    routing: null,
    connections: get(connections),
    labels: get(labels)
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
