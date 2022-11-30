<script>
  
  import { slide } from 'svelte/transition'
  import Basic from './containers/basic.svelte'
  import Wifi from './containers/wifi.svelte'
  import { visibleContainer } from '../../store/store.js';
  export let name
  export let container
  
  let container_types = [
    '', 'csma', 'point_to_point', 'wifi'
  ]

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
  // maybe ternary is necessary 
  $: open = ($visibleContainer == container.name) ? 
          (isShown) ? 
            true
          : false
      : handleClosing()
</script>

<style>
  select  {
    height: 26px;
  }
  button {
    width: 360px;
  }
</style>

<div class="topology_container parent">
  <div class="child">
    <button on:click={clickHandler}>{name}</button>
  </div>
  
  {#if open}
  <div transition:slide>
    Select type of node container:
    <select bind:value={container.type}>
      {#each container_types as cont_type}
        <option value={cont_type}>
          {cont_type}
        </option>
      {/each}
    </select>
    {#if container.type =='csma' || container.type == 'point_to_point'}
      <Basic bind:container={container}/>
    {:else if container.type == 'wifi'}
      <Wifi bind:container={container}/>
    {/if}
  </div>
  {/if}
</div>
