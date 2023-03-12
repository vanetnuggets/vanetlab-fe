import { nodes, networks, max_at } from "../store/scenario";
// import { max_at } from "../store/store";

export function clearAll() {
  networks.update(_ => {});
  nodes.update(_ => {});
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
  // test scenarios do not have x, y values because.. they use ns2 mobility.
  for (let key of Object.keys(conf.nodes)) {
    let node = conf.nodes[key];
    if (node.x === undefined) {
      node.x = Math.floor(Math.random() * 200);
    }
    if (node.y === undefined) {
      node.y = Math.floor(Math.random() * 200);
    }
  }
  networks.update(_ => conf.networks);
  initNetworks();
  nodes.update(_ => conf.nodes);
}

export function assembleConfig() {
  let no_default = $networks;
  delete no_default[-1];

  return {
    nodes: $nodes,
    networks: no_default,
    max_at: $max_at
  };
}