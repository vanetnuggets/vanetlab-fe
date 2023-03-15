import { nodes, networks, max_at } from "../store/scenario";
import { scenarioName } from "../store/store";

import { get } from 'svelte/store'
// import { max_at } from "../store/store";

export function clearAll() {
  networks.update(_ => { return {}});
  nodes.update(_ => { return {}});
  max_at.update(_ => 0);
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

export function saveLocal() {
  let config = assembleConfig();
  const dataURI = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataURI);
  link.setAttribute("download", `${get(scenarioName)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}