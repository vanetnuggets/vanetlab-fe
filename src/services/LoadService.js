import { networks } from "../store/store";
import { nodes } from "../store/store";
import { main_config } from "../store/store";
// import { max_at } from "../store/store";

export default function loadConfig(conf) {
  networks.update(_ => conf.networks);
  nodes.update(_ => conf.nodes);
  main_config.update(_ => conf);
  // max_at.update(_ => conf.max_at);
}