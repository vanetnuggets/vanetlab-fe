/*
import { canvasSvg } from "../store/store";
import { get } from "svelte/store";
import { nextNodeId } from "../store/store";
import { nodes } from "../store/scenario";

function addNode(sdn=false, pgw=false, x=10, y=10, for_network=null) {
  let nodeId = get(nextNodeId)
  let newNode = {
      id: nodeId,
      type: "basic",
      mobility: {},
      l2id: -1,
      l2: null,
      l2conf: {},
      l3: null,
      l3conf: {},
      x: x,
      y: y

  };
  newNode.mobility['0.0'] = { x: x, y: y, z: 0 };
  if (sdn){
      newNode.type = "sdn";
      newNode["switch_nodes"] = [];
      newNode["controller"] = ""
  } else if (pgw){
      // pgw_node.update(value => ({ ...value, created: true, node_id: newNode.id }));
      newNode.x = 10;
      newNode.y = 10;
      newNode.l2 = "lte"
      newNode.l2id = for_network;
      newNode.l2conf = {"type": "pgw"};
  }
  let tmpNodes = get(nodes);
  tmpNodes[nodeId] = newNode;
  nodes.set(tmpNodes);
  nextNodeId.set(nodeId + 1);

  // wait until it is rendered and add draghandler
  delay(100).then(() => {
    const svg = get(canvasSvg); 
    dragHandler(svg.selectAll(".myPoint"));
  });
}
*/