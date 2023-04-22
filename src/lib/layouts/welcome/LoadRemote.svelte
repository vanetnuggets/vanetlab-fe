<div>
  Remote scenarios:
  {#if loading == true}
    loading...
  {/if}
  <div class="list">
    {#each scenarios as s}
      <div class="fill">
        <button class="f90 selec" on:click={loadScenario(s.name)}>{s.name}</button>
        {#if s['read-only'] == false}
          <button class="f5 delet" on:click={removeScenario(s.name)}>🚜</button><br>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style scoped>

.fill {
  width: 100%;
  text-align: left;
}

.f90 {
  width: 80%;
}

.f5 {
  width: 10%;
}

.delet:hover {
  background-color: darkred;
  outline: 1px solid white;
}

.selec:hover {
  outline: 1px solid white;
}

.list {
  max-height: 500px;
  overflow-y: auto;
  border: 3px solid var(--dark-2);
  background-color: var(--light-2);
  border-radius: 5px;
  margin-top: 20px;
}

</style>

<script>
import { push } from "svelte-spa-router";
import { getRemote, deleteRemote } from "../../api/scenarios";
import { scenarioName } from "../../../store/store";
import { scenarioList } from "../../../store/welcome";
import { loadConfig } from "../../../services/LoadService";
import { getNotificationsContext } from 'svelte-notifications';
const { addNotification } = getNotificationsContext();

let loading = false;
let scenarios = []

scenarioList.subscribe(val => {
  scenarios = val;
})

async function loadScenario(name) {
  let data = await getRemote(name);
  loadConfig(data.data.data); //datadatadata
  scenarioName.update(_ => name);
  push('/app/canvas');
}

function removeScenario(name) {
  let notifText = "";
  let notifType = "";
  deleteRemote(name)
    .then((resp) => {
      notifText = `scenario "${name}" successfully deleted`;
      notifType = "success";
    })
    .catch((err) => {
      notifText = err.response.data.message;
      notifType = "error";
    })
    .finally(() => {
      addNotification({
        text: notifText,
        position: 'bottom-center',
        type: notifType,
        removeAfter: 1500
      });
    });
}

</script>