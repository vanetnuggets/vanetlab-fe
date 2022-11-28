
<div class="container">
  <h1>Summary</h1>
{#each summ.output as line}
{line} <br>
{/each}

{#each summ.logs as log}
{log.name}({log.size/1000}Kb) 
<button on:click={() => download(log.name)}>download</button>
<br>
{/each}

</div>
<script>
import api from '../../services/Api.js'
import { summary } from '../../store/store'

let summ;
summary.subscribe(val => {
  summ = val;
})

async function download(name) {
  let resp = await api.get('trace', {
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

</script>

<style>
.container {
  overflow-y: scroll;
  max-height: calc(100vh - 75px);
}
</style>
