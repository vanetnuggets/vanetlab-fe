<div>
  NODE INFORMATION <br>
  TEMPLATE <br>

  {#if node != null}
    Node ID: { node.id }
  {/if}
</div>

<script>
	import { node_info } from '../../store/store.js';
  
  let node = null;
  node_info.subscribe(val => {
    node = val;
  })
</script>