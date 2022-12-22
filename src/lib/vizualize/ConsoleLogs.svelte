<div class="area">
  <div class="title">
    Console Logs for scenario { params.code }
  </div>
  <pre class="source_code">
{console_output}
  </pre>
</div>

<style>
  .title {
    font-weight: bold;
    font-size: 20px;
  }
  .source_code {
    text-align: left;
    overflow-y: scroll;
    max-height: 90vh;
    font-family: monospace;
  }
</style>

<script>
  import { summary } from '../../store/store'
  export let params = {}

  let console_output;

  summary.subscribe(n => {
    console_output = n[params.code].console_output;
  })

</script>