import { nodes, networks, max_at } from "../store/scenario";
// import { max_at } from "../store/store";

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
  nodes.update(_ => conf.nodes);
}

export function assembleConfig() {
  return {
    nodes: nodes,
    networks: networks,
    max_at: max_at
  };
}