<AppLayout>
  <span slot="right">
    <RightDrawer>
      <NodeInfo/>
    </RightDrawer>
  </span>

  <span slot="left" class="test">
    <LeftDrawer>
      <Networks/>
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
      '/app/:scenario/canvas': Canvas,
      '/app/:scenario/summary': Summary,
      '/*': NotFound
    }} />
  </span>
</AppLayout>

<script>
import Router from 'svelte-spa-router'
import NotFound from "../Canvas/NotFound.svelte"
import Summary from "../../lib/vizualize/Summary.svelte"
import BottomBar from "../../lib/layouts/BottomBar.svelte";
import TopBar from "../../lib/layouts/TopBar.svelte";
import LeftDrawer from "../../lib/layouts/LeftDrawer.svelte";
import AppLayout from "../../lib/layouts/AppLayout.svelte";
import Networks from "../../lib/network/Networks.svelte";
import Canvas from '../Canvas/Canvas.svelte';
import RightDrawer from "../../lib/layouts/RightDrawer.svelte";
import NodeInfo from "../../lib/topology/NodeInfo.svelte";
</script>
