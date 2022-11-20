<svelte:head>
  <title>Example — Add/Remove</title>
  <meta name="description" content="Svelte-grid — Example — Add/Remove" />
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage,example,examples,samples,add,remove,dynamic" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<style>
  .demo-container{
    width: 1000px;
    position: relative;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
</style>

<div class=demo-container>
  <div class="yellow">
    <DragContainer class="yellow"/>
  </div>
  <div class="green">
    <Topology></Topology>
  </div>
</div>

<script>
import Topology from "./lib/Topology.svelte";
import DragContainer from './lib/DragContainer.svelte';
	
	
</script>