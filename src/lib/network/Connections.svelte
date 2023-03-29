<script>

    import { connections, nodes } from "../../store/scenario";

    let arr;
    nodes.subscribe(val => {
      arr = Object.values(val);
    });

    let tmp = {
        node_to: -1,
        node_from: -1,
    }

    function bs(){
        if (tmp.node_from === -1 || tmp.node_to === -1)
            return
        
        $connections.push(tmp);
        tmp = {
            node_to: -1,
            node_from: -1,
        }
        $connections = $connections
        
    }
    let show = false
    function toggle_creation() {
        show = !show;
    }
</script>

<div>
    <button on:click={toggle_creation}>PAIN</button>
</div>
{#if show}
    <div>
        {#each $connections as c, i}
            <div class="row">
                <div class="col">
                    fest bs
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
                    <select bind:value={c.node_to}>
                        {#each arr as n}
                            <option value={n.id}>
                                {n.id}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        {/each}
        <div class="row">
            <div class="col">
                <select bind:value={tmp.node_from}>
                    {#each arr as n}
                        <option value={n.id}>
                            {n.id}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="col">
                <select bind:value={tmp.node_to}>
                    {#each arr as n}
                        <option value={n.id}>
                            {n.id}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
        <button on:click={bs}>Add connetcio</button>
    </div>
{/if}


