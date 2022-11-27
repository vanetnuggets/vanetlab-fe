<style>
  .green {
    background-color: green;
  }
</style>

<AppLayout>
  <span slot="right">
    <RightDrawer>
    {#if elem_rdrawer == 'node_info'}
      <NodeInfo></NodeInfo>
    {:else if elem_rdrawer == 'container_info' }
      <ContainerInfo></ContainerInfo>
    {/if}
    </RightDrawer>
  </span>

  <span slot="left">
    <LeftDrawer>
      <Scenario/>
    </LeftDrawer>
  </span>
  
  <span slot="top">
    <TopBar></TopBar>
  </span>

  <span slot="bottom">
    <BottomBar></BottomBar>
  </span>

  <span slot="content">
    <Router routes={{
      '/': DragContainer,
      '/dragdrop': DragContainer,
      '/notfound': NotFound,
      '*': NotFound
    }} />
  </span>
</AppLayout>


<script>
import Router from 'svelte-spa-router'
import NotFound from "./lib/DragDrop/NotFound.svelte"
import BottomBar from "./lib/layouts/BottomBar.svelte";
import TopBar from "./lib/layouts/TopBar.svelte";
import LeftDrawer from "./lib/layouts/LeftDrawer.svelte";
import AppLayout from "./lib/layouts/AppLayout.svelte";
import Scenario from "./lib/scenario/Scenario.svelte";
import DragContainer from './lib/DragDrop/DragContainer.svelte';
import RightDrawer from "./lib/layouts/RightDrawer.svelte";
import ContainerInfo from "./lib/topology/ContainerInfo.svelte";
import NodeInfo from "./lib/topology/NodeInfo.svelte";
import { show_rdrawer } from './store/store.js';
import Sipky from './lib/sipky/sipky'

let elem_rdrawer;
show_rdrawer.subscribe(value => {
  elem_rdrawer = value;
})

</script>