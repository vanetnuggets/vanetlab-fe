<script>
    import Network from "./Network.svelte";
    import { networks, nextNetworkId } from "../../store/store";
    import { slide } from 'svelte/transition'
    import ColorPicker from 'svelte-awesome-color-picker';

    let rgb;

    function get_index_by_id(id) {
    for(let i=0; i<$networks.length; i++) {
      let cont = $networks[i];
      if (cont.id == id) {
        return i;
      }
    }
    return null;
  }

  function addContainer(){
    let new_network = {
        "id": $nextNetworkId,
        "name": name,
        "address": address,
        "color": color
    }
    $networks = [...$networks, new_network]
    $nextNetworkId+=1
    toggle_creation()
    color = "#ff0000"
  }

  let network_open = false;
  function toggle_creation() {
    network_open = !network_open;
  }

  let name = ""
  let address = ""
  let color

</script>

{#each $networks as n (n.id) }
    <Network bind:network={$networks[get_index_by_id(n.id)]}/>
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
    <button on:click={addContainer}>
        Create
    </button>
</div>
{/if}

