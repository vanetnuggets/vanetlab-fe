<script>
    import { slide } from 'svelte/transition'
    import { apps } from '../../store/store.js';
    import ClientApp from './ClientApp.svelte';
    import ServerApp from './ServerApp.svelte';

    let isClientVisible = false
    let ClientBntText = "Show client's apps settings"
    let isServerVisible = false
    let ServerBntText = "Show server's apps settings"


    function handleClient() {
        isClientVisible = !isClientVisible;
        ClientBntText = isClientVisible ? "Hide client's apps settings" : "Show client's apps settings"
    }

    function handleServer() {
        isServerVisible = !isServerVisible;
        ServerBntText = isServerVisible ? "Hide server's apps settings" : "Show server's apps settings"
    }

    function addServer(){
        $apps.server = [...$apps.server, {
            "id": $apps.server.length,
            "name": "CHANGE-ME",
            "port": 0,
            "start": {
                "value": 0,
                "format": ""
            },
            "stop": {
                "value": 0,
                "format": ""
            },
            "network": "",
            "node": ""
        }]
        console.log($apps.server)
    }

    function addClient() {
        $apps.client = [...$apps.client, {
            "id": $apps.client.length,
            "name": "CHANGE-ME",
            "port": 0,
            "start": {
                "value": 0,
                "format": ""
            },
            "stop": {
                "value": 0,
                "format": ""
            },
            "network": "",
            "node": "",
            "server": {
                "node": "",
                "network": ""
            },
            "interval": {
                "value": 0,
                "format": ""
            },
            "max_packets": 0,
            "packet_size": 0
        }]
        console.log($apps.client)
    }


</script>

<div class="simulation_container">
  <button on:click={handleServer} class="btn-basic">{ServerBntText}</button>
  <button class="r btn-basic" on:click={addServer}>Add</button>
    
  {#if isServerVisible}
  <div transition:slide>
    {#each $apps.server as s (s.id) }
    <ServerApp bind:app={$apps.server[s.id]}/>
    {/each}
  </div>
  {/if}

    <button on:click={handleClient} class="btn-basic">{ClientBntText}</button>
    <button class="r btn-basic" on:click={addClient}>Add</button>
    {#if isClientVisible}
    <div transition:slide class="somebs">
      {#if $apps.client.length == 0}
        There are no client apps in the simulation as of now.
      {:else}
        {#each $apps.client as c (c.id) }
        <ClientApp bind:app={$apps.client[c.id]}/>
        {/each}
      {/if}
    </div>
    {/if}

</div>


<style scoped>
  .somebs {
    width: 95%;
  }
  .r {
    float: right;
  }
</style>