<script>
  import NodeInfo from "../topology/NodeInfo.svelte";
  import { show_rdrawer } from '../../store/store.js';

  let elem_rdrawer;
  show_rdrawer.subscribe(value => {
    elem_rdrawer = value;
  })
</script>

<div class=drawer>
  <slot>
    <NodeInfo></NodeInfo>
  </slot>
</div>
