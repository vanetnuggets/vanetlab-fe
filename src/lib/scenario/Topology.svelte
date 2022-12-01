<script>
  import Container from "./Container.svelte";
  import { containers, topology } from '../../store/store.js';
  import {
    wifi_container,
    csma_container,
    point_to_point_container
  } from '../../services/ContainerService.js'

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
    if (name.trim() == '') {
      alert("Názov kontajnera nesmie byť prázdny");
      return;
    }
    if (container_type == null) {
      alert("Typ kontajnera nesmie byť prázdny");
      return;
    }
    let new_cont = null;
    let new_id = $containers.length
    if (container_type == 'wifi') {
      new_cont = wifi_container(new_id, name)
    }
    else if (container_type == 'csma') {
      new_cont = csma_container(new_id, name)
    }
    else if (container_type == 'point_to_point') {
      new_cont = point_to_point_container(new_id, name)
    } else {
      alert('wtf')
      return;
    }

    $containers = [...$containers, new_cont]
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