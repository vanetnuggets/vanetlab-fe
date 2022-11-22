<script>
    import { slide } from 'svelte/transition'
    export let name

    export let container
    
    let units_rate = [
        "kbps","mbps","gbps"
    ];
    let units_delay = [
        "ns","ms","s"
    ]

    let isShown = false

    function clickHandler() {
        isShown = !isShown
    }

    function createContainer() {
        console.log(container);
    }
</script>

<style>
.parent {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid navy;
    padding: 10px;
}

.child {
    display: flex;
    flex-direction: row;
    align-items: center;
}

input  {
    height: 20px;
}
select  {
    height: 26px;
}
button {
    width: 360px;
}

</style>

<div class="parent" style="background:pink">
    <div class="child">
        <button on:click={clickHandler}>{name}</button>
    </div>
    {#if isShown}
    <div transition:slide>
        <input bind:value={container.type} placeholder="Type of container">
        <div class="child">
            <p>Data rate: </p>
            <input type=number bind:value={container.data_rate.value} min=1 max=1024>
            <select bind:value={container.data_rate.format}>
                {#each units_rate as unit}
                    <option value={unit}>
                        {unit}
                    </option>
                {/each}
            </select>
        </div>
        
        <div class="child">
            <p>Delay: </p>
            <input type=number bind:value={container.delay.value} min=1 max=10000>
            <select bind:value={container.delay.format}>
                {#each units_delay as unit}
                    <option value={unit}>
                        {unit}
                    </option>
                {/each}
            </select>
        </div>
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
        <div>
            <button on:click={createContainer}>
                #debug
            </button>
        </div>
        
    </div>
    {/if}
</div>
