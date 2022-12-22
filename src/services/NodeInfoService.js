import { nodes, containers, apps } from '../store/store.js';
import { get } from 'svelte/store'

class NodeInfoService {
  static _get_by_id(arr, id) {
    for (let a of arr) {
      if (a.id == id) {
        return a;
      }
    }
    return null;
  }

  static info_by_id(id) {
    
    let nodes_ = get(nodes);
    let containers_ = get(containers);
    let apps_ = get(apps);

    let info = {}
    info['general'] = NodeInfoService._get_by_id(nodes_, id);
    
    if (info['general'] == null) {
      return {};
    }

    info['networks'] = {}
    for(let cont of containers_) {
      if (!cont.nodes.includes(id)) {
        continue;
      }
      info['networks'][cont.name] = {};
      info['networks'][cont.name].network = cont;
    }

    for(let client of apps_.client) {
      if (client.node == id) {
        info['networks'][client.network].client = client;
      }
    }

    for (let serv of apps_.server) {
      if (serv.node == id ) {
        info['networks'][serv.network].server = serv;
      }
    }
    return info;
  }
}

export default NodeInfoService;