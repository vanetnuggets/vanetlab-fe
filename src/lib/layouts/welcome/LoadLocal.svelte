<script>
  import Dropzone from "svelte-file-dropzone";
  import { push } from "svelte-spa-router";
  import { scenarioName } from "../../../store/store";
  import { loadConfig } from "../../../services/LoadService";
  import { scenarioExists } from "../../api/scenarios";

  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  let simFile = null;
  let simName = "";

  async function loadSim() {
    let content = await simFile.text();

    scenarioName.set(simName);
    loadConfig(JSON.parse(content));
    push(`/app/${simName}/canvas`);
  }

  function checkAvailable() {
    scenarioExists(simName)
      .then((result) => {
        if (result.data.exists) {
          addNotification({
            text: `Scenario with name ${simName} already exists!`,
            position: "bottom-center",
            type: "error",
            removeAfter: 5000,
          });
        } else {
          addNotification({
            text: `Scenario with name ${simName} is available!`,
            position: "bottom-center",
            type: "success",
            removeAfter: 5000,
          });
        }
      })
      .catch((err) => {
        addNotification({
          text: `Failed to check if scenario exists!`,
          position: "bottom-center",
          type: "error",
          removeAfter: 5000,
        });
      });
  }

  function handleDrop(e) {
    if (e.detail.fileRejections.length > 0) {
      let type = e.detail.fileRejections[0].file.type;
      addNotification({
        text: `Incorrect file type. Expected a .json config file, not ${type}!`,
        position: "bottom-center",
        type: "error",
        removeAfter: 5000,
      });
    } else {
      simFile = e.detail.acceptedFiles[0];
    }
  }
</script>

<div class="desc">
  <div class="title">
    Load local JSON <br />
  </div>
  To load a local vanetLab configuration, upload a `config.json` file obtained by
  `Save Local` function in VanetLab app.
  <br /><br />
  <br /><br />
  <br /><br />
  <div class="provide-name">
    <div style="margin:5px">
      Provide a name for your simulation:
    </div>
    <input class="hm" bind:value={simName} placeholder="Enter scenario name" />
    <button on:click={checkAvailable}>Check availability</button>
    <br /><br />
  </div>

  {#if simFile == null}
    <div class="test">
      <Dropzone
        accept="application/json"
        containerStyles={"background-color:#1a1a1a; border-color:#565656"}
        on:drop={handleDrop}
      >
        <p>
          Click or drag your VanetLab configuration file here to load scenario
        </p>
      </Dropzone>
    </div>
  {:else}
    <div class="fileload">
      File to be loaded: <br />
      <b>{simFile.name}</b>
      <button on:click={loadSim}>Load scenario</button>
    </div>
  {/if}
</div>

<style>
  b {
    margin-top: 7px;
    margin-bottom: 7px;
    font-weight: bolder;
  }
</style>
