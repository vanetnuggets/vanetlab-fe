<div>
  NODE INFORMATION:  <br>

  {#if node != null}
    ID: { node.id }<br>
    X: {node.left}<br>
    Y: {node.top}<br>
    Containers: <br>
    {#each node.containers as n}
    - {n}<br>
    {/each}
    <select bind:value={node.type} on:change={update}>
      {#each types as unit}
        <option value={unit}>
          {unit}
        </option>
      {/each}
    </select>

  {/if}
</div>

<script>
	import { node_info, nodes } from '../../store/store.js';
  
  let node = null;
  node_info.subscribe(val => {
    node = val;
  })

  let types = [
    "foo", "bar", "ap"
  ]

  function update() {
    $nodes.forEach(element => {
      if (element.id == node.id) {
        element = node
      }
    });
    // o áno, zas tento bullshit
    $nodes = $nodes
  }
</script>