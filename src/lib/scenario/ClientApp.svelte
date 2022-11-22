<script>
    import { topology, nodes, apps } from '../../store/store.js';

    export let app
    let format = [
        "ms", "s", "min"
    ]
    let isServerVisible = false

    function debug() {
        console.log(JSON.stringify(app))
    }

    function handleServer(){
        isServerVisible = !isServerVisible
    }
</script>

<div style="background:blue;display:grid">
    <div style="display:ruby">
        <p>Name: </p>
        <input bind:value={app.name} placeholder="Type app's name">
    </div>
    <div style="display:ruby">
        <button on:click={handleServer}>Set server</button>
            {#if isServerVisible}
            <ul>
                {#each $apps.server as s (s.id) }
                <li>
                    <input type=checkbox bind:group={app.server} name="server" value={s.id}>
                    Server: {s.id}
                </li> 
                {/each}
            </ul>
            {/if}
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
        <p>Node: </p>
        <select bind:value={app.node}>
            {#each $nodes as node}
                <option value={node.id}>
                    {node.id}
                </option>
            {/each}
        </select>
    </div>
    <div style="display:ruby">
        <p>Interval: </p>
        <input type=number bind:value={app.interval.value} min=1 max=1000>
        <select bind:value={app.interval.format}>
            {#each format as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </div>
    <div style="display:ruby">
        <p>max_packets: </p>
        <input bind:value={app.max_packets} placeholder="Type idk">
    </div>
    <div style="display:ruby">
        <p>Packet size: </p>
        <input bind:value={app.packet_size} placeholder="Type packet size">
    </div>
    <button on:click={debug}>AAAAAAa</button>
</div>