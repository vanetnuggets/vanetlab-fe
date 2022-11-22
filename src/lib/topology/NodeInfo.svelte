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

  {/if}
</div>

<script>
	import { node_info} from '../../store/store.js';
  
  let node = null;
  node_info.subscribe(val => {
    node = val;
  })

</script>