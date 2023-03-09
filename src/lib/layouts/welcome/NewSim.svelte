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
import { push } from "svelte-spa-router";
import { scenarioName } from "../../../store/store" 

let sim_name = "";

function new_sim() {
  // call API call to check if name is available
  scenarioName.update(_ => sim_name);
  push('/app');
}

</script>