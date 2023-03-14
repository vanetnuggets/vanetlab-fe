<script>
  import { slide } from "svelte/transition";
  import { current_node, current_time } from "../../store/store.js";
  import { nodes } from "../../store/scenario.js";
  import Mobility from "./Mobility.svelte";
  import L2 from "./L2.svelte";
  import L3 from "./L3.svelte"

  let node_id = null;

  current_node.subscribe((val) => {
    node_id = val;
  });

  let open_info = true;
  function toggle_info() {
    open_info = !open_info;
    //console.log($main_config)
  }
</script>

<div class="info-wrapper">
  {#if node_id != null}
    <button on:click={toggle_info} class="importrant-btn btn-trans">
      Node #{node_id} information:
    </button>
    {#if open_info == true}
      <div transition:slide class="nodeinfo">
        <div class="general">
          X: {$nodes[node_id].mobility[$current_time].x.toFixed(2)}
          Y: {$nodes[node_id].mobility[$current_time].y.toFixed(2)}
        </div>
        <L2 node_id={node_id} />
        <br />
        <L3 node_id={node_id} />
        <br />
        <Mobility node_id={node_id} />
      </div>
    {/if}
  {/if}
</div>

<style scoped>
  * {
    text-align: left;
    font-size: 13px;
  }

  .info-wrapper {
    padding: 5px;
    max-width: 220px;
    width: 220px;
  }

  .general {
    padding-left: 10px;
  }

  .btn-trans {
    padding-left: 5px;
    margin-left: 0px;
    border-radius: 0px;
    border-left: 3px solid var(--dark-1);
    font-size: 16px;
  }
</style>
