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
            "name": "",
            "port": "",
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


</script>

<div style="background:purple">
    <div>
        <button on:click={handleServer} class="somebs">{ServerBntText}</button>
    </div>
    {#if isServerVisible}
    <div transition:slide class="somebs">
        <button on:click={addServer}>Add server app</button>
        {#each $apps.server as s (s.id) }
        <ServerApp bind:app={$apps.server[s.id]}/>
        {/each}
    </div>
    {/if}
    <div>
        <button on:click={handleClient} class="somebs">{ClientBntText}</button>
    </div>
    {#if isClientVisible}
    <div transition:slide class="somebs">
        <p>nothing yet</p>
        {#each $apps.client as c (c.id) }
        <ClientApp bind:app={$apps.client[c.id]}/>
        {/each}
    </div>
    {/if}
</div>


<style>
    button {
    width: 360px;
    }
    .somebs {
        margin: 15px 0 15px 0;
    }
</style>