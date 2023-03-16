<div class="dzia">
  Enter name:
  <input bind:value={sim_name} placeholder="simulation-name"/>
  <button on:click={new_sim} >Create</button>
</div>

<style>
.dzia {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import Dropzone from "svelte-file-dropzone";
import { get } from 'svelte/store'
import { push } from "svelte-spa-router";
import { scenarioName } from "../../../store/store" 
import { clearAll, initNetworks } from "../../../services/LoadService";
import { nodes, networks } from "../../../store/scenario";

let sim_name = "";

function new_sim() {
  // call API call to check if name is available
  clearAll();
  initNetworks();
  scenarioName.update(_ => sim_name);
  push('/app/canvas');
}

</script>