<script>
    import Network from "./Network.svelte";
    import {  lte_exists, nextNetworkId } from "../../store/store";
    import { networks } from "../../store/scenario";
    import { slide } from 'svelte/transition'
    import ColorPicker from 'svelte-awesome-color-picker';
    import Switch from "./Switch.svelte";
    import Connections from "./Connections.svelte";

    let rgb;
    let name = ""
    let address = ""
    let color
    let switchValue = "WIFI"
    let netarr;
    let networks_toggle = true;
    
    networks.subscribe(val => {
      netarr = Object.values(val);
    })

  function addContainer(){
    let new_network = {
        "id": $nextNetworkId.toString(),
        "ssid": name,
        "addr": address,
        "color": color,
        "type": switchValue
    }
    $networks[$nextNetworkId] = new_network;
    $nextNetworkId+=1
    color = "#ff0000"
    toggle_creation()
    debugBS()
    if (switchValue == "LTE") {
      lte_exists.set(true)
      switchValue = "WIFI";
    }
  }

  function debugBS(){
    let json = {
        "networks": {}
    }
    netarr.forEach(element => { 
        json.networks[element.id] = element
    });
    json = null
  }

  let network_open = false;
  function toggle_creation() {
    network_open = !network_open;
  }
</script>


<div style="display: flex; justify-content: center; width: 100%;">
  <button class="btn-basic" on:click={(_)=> networks_toggle = !networks_toggle}>
    Networks
  </button>
</div>
{#if networks_toggle}
  <div transition:slide>
    {#each netarr as n (n.id) }
        {#if n.id != -1}
          <Network bind:network={$networks[n.id]}/>
        {/if}
      {/each}
  </div>  
{/if}

<button class="btn-basic" on:click={toggle_creation}>
    New network
</button>
{#if network_open == true}
  <div transition:slide style="padding: 10px;">
    <div class="row">
      <div class="col">
        Network name:
      </div>
      <div class="col">
        <input class="my-input-l" bind:value={name} placeholder="example_name">
      </div>
    </div>
    <div class="row">
      <div class="col">
        Network address:
      </div>
      <div class="col">
        <input class="my-input-l" bind:value={address} placeholder="example_address">
      </div>
    </div>
    <div class="row">
        <div class="col">
            <ColorPicker bind:rgb bind:hex={color}/>
        </div>
    </div>
    <div class="row">
      <div class="col">
          Network type:
      </div>
      <div class="col">
          <Switch bind:switchValue={switchValue} networkId={$nextNetworkId}/> 
      </div>
    </div>
    <button class="btn-basic" on:click={addContainer}>
        Create
    </button>
  </div>
{/if}
<div>
  <Connections/>
</div>

