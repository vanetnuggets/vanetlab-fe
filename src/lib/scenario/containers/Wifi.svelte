<script>
  import { slide } from 'svelte/transition'
  import { nodes, show_rdrawer, node_info } from '../../../store/store'

  export let container
  let isNodeArrayVisible = false
  let check = false
  let lastAP = -1

  let mobility_items = [
    'default'
  ]

  function debug() {
    console.log(container);
  }

  function handleArray() {
    isNodeArrayVisible = !isNodeArrayVisible
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

  function checkType() {
    if (container.AP != null){}
      $nodes.forEach(e => {
        if (e.id == container.AP) {
          e.type = "ap"
        }
        if (lastAP != -1) {
          if (e.id == lastAP){
            e.type = "foo"
          }
        }
      })
      $nodes = $nodes
      lastAP = container.AP
  }

  function test() {
    console.log('ap changed')  
  }

</script>

<div transition:slide>
  <div class="row">
    <div class="col">
      <p>Adresa siete: </p>
    </div>
    <div class="col">
      <input bind:value={container.network_address} placeholder="Network adress">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>Maska siete: </p>
    </div>
    <div class="col">
      <input bind:value={container.network_mask} placeholder="Network mask">
    </div>
  </div>
  <div class="row">
    <label>
      <input type=checkbox bind:checked={container.log_pcap}> Log .pcap
    </label>
  
    <label>
      <input type=checkbox bind:checked={container.log_ascii}> Log ascii trace
    </label>
  </div>
  <div class="row">
    <div class="col">
      <p>SSID: </p>
    </div>
    <div class="col">
      <input bind:value={container.ssid}>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>AP: </p>
    </div>
    <div class="col">
      <select bind:value={container.AP} on:change={checkType}>
        {#each container.nodes as node}
          <option value={node}>
            Node n. {node}
          </option>
        {/each}
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>Mobility: </p>
    </div>
    <div class="col">
      <select bind:value={container.mobility}>
        {#each mobility_items as item}
          <option value={item}>
            {item}
          </option>
        {/each}
      </select>
    </div>
  </div>
  
  <div>
    <button on:click={handleArray}>Show nodes</button>
    {#if isNodeArrayVisible}
    <ul class="nodes">
        {#each $nodes as n (n.id) }
        <li>
            <input type=checkbox bind:checked={check} on:change={() => ContainerToNode(n.id)}  bind:group={container.nodes} name="nodes" value={n.id}>
            Node #{n.id}
        </li> 
        {/each}
    </ul>
    {/if}
    <button on:click={debug}>
        #debug
    </button>
</div>
</div>