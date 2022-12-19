<script>
  
  import Basic from './containers/Basic.svelte'
  import Wifi from './containers/Wifi.svelte'
  import { visibleContainer, containers, topology, nodes, node_id, node_info } from '../../store/store.js';
  export let name
  export let container
  
  let isShown = false

  function clickHandler() {
    isShown = !isShown
    if (isShown) 
      visibleContainer.set(container.name)
  }

  function handleClosing() {
    isShown = false
    return false
  }

  function deleteContainer() {
    if (confirm){
      $visibleContainer = "";
      $nodes.forEach(element => {
        element.containers = element.containers.filter((value) => value !== container.name);
      });
      $node_info = $node_info
      $containers = $containers.filter((value) => value.id !== container.id);
      $topology.node_containers = $topology.node_containers.filter((value) => value !== container.name);
    } else {
      console.log("este potvrdit")
      confirm = true;
    }
  }

  let confirm = false
  // maybe ternary is necessary 
  $: open = ($visibleContainer == container?.name) ? 
          (isShown) ? 
            true
          : false
      : handleClosing()
</script>

<style>
  .name {
    width: 330px;
  }
  .remover {
    width: 30px;
    padding: 2px 0;
  }
  .confirm {
    color: red;
  }
</style>

<div class="topology_container parent">
  <div class="child">
    <button on:click={clickHandler} class="name">{name}</button>
    <button on:click={deleteContainer} class="remover {confirm ? "confirm": ""}">X</button>
  </div>
  
  {#if open}
  <div >
    {#if container.type =='csma' || container.type == 'point_to_point'}
      <Basic bind:container={container}/>
    {:else if container.type == 'wifi'}
      <Wifi bind:container={container}/>
    {/if}
  </div>
  {/if}
</div>
