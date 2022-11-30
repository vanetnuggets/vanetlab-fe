<script>
  import { onMount } from 'svelte';

  export let container;

  onMount(async () => {
    container["ssid"]=""
    container["AP"]=""
    container["mobility"]=""
  })

  function debug() {
    console.log(container);
  }
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
  <div>
    <label>
      <input type=checkbox bind:checked={container.log_pcap}> Log .pcap
    </label>
  
    <label>
      <input type=checkbox bind:checked={container.log_ascii}> Log ascii trace
    </label>
  </div>
  <div class="child">
    <p>SSID: </p>
    <input bind:value={container.ssid}>
  </div>
  <div class="child">
    <p>AP: </p>
      <input bind:value={container["AP"]}>
  </div>
  <div class="child">
    <p>Mobility: </p>
    <input bind:value={container.mobility}> 
  </div>
  
  <div>
    <button on:click={debug}>
        #debug
    </button>
</div>
</div>