<script>
    import Network from "./Network.svelte";
    import {  lte_exists, nextNetworkId } from "../../store/store";
    import { networks } from "../../store/scenario";
    import { slide } from 'svelte/transition'
    import ColorPicker from 'svelte-awesome-color-picker';
    import Switch from "./Switch.svelte";
    import Connections from "./Connections.svelte";
    import ValidateInputNetworks from "../validation/ValidateInputNetworks.svelte";
    import { networks_attributes } from "../../store/validation";

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

  let valid = false
  $: if ( name != null && address != null){
        valid = false
        let name_validation = $networks_attributes["name"].validation(name,$networks)
        let address_validation = $networks_attributes["address"].validation(address,$networks)
        if(name_validation.valid && address_validation.valid)
          valid = true

      } else 
        valid = false

</script>


<div style="display: flex; justify-content: center; width: 100%;">
  <button class="btn-basic" on:click={(_)=> networks_toggle = !networks_toggle}>
    Networks
  </button>
</div>
{#if networks_toggle}
  <div transition:slide>
    {#if netarr.length < 2}
      <p style="padding-top:5px; padding-bottom:10px; font-size:14px">Create your first network down below!</p>
    {/if}
    {#each netarr as n (n.id)}
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
    <ValidateInputNetworks bind:value={name} attribute={$networks_attributes["name"]} comparator={$networks} ></ValidateInputNetworks><br>  
    <ValidateInputNetworks bind:value={address} attribute={$networks_attributes["address"]} comparator={null} ></ValidateInputNetworks><br> 
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
    <button class="btn-basic" on:click={addContainer} disabled={!valid}>
        Create
    </button>
  </div>
{/if}
<div>
  <Connections/>
</div>

