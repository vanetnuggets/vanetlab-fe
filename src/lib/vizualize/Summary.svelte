
<div class="container">
  <button on:click={list_scenarios} >List</button>
  <div class="scenario_list">
    {#each Object.entries(files) as [id, name] }
    <div class="scenario_item" on:click={select_scenario(name)}>
      { name }
    </div>
    {/each}
  </div>
  <h1>Summary</h1>

  <pre>
  {curr.console_output } <br>
    </pre>
  
  {#each curr.logs as log}
  {log.name}({log.size/1000}Kb) 
  <button on:click={() => download(log.name)}>download</button>
  <br>
  {/each}

</div>
<script>
import api from '../../services/Api.js'
import { summary } from '../../store/store'

let files = [];
let summ;
summary.subscribe(val => {
  summ = val;
})
let curr = {
  logs: [],
  console_output: ""
}

async function download(name) {
  let resp = await api.get('pcap', {
    responseType: 'blob',
    params: {
      name: name
    }
  });
  const blob = resp.data;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
        
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url); 
}

async function list_scenarios() {
  let resp = await api.get('list', {})
  
  files = resp.data.scenarios
  console.log(files)
}

async function select_scenario(code) {
  let r1 = await api.get('info', {
      code: code
    }
  )

  $summary[code] = {
    logs: r1.data.logs,
    console_output: r1.data.output
  }

  curr = $summary[code];
  console.log($summary[code]);
}

</script>

<style>
.container {
  overflow-y: scroll;
  max-height: calc(100vh - 75px);
}
</style>
