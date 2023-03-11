<script>
  import ContainerInfo from "../topology/ContainerInfo.svelte";
  import NodeInfo from "../topology/NodeInfo.svelte";
  import { show_rdrawer } from '../../store/store.js';

  let elem_rdrawer;
  show_rdrawer.subscribe(value => {
    elem_rdrawer = value;
  })
</script>

<div class=drawer>
  <slot>
    {#if elem_rdrawer == 'node_info'}
      <NodeInfo></NodeInfo>
    {:else if elem_rdrawer == 'container_info' }
      <ContainerInfo></ContainerInfo>
    {/if}
  </slot>
</div>
