<script>
  import { push } from "svelte-spa-router";
  import { scenarioName } from "../../../store/store";
  import { clearAll, initNetworks } from "../../../services/LoadService";
  import { getNotificationsContext } from "svelte-notifications";
  
  const { addNotification } = getNotificationsContext();
  let simName = "";

  function new_sim() {
    // call API call to check if name is available
    if (simName != "") {
      clearAll();
      initNetworks();
      scenarioName.update((_) => simName);
      push(`/app/${simName}/canvas`);
    } else {
      addNotification({
        text: "You have to specify scenario name!",
        position: "bottom-center",
        type: "error",
        removeAfter: 1500,
      });
    }
  }
</script>

<div class="dzia">
  Enter name:
  <input bind:value={simName} placeholder="simulation-name" />
  <button on:click={new_sim}>Create</button>
</div>

<style>
  .dzia {
    display: flex;
    flex-direction: column;
  }
</style>
