<script>
    
    import { slide } from 'svelte/transition'
    import { nodes,show_rdrawer, node_info } from '../../store/store.js';
    export let name
    export let container
    
    let units_rate = [
        "kbps","mbps","gbps"
    ];
    let units_delay = [
        "ns","ms","s"
    ]

    let isShown = false
    let isNodeArrayVisible = false

    let check = false

    function clickHandler() {
        isShown = !isShown
    }

    function handleArray() {
        isNodeArrayVisible = !isNodeArrayVisible
    }

    function createContainer() {
        console.log(container);
    }

    function ContainerToNode(node_id){
        
        $nodes.forEach(n => {
            if(n.id==node_id){
                if(!check)
                    n.containers = n.containers.filter((value) => value !== container.name);
                else
                    n.containers = [...n.containers, container.name ]
                show_rdrawer.update(_ => 'node_info');
		        node_info.update(_ => n);
            }
        });
        
        

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

ul {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
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
            <button on:click={handleArray}>Show nodes</button>
            {#if isNodeArrayVisible}
            <ul>
                {#each $nodes as n (n.id) }
                <li>
                    <input type=checkbox bind:checked={check} on:change={() => ContainerToNode(n.id)}  bind:group={container.nodes} name="nodes" value={n.id}>
                    Node: {n.id}
                </li> 
                {/each}
            </ul>
            {/if}
        </div>

        <div>
            <button on:click={createContainer}>
                #debug
            </button>
        </div>
        
    </div>
    {/if}
</div>
