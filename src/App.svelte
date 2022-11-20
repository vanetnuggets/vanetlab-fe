<style>
  .demo-container{
    position: relative;
    max-width: 1010px;
  }
  .green {
    background-color: green;
  }
</style>

<div class=demo-container>
  <RightDrawer>
  {#if elem_rdrawer == 'node_info'}
    <NodeInfo></NodeInfo>
  {:else if elem_rdrawer == 'container_info' }
    <ContainerInfo></ContainerInfo>
  {/if}
  </RightDrawer>

  <DragContainer/>
  <div class="green">
    <Topology></Topology>
  </div>
</div>

<script>
import Topology from "./lib/Topology.svelte";
import DragContainer from './lib/DragContainer.svelte';
import RightDrawer from "./lib/layouts/RightDrawer.svelte";
import ContainerInfo from "./lib/topology/ContainerInfo.svelte";
import NodeInfo from "./lib/topology/NodeInfo.svelte";
import { show_rdrawer } from './store/store.js';

let elem_rdrawer;
show_rdrawer.subscribe(value => {
  elem_rdrawer = value;
  console.log(elem_rdrawer);
})
</script>