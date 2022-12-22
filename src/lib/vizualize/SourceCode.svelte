<div class="area">
  <div class="title">
    Source code for scenario { params.code }
  </div>
  <pre class="source_code">
{source_code}
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
  import { onMount } from 'svelte';
  import { summary } from '../../store/store'
  export let params = {}

  let source_code;

  summary.subscribe(n => {
    source_code = n[params.code].source;
  })

</script>