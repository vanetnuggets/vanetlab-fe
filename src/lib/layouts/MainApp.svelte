<AppLayout>
  <span slot="right">
    <RightDrawer>
      <NodeInfo/>
    </RightDrawer>
  </span>

  <span slot="left">
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
      '/app/canvas': Canvas,
      '/app/summary': Summary,
      '/app/sumo': Sumo,
      '/app/source/:code': SourceCode,
      '/app/logs/:code': TraceLogs,
      '/app/console/:code': ConsoleLogs,
      '/*': NotFound
    }} />
  </span>
</AppLayout>

<script>
import Router from 'svelte-spa-router'
import NotFound from "../Canvas/NotFound.svelte"
import Summary from "../../lib/vizualize/Summary.svelte"
import Sumo from "../../lib/vizualize/Sumo.svelte"
import SourceCode from "../../lib/vizualize/SourceCode.svelte"
import TraceLogs from '../../lib/vizualize/TraceLogs.svelte';
import ConsoleLogs from '../../lib/vizualize/ConsoleLogs.svelte';

import BottomBar from "../../lib/layouts/BottomBar.svelte";
import TopBar from "../../lib/layouts/TopBar.svelte";
import LeftDrawer from "../../lib/layouts/LeftDrawer.svelte";
import AppLayout from "../../lib/layouts/AppLayout.svelte";
import Networks from "../../lib/network/Networks.svelte";
import Canvas from '../Canvas/Canvas.svelte';
import RightDrawer from "../../lib/layouts/RightDrawer.svelte";
import NodeInfo from "../../lib/topology/NodeInfo.svelte";
</script>