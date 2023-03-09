<div>
  Remote scenarios:
  {#if loading == true}
    loading...
  {/if}
  <div class="list">
    {#each scenarios as s}
      <button class="fill" on:click={loadScenario(s)}>{s}</button><br>
    {/each}
  </div>
</div>

<style scoped>

.fill {
  width: 95%;
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
import { getRemote } from "../../api/scenarios";
import { scenarioName } from "../../../store/store";
import { scenarioList } from "../../../store/welcome";
import { config } from "../../../store/store";

let loading = false;
let scenarios = []

scenarioList.subscribe(val => {
  scenarios = val;
})

async function loadScenario(name) {
  let data = await getRemote(name);
  config.update(_ => data.data.data); //datadatadata
  scenarioName.update(_ => name);
  push('/app');
}

</script>