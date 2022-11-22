<script>
    import Container from "./Container.svelte";
    import { containers, topology } from '../../store/store.js';
    $containers
    let name = ""
    
    $topology = {
        "node_count": 0,
        "node_containers": $topology.node_containers,
    }

    function addContainer(){
        if (name.trim() != '') {
            console.log(name)
            $containers = [...$containers, {
                id: $containers.length, 
                name: name,
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
            }]
            $topology.node_containers = [...$topology.node_containers, name]
            console.log("done")
            name = ""
        } else {
            alert("Názov kontajnera nesmie byť prázdny")
        }
    }
    function showAll() {
        let show = $topology
        $containers.forEach(e => {
            let data = e

            show[e.name] = data
        });
        console.log(JSON.stringify(show))
    }
</script>

<div style="background:green">
    <div>
        <input bind:value={name} placeholder="Type container's name">
        <button on:click={addContainer}>
            Add container
        </button>
    </div>
    
    <button on:click={showAll}>
        #debug
    </button>
    
    
    {#each $containers as c (c.id) }
        <Container name={c.name} bind:container={$containers[c.id]}/>
    {/each}
</div>


