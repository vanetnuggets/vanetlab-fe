<script>
export let container;
</script>

<div>
  <div class="child">
    <p>Adresa siete: </p>
    <input bind:value={container.network_address} placeholder="Network adress">
  </div>
  <div class="child">
    <p>Maska siete: </p>
    <input bind:value={container.network_mask} placeholder="Network mask">
  </div>

  <label>
    <input type=checkbox bind:checked={container.log_pcap}> Log .pcap
  </label>

  <label>
    <input type=checkbox bind:checked={container.log_ascii}> Log ascii trace
  </label>
</div>