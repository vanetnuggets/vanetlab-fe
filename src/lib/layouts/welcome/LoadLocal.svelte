<div>
    Load local JSON <br>
    <input class="hm" bind:value={simName} placeholder="Enter scenario name" /><br><br>
  
    {#if simFile == null}
    <div class="test">
      <Dropzone on:drop={handleDrop}></Dropzone>
    </div>
    {:else}
    <div class="fileload">
      File to be loaded: <br>
      <b>{simFile.name}</b>
      <button on:click={loadSim}>Load scenario</button>
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
  import { loadConfig } from "../../../services/LoadService";
  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  
  let simFile = null
  let simName = ""
  
  async function loadSim() {
    let content = await simFile.text()
    
    scenarioName.set(simName);
    loadConfig(JSON.parse(content));
    push(`/app/${simName}/canvas`)
  }
  
  function handleDrop(e) {
    simFile = e.detail.acceptedFiles[0];
  }
  
  </script>