
<div class="container">
  List of simulated scenarios.
  <button class="btn" on:click={list_scenarios} >♻️ refresh</button>
  <div class="scenario_list">
    {#each Object.entries(files) as [id, name] }
    <div class="scenario_item">
      Scenario ID: { name }
      <button class="btn s" on:click={() => logs(name)}>Logs</button>
      <button class="btn s" on:click={() => output(name)}>Console output</button>
      <button class="btn s" on:click={() => sourcecode(name)}>Source Code</button>
    </div>
    {/each}
  </div>
</div>

<script>
  import api from '../../services/Api.js'
  import { summary, summary_list } from '../../store/store'
  import { push } from 'svelte-spa-router'

  let files = [];
  let summ;
  summary.subscribe(val => {
    summ = val;
  })
  summary_list.subscribe(val => {
    files = val;
  })

  let curr = {
    logs: [],
    console_output: "",
    code: ""
  }

  async function check_store(code) {
    if (Object.keys($summary).includes(code) == false) {
      await select_scenario(code);
    }
  } 

  async function logs(code) {
    await check_store(code);
    push(`/logs/${code}`);
  }

  async function output(code) {
    await check_store(code);
    push(`/console/${code}`);
  }

  async function sourcecode(code) {
    await check_store(code);
    push(`/source/${code}`);
  }


  async function list_scenarios() {
    let resp = await api.get('list', {})
    summary_list.update(_ => resp.data.scenarios);
    
  }

  async function select_scenario(code) {
    let r1 = await api.get('info', {
        code: code
      }
    )
    $summary[code] = {
      logs: r1.data.logs,
      console_output: r1.data.output,
      source: r1.data.source,
      code: code
    }
    curr = $summary[code];
  }

</script>

<style>
.container {
  overflow-y: scroll;
  max-height: calc(100vh - 75px);
  background-color: var(--main-fg-color);
}


</style>
