<div>
  From Sumo <br>
  Name your scenario: <br>
  <input class="hm" bind:value={simName} placeholder="omg-i-love-ns3" /><br><br>

  {#if sumoFile == null}
  <div class="test">
    <Dropzone on:drop={handleDrop}></Dropzone>
  </div>
  {:else}
    Loaded file: <br>
    <b>{sumoFile.name}</b>
    <button on:click={loadSumo}>Load scenario</button>
  {/if}
</div>

<style>
.test {
  color: red;
  background-color: red;
}
</style>

<script>
import Dropzone from "svelte-file-dropzone";
import { push } from "svelte-spa-router";
import { scenarioName } from "../../../store/store";
import { fromSumo } from "../../api/sumo";
import loadConfig from "../../../services/LoadService";

let sumoFile = null
let simName = ""

async function loadSumo() {
  let data = new FormData;
  data.append('name', simName);
  data.append('sumotrace', sumoFile, simName);

  const result = await fromSumo(data);
  console.log(result.data);

  scenarioName.update(_ => simName);
  loadConfig(result.data);

  push('/app')
}

function handleDrop(e) {
  sumoFile = e.detail.acceptedFiles[0];
  console.log(sumoFile);
}

</script>