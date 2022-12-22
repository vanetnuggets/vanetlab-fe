<div>
  <div class="title">
    Trace files for scenario { params.code }
  </div>
  {#each logs as log}
  {log.name}({log.size/1000}Kb) 
  <button on:click={() => download(log.name)}>download</button>
  <br>
  {/each}
</div>

<style>
  .title {
    font-weight: bold;
    font-size: 20px;
  }
</style>

<script>
  import api from '../../services/Api.js'
  import { summary } from '../../store/store'
  export let params = {}

  let logs;

  summary.subscribe(n => {
    logs = n[params.code].logs;
  })

  async function download(name) {
    let resp = await api.getBlob('pcap', {
        name: name,
        code: params.code
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