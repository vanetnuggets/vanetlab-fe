<div>
Remote scenarios:

{#if loading===true}
loading...
{/if}

{#each scenarios as s}
  <button on:click={loadScenario(s)}>{s}</button><br>
{/each}

</div>

<script>
import { push } from "svelte-spa-router";
import { getRemote } from "../../api/scenarios";
import { scenarioName } from "../../../store/store";
import { scenarioList } from "../../../store/welcome";
import { config } from "../../../store/store";

let loading = true;
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