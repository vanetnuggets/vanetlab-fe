<div>
  NODE INFORMATION:  <br>

  {#if node != null}
    ID: { node.id }<br>
    X: {node.x}<br>
    Y: {node.y}<br>
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
	import { node_info2, nodes } from '../../store/store.js';
  
  let node = null;
  node_info2.subscribe(val => {
    node = val;
    console.log(node);
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