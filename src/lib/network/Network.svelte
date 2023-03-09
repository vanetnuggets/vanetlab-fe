<script>
    import { visibleNetwork } from '../../store/store.js';
    import ColorPicker from 'svelte-awesome-color-picker';
    export let network

    let rgb
    let isShown = false
  
    function clickHandler() {
      isShown = !isShown
      if (isShown) 
      visibleNetwork.set(network.name)
    }
  
    function handleClosing() {
      isShown = false
      return false
    }
    // MAGIC
    $: open = ($visibleNetwork == network.name) ? 
            (isShown) ? 
              true
            : false
        : handleClosing()
  </script>
  
  <style>
    button {
      width: 360px;
    }
  </style>
  
  <div class="topology_container parent">
    <div class="child">
      <button on:click={clickHandler}>{network.name + "g"}</button>
    </div>
    
    {#if open}
    <div>
        <div class="row">
            <div class="col">
                Network name:
            </div>
            <div class="col">
                <input class="my-input" bind:value={network.name} placeholder="example_name">
            </div>
        </div>
        <div class="row">
            <div class="col">
                Network address:
            </div>
            <div class="col">
                <input class="my-input" bind:value={network.address} placeholder="example_address">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ColorPicker bind:rgb bind:hex={network.color}/>
            </div>
        </div>
    </div>
    {/if}
  </div>
  