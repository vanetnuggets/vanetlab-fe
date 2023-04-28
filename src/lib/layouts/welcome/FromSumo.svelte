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
import { loadConfig } from "../../../services/LoadService";

import { getNotificationsContext } from 'svelte-notifications';
const { addNotification } = getNotificationsContext();

let sumoFile = null
let simName = ""

async function loadSumo() {
  let data = new FormData;
  data.append('name', simName);
  data.append('sumotrace', sumoFile, simName);
  
  fromSumo(data).then((result) => {
    loadConfig(result.data);
    scenarioName.set(simName);

    push(`/app/${simName}/canvas`)
  }).catch((err) => {
    let error = err.response.data.error;
    let status = err.response.data.data;

    if (error === true) {
      addNotification({
        text: `Failed to create scenario! reason: ${status}`,
        position: 'bottom-center',
        type: 'error'
      })
    }
  });
}

function handleDrop(e) {
  sumoFile = e.detail.acceptedFiles[0];
}

</script>