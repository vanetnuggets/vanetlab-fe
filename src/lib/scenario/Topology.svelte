<script>
  import Container from "./Container.svelte";
  import { containers, topology } from '../../store/store.js';
  let name = ""
  let container_type = null;
  
  let container_types = [
    'csma', 'point_to_point', 'wifi'
  ]

  $topology = {
    "node_count": 0,
    "node_containers": $topology.node_containers,
  }

  function addContainer(){
    if (name.trim() == '' || container_type == null) {
      alert("Názov kontajnera nesmie byť prázdny");
      return;
    }
    $containers = [...$containers, {
      "id": $containers.length, 
      "name": name,
      "type": container_type,
      "network_address": "",
      "network_mask": "",
      "network_name": "",
      "log_pcap": false,
      "log_ascii": false,
      "nodes": []
    }]
    $topology.node_containers = [...$topology.node_containers, name]
    name = ""
  }
  function showAll() {
    let show = $topology
    $containers.forEach(e => {
      let data = e
      show[e.name] = data
    });
    console.log(JSON.stringify({"topology":show}))
  }
</script>

<div class="topology_container_holder">
  <div>
    <div>
      <input bind:value={name} placeholder="Type container's name">
    </div>
    <div>
      Container Type:
      <select bind:value={container_type}>
      {#each container_types as cont_type}
        <option value={cont_type}>
        {cont_type}
        </option>
      {/each}
      </select>
    </div>
  </div>
  
  <button on:click={showAll}>
    #debug
  </button>
  
  <button on:click={addContainer}>
    Add container
  </button>
  
  {#each $containers as c (c.id) }
    <Container name={c.type + ' - ' + c.name} bind:container={$containers[c.id]}/>
  {/each}
</div>




<style>
select  {
  height: 26px;
}
</style>