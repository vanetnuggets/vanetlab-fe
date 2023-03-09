<script>
    import Network from "./Network.svelte";
    import { networks, nextNetworkId } from "../../store/store";
    import { slide } from 'svelte/transition'
    import ColorPicker from 'svelte-awesome-color-picker';
    import Switch from "./Switch.svelte";


    let rgb;
    let netarr;
    networks.subscribe(val => {
      netarr = Object.values(val);
    })

  function addContainer(){
    let new_network = {
        "id": $nextNetworkId,
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
  }

  function debugBS(){
    let json = {
        "networks": {}
    }
    netarr.forEach(element => { 
        json.networks[element.id] = element
    });
    console.log(JSON.stringify(json))
    json = null
  }

  let network_open = false;
  function toggle_creation() {
    network_open = !network_open;
  }

 
  let name = ""
  let address = ""
  let color
  let switchValue = "WIFI"


</script>

{#each netarr as n (n.id) }
    <Network bind:network={$networks[n.id]}/>
{/each}

<button on:click={toggle_creation}>
    Add network
</button>
{#if network_open == true}
  <div transition:slide>
    <div class="row">
      <div class="col">
        Network name:
      </div>
      <div class="col">
        <input class="my-input" bind:value={name} placeholder="example_name">
      </div>
    </div>
    <div class="row">
      <div class="col">
        Network address:
      </div>
      <div class="col">
        <input class="my-input" bind:value={address} placeholder="example_address">
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
          <Switch bind:switchValue={switchValue}/> 
      </div>
    </div>
    <button on:click={addContainer}>
        Create
    </button>
</div>
{/if}

