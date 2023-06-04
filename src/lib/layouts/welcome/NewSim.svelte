<script>
  import { push } from "svelte-spa-router";
  import { scenarioName } from "../../../store/store";
  import { clearAll, initNetworks } from "../../../services/LoadService";
  import { getNotificationsContext } from "svelte-notifications";
  import { scenarioExists } from "../../api/scenarios";
  import { reset_store } from "../../../store/scenario";
  import { checkSimName } from "../../../services/CheckSimName.js";
  import { scenarioReadOnly } from "../../../store/store";

  const { addNotification } = getNotificationsContext();
  let simName = "";

  function new_sim() {
    if (checkSimName(simName, addNotification) == -1)
      return
    clearAll();
    reset_store(); // clear all nefunguje lebo v inite su veci, netusim sice odkial
    initNetworks();
    scenarioName.update((_) => simName);
    scenarioReadOnly.set(false);
    push(`/app/${simName}/canvas`);
  }
  
  function checkAvailable() {
    scenarioExists(simName).then((result) => {
      if (result.data.exists) {
        addNotification({
          text: `Scenario with name ${simName} already exists!`,
          position: 'bottom-center',
          type: 'error',
          removeAfter: 5000
        })
      } else {
        addNotification({
          text: `Scenario with name ${simName} is available!`,
          position: 'bottom-center',
          type: 'success',
          removeAfter: 5000
        })
      }
    }).catch((err) => {
      addNotification({
        text: `Failed to check if scenario exists!`,
        position: 'bottom-center',
        type: 'error',
        removeAfter: 5000
      })
    })
  }
</script>

<div class="dzia">
  <div class="title">
    New simulation
  </div>
  <div style="margin:5px">
    Create a new, blank simulation scenario from scratch.
  </div>
  <input bind:value={simName} placeholder="Enter simulation name" />
  <button on:click={checkAvailable}>Check availability</button>  

  <button on:click={new_sim}>Create</button>

</div>

<style>
  .dzia {
    display: flex;
    flex-direction: column;
    flex-grow: 5;
  }
</style>
