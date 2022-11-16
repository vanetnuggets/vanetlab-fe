<svelte:head>
  <title>Example — Add/Remove</title>
  <meta name="description" content="Svelte-grid — Example — Add/Remove" />
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage,example,examples,samples,add,remove,dynamic" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<style>
  .demo-container{
    width: 1000px;
  }
</style>

<div class=demo-container>
  <List/>
  <div>
    <Topology></Topology>
  </div>
</div>

<script>
import Topology from "./lib/Topology.svelte";
import List from './lib/DragDrop/List.svelte';
	
	
</script>