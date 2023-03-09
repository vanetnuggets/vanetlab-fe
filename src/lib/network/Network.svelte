<script>
    import { visibleNetwork } from '../../store/store.js';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { networks } from '../../store/store.js';
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

    let confirm = false

    function deleteContainer() {
        if (confirm){
            $visibleNetwork = "";
            $networks = $networks.filter((value) => value.id !== network.id);
        } else {
            console.log("este potvrdit")
            confirm = true;
        }
    }
    
    // MAGIC
    $: open = ($visibleNetwork == network.name) ? 
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
      <button on:click={clickHandler} class="btn-basic name">
        {network.name}
        <span style="color:{network.color}">⬤</span>
    </button>
      <button on:click={deleteContainer} class="btn-basic remover {confirm ? "confirm": ""}">X</button>
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
  