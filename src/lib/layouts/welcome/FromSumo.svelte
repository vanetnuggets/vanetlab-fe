<div>
  Load XML from SUMO <br>
  <input class="hm" bind:value={simName} placeholder="Enter scenario name" /><br><br>

  {#if sumoFile == null}
  <div class="test">
    <Dropzone on:drop={handleDrop}></Dropzone>
  </div>
  {:else}
  <div class="fileload">
      File to be loaded: <br>
      <b>{sumoFile.name}</b>
      <button on:click={loadSumo}>Load scenario</button>
  </div>  
  {/if}
</div>

<style>
  .test {
    color: red;
    background-color: red;
  }
  b {
    margin-top: 7px;
    margin-bottom: 7px;
    font-weight: bolder;
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