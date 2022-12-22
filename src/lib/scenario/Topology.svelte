<script>
  import { slide } from 'svelte/transition'
  import Container from "./Container.svelte";
  import { containers, con_number, topology } from '../../store/store.js';
  import {
    wifi_container,
    csma_container,
    point_to_point_container
  } from '../../services/ContainerService.js'
  import debug from "../../services/DebugService";

  let name = ""
  let container_type = null;
  let counter = 0
  
  let container_types = [
    'csma', 'point_to_point', 'wifi'
  ]

  $topology = {
    "node_count": 0,
    "node_containers": $topology.node_containers,
  }

  function get_index_by_id(id) {
    let index = $containers.findIndex(e => e.id == id)
    return index == null ? null : index;
  }

  function addContainer(){
    if (name.trim() == '') {
      name = 'random_container_'+ counter
      counter++
    }
    if (container_type == null) {
      container_type = container_types[0]
    }
    let new_cont = null;
    let new_id = $con_number;
    $con_number += 1;
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

  let network_open = false;
  function open_creation() {
    network_open = !network_open;
  }
</script>

<div class="topology_container_holder">
  <button class="somebs create-btn btn-trans" on:click={open_creation}>Create a new network.</button>
  {#if network_open == true}
  <div transition:slide>
    <div class="row">
      <div class="col">
        Network name: <br>
      </div>
      <div class="col">
        <input class="my-input" bind:value={name} placeholder="example_name">
      </div>
    </div>
    <div class="row">
      <div class="col">
        Network type: <br>
      </div>
      <div class="col">
        <select bind:value={container_type}>
          {#each container_types as cont_type}
            <option value={cont_type}>
            {cont_type}
            </option>
          {/each}
        </select>
      </div>
    </div>
    {#if debug == true}
    <button on:click={showAll}>
      #debug
    </button>
    {/if}

    <button on:click={addContainer}>
      Create
    </button>
  </div>
  {/if}
  {#each $containers as c (c.name) }
    <Container name={c.type + ' - ' + c.name} bind:container={$containers[get_index_by_id(c.id)]}/>
  {/each}
</div>




<style>
select  {
  height: 26px;
  width: 125px;
  float: right;
  padding: 0px;
  margin: 0px;
}

.create-btn:hover {
  background-color: var(--dark-4);
}

.somebs {
  width: 95%;
}

.topology_container_holder {
  border-radius: 5px;
  background-color: var(--dark-3);
}

.my-input {
  height: 26px;
  padding: 0px;
  margin: 0px;
  width: 125px;
  border-radius: 0px;
  float: right;
}

</style>