<script>

  import { slide } from 'svelte/transition'
  import { nodes, show_rdrawer, node_info, units } from '../../../store/store'

  export let container
  
  
  let isNodeArrayVisible = false
  let check = false

  function handleArray() {
    isNodeArrayVisible = !isNodeArrayVisible
  }

  async function init() {  }

  function debug() {
    console.log(container);
  }

  function ContainerToNode(node_id){
    $nodes.forEach(n => {
      if(n.id==node_id){
        if(!check)
          n.containers = n.containers.filter((value) => value !== container.name);
        else
          n.containers = [...n.containers, container.name ]
      show_rdrawer.update(_ => 'node_info');
      node_info.update(_ => n);
      }
    });
  }
  
</script>

{#await init() then }
<div transition:slide>
  <div class="child">
      <p>Data rate: </p>
      <input type=number bind:value={container.data_rate.value} min=1 max=1024>
      <select bind:value={container.data_rate.format}>
        {#each $units.rate as unit}
          <option value={unit}>
            {unit}
          </option>
        {/each}
      </select>
  </div>
  
  <div class="child">
      <p>Delay: </p>
      <input type=number bind:value={container.delay.value} min=1 max=10000>
      <select bind:value={container.delay.format}>
        {#each $units.delay as unit}
          <option value={unit}>
            {unit}
          </option>
        {/each}
      </select>
  </div>
  <div class="child">
      <p>Adresa siete: </p>
      <input bind:value={container.network_address} placeholder="Network adress">
  </div>
  <div class="child">
      <p>Maska siete: </p>
      <input bind:value={container.network_mask} placeholder="Network mask">
  </div>

  <div>
    <label>
      <input type=checkbox bind:checked={container.log_pcap}> Log .pcap
    </label>
    <label>
      <input type=checkbox bind:checked={container.log_ascii}> Log ascii trace
    </label>
  </div>
  

  <div>
      <button on:click={handleArray}>Show nodes</button>
      {#if isNodeArrayVisible}
      <ul class="nodes" style="list-style-type: none;">
        {#each $nodes as n (n.id) }
        <li>
          <input type=checkbox bind:checked={check} on:change={() => ContainerToNode(n.id)}  bind:group={container.nodes} 
          disabled={container.type === "point_to_point" ? (container.nodes.length === 2 && !container.nodes.includes(n.id)) : false}
          name="nodes" value={n.id}>
          Node #{n.id}
        </li> 
        {/each}
      </ul>
      {/if}
  </div>
  <div>
    <button on:click={debug}>
      #debug
    </button>
  </div>
</div>
{/await}
