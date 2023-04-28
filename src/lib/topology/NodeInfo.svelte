<script>
  import '../../assets/nodeconf.css'
  import { slide } from "svelte/transition";
  import { current_node, current_time, pgw_exists } from "../../store/store.js";
  import { nodes } from "../../store/scenario.js";
  import Mobility from "./Mobility.svelte";
  import L2 from "./L2.svelte";
  import L3 from "./L3.svelte";
  import SdnController from "./SdnController.svelte";
  import SdnNeighbors from "./SdnNeighbors.svelte";
  import LockedIcon from "../../assets/locked.svg";
  import UnlockedIcon from "../../assets/unlocked.svg";

  let node_id = null;
  let editable = false

  current_node.subscribe((val) => {
    node_id = val;
  });

  let open_info = true;
  function toggle_info() {
    open_info = !open_info;
  }
</script>

<div class="info-wrapper">
  {#if node_id != null}
    <button on:click={toggle_info} class="importrant-btn btn-trans">
      Node #{node_id} information:
    </button>
    {#if open_info == true}
      <div transition:slide class="nodeinfo">
        <div class="general row">
          <p class="col">
            X: {$nodes[node_id].x.toFixed(2)}
            Y: {$nodes[node_id].y.toFixed(2)}
          </p>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="col" style="pointer-events:none">
            <img class="edit" on:click={(_) => editable = !editable} src={!editable? LockedIcon: UnlockedIcon} title="edit" height=18px width=18px alt="map_icon">
          </div>
        </div>
        <br>
        {#if $nodes[node_id].type == "basic" && $nodes[node_id].l2conf.type != "pgw"}
            <L2 node_id={node_id} editable={editable}/>
            <br>
            <L3 node_id={node_id} editable={editable}/>
            <br>
        {/if}
        {#if $nodes[node_id].type == "sdn"}
          <SdnController node_id={node_id} editable={editable} />
          <br>
          <SdnNeighbors node_id={node_id} editable={editable} />
          <br>
        {/if}
        <Mobility node_id={node_id}  editable={editable}/>
      </div>
    {/if}
    {:else}
      Please pick one node
  {/if}
</div>

<style scoped>
  * {
    text-align: left;
    font-size: 13px;
  }

  .info-wrapper {
    padding: 5px;
    direction: ltr;
  }

  .general {
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
  }

  .btn-trans {
    padding-left: 5px;
    margin-left: 0px;
    border-radius: 0px;
    border-left: 3px solid var(--dark-1);
    font-size: 16px;
  }

  .edit {
    float: right;
    pointer-events:all;
    cursor:pointer;
  }
</style>
