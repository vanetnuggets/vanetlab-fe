<style>

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
      '/canvas': DragContainer,
      '/summary': Summary,
      '/source/:code': SourceCode,
      '/logs/:code': TraceLogs,
      '/console/:code': ConsoleLogs,
      '*': NotFound
    }} />
  </span>
</AppLayout>


<script>
import Router from 'svelte-spa-router'
import NotFound from "./lib/DragDrop/NotFound.svelte"
import Summary from "./lib/vizualize/Summary.svelte"
import SourceCode from "./lib/vizualize/SourceCode.svelte"
import TraceLogs from './lib/vizualize/TraceLogs.svelte';
import ConsoleLogs from './lib/vizualize/ConsoleLogs.svelte';

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