<script>
    import { topology, containers } from '../../store/store.js';

    export let app
    
    let format = [
        "ms", "s", "min"
    ]

    function debug() {
        console.log(JSON.stringify(app))
    }
</script>

<div class="server_container" style="display:grid">
    <div style="display:ruby">
        <p>Name: </p>
        <input bind:value={app.name} placeholder="Type app's name">
    </div>
    <div style="display:ruby">
        <p>Start: </p>
        <input type=number bind:value={app.start.value} min=1 max=1024>
        <select bind:value={app.start.format}>
            {#each format as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </div>
    <div style="display:ruby">
        <p>Stop: </p>
        <input type=number bind:value={app.stop.value} min=1 max=1024>
        <select bind:value={app.stop.format}>
            {#each format as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </div>
    <div style="display:ruby">
        <p>Network: </p>
        <select bind:value={app.network}>
            {#each $topology.node_containers as network}
                <option value={network}>
                    {network}
                </option>
            {/each}
        </select>
    </div>
    <div style="display:ruby">
        <p>Node: </p>it 
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
    <div style="display:ruby">
        <p>Port: </p>
            <input type=number bind:value={app.port} min=1 max=65535>
        </div>
    <button on:click={debug}>AAAAAAa</button>
</div>