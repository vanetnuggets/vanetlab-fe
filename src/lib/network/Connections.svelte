<script>
    import { connections, nodes } from "../../store/scenario";
    import { slide } from 'svelte/transition'
    
    let arr;
    nodes.subscribe(val => {
      arr = Object.values(val);
    });

    let show = false
    function toggle_creation() {
        show = !show;
    }


    function deleteConnection(index) {
        $connections.splice(index, 1)
        $connections = $connections
    }
</script>

<div style="margin-top:69px;">
    <hr/>
    <button class="btn-basic" on:click={toggle_creation}>Connections</button>
</div>
{#if show}
    <div transition:slide>
        {#if $connections.length == 0 }
            <p style="font-size:14px">No p2p connections</p>
        {/if}
        {#each $connections as c, i}
            <div class="row">
                <div class="col">
                    Existing connection: 
                </div>
                <div class="col">
                    <select bind:value={c.node_from}>
                        {#each arr as n}
                            <option value={n.id}>
                                {n.id}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="col">
                    <select bind:value={c.node_to} style="margin-left:12px">
                        {#each arr as n}
                            <option value={n.id}>
                                {n.id}
                            </option>
                        {/each}
                    </select>
                </div>
                <div>
                    <button on:click={() => deleteConnection(i)} class="btn-basic remover {confirm ? "confirm": ""}" style="margin-left:20px">X</button>
                </div>
            </div>
        {/each}
        <hr/>
    </div>
{/if}


