<script>
    import { topology, containers } from '../../store/store.js';
    import { slide } from 'svelte/transition'

    export let app
    
    let format = [
        "ms", "s", "min"
    ]

    function debug() {
        console.log(JSON.stringify(app))
    }

    let showme = false;
    function toggle() {
        showme = !showme;
    }
</script>

<style scoped>
input {
  height: 20px;
  padding: 0px;
  margin: 0px;
}
select {
  padding: 0px;
  margin: 0px;
}
option {
  padding: 0px;
  margin: 0px;
}
</style>

<button class="btn-basic" on:click={toggle}>{app.name}</button>
{#if showme == true}
<div transition:slide class="server_container" style="display:grid">
    <div class="row">
        <div class="col">
            <p>Name: </p>
        </div>
        <div class="col">
            <input bind:value={app.name} placeholder="Type app's name">
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Start: </p>
        </div>
        <div class="col">
            <input type=number bind:value={app.start.value} min=1 max=1024>
            <select bind:value={app.start.format}>
                {#each format as unit}
                    <option value={unit}>
                        {unit}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col">
        <p>Stop: </p>
        </div>
        <div class="col">
            <input type=number bind:value={app.stop.value} min=1 max=1024>
            <select bind:value={app.stop.format}>
                {#each format as unit}
                    <option value={unit}>
                        {unit}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Network: </p>
        </div>
        <div class="col">
            <select bind:value={app.network}>
                {#each $topology.node_containers as network}
                    <option value={network}>
                        {network}
                    </option>
                {/each}
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Node: </p>
        </div>
        <div class="col">
            {#if app.network != ""}
            <select bind:value={app.node}>
                {#each $containers as c}
                    {#if c.name == app.network}
                    {#each c.nodes as node}
                    <option value={node}>
                        {node}
                    </option>
                    {/each}
                    {/if}
                {/each}
            </select>
            {/if}
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p>Port: </p>
        </div>
        <div class="col">
            <input type=number bind:value={app.port} min=1 max=65535>
        </div>
    </div>
    <button on:click={debug}>AAAAAAa</button>
</div>
{/if}