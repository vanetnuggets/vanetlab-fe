<script>
    export let name;
    export let container = {
        "type": "",
        "data_rate": {
            "value": 0,
            "format": ""
        },
        "delay": {
            "value": 0,
            "format": ""
        },
        "network_address": "",
        "network_mask": "",
        "log_pcap": false
    }
    let units_rate = [
        "kbps","mbps","gbps"
    ];
    let units_delay = [
        "ns","ms","s"
    ]

    function createContainer() {
        console.log(container);
    }
</script>
<div>
    <p> This is: {name} </p>
    <input bind:value={container.type} placeholder="Type of container">
    
    <form>
        <p>Data rate: </p>
        <input type=number bind:value={container.data_rate.value} min=1 max=1024>
        <select bind:value={container.data_rate.format}>
            {#each units_rate as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </form>
    
    <form>
        <p>Delay: </p>
        <input type=number bind:value={container.delay.value} min=1 max=10000>
        <select bind:value={container.delay.format}>
            {#each units_delay as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </form>
    
    <input bind:value={container.network_address} placeholder="Network adress">
    <input bind:value={container.network_mask} placeholder="Network mask">
    <label>
        <input type=checkbox bind:checked={container.log_pcap}> Log .pcap
    </label>
    <button on:click={createContainer}>
        Vytvor kontajner
    </button>
</div>
