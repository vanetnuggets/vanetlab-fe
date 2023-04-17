<div>
    Load Local <br>
    Name your scenario: <br>
    <input class="hm" bind:value={simName} placeholder="omg-i-love-ns3" /><br><br>
  
    {#if simFile == null}
    <div class="test">
      <Dropzone on:drop={handleDrop}></Dropzone>
    </div>
    {:else}
      Loaded file: <br>
      <b>{simFile.name}</b>
      <button on:click={loadSim}>Load scenario</button>
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
  import { loadConfig } from "../../../services/LoadService";
  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  
  let simFile = null
  let simName = ""
  
  async function loadSim() {
    let content = await simFile.text()
    
    scenarioName.update(_ => simName);
    loadConfig(JSON.parse(content));
    push('/app/canvas')
  }
  
  function handleDrop(e) {
    simFile = e.detail.acceptedFiles[0];
  }
  
  </script>