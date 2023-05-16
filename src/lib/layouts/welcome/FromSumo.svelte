<script>
  import Dropzone from "svelte-file-dropzone";
  import { push } from "svelte-spa-router";
  import { scenarioName } from "../../../store/store";
  import { fromSumo } from "../../api/sumo";
  import { loadConfig } from "../../../services/LoadService";
  import { scenarioExists } from "../../api/scenarios";

  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  let sumoFile = null;
  let simName = "";

  async function loadSumo() {
    let data = new FormData();
    data.append("name", simName);
    data.append("sumotrace", sumoFile, simName);

    fromSumo(data)
      .then((result) => {
        loadConfig(result.data);
        scenarioName.set(simName);

        push(`/app/${simName}/canvas`);
      })
      .catch((err) => {
        let error = err.response.data.error;
        let status = err.response.data.data;

        if (error === true) {
          addNotification({
            text: `Failed to create scenario! reason: ${status}`,
            position: "bottom-center",
            type: "error",
          });
        }
      });
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
        text: `Incorrect file type. Expected .xml file, not ${type}!`,
        position: "bottom-center",
        type: "error",
        removeAfter: 5000,
      });
    } else {
      sumoFile = e.detail.acceptedFiles[0];
    }
  }
</script>

<div>
  <div class="desc">
    <div class="title">
      Load from SUMO trace<br />
    </div>
    To load a SUMO scenario, you need to have a sumoTrace.xml file. It can be generated
    using the following command<br />

    <div class="codeblock">sumo -c sim.sumocfg --fcd-output sumoTrace.xml</div>
    <br />
    <div class="provide-name">
      <div style="margin:5px">
        Provide a name for your simulation:
      </div>
      <input class="hm" bind:value={simName} placeholder="Enter scenario name" />
      <button on:click={checkAvailable}>Check availability</button>
      <br /><br />
    </div>
  </div>
  {#if sumoFile == null}
    <div class="test">
      <Dropzone
        accept="text/xml"
        containerStyles={"background-color:#1a1a1a; border-color:#565656"}
        on:drop={handleDrop}
      >
        <p>Click or drag your sumoTrace.xml file to load the scenario</p>
      </Dropzone>
    </div>
  {:else}
    <div class="fileload">
      Uploaded file: <br />
      <b>{sumoFile.name}</b>
      <button on:click={loadSumo}>Load scenario</button>
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
