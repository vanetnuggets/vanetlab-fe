<script>

    import { connections, nodes } from "../../store/scenario";
    import { adding_p2p_conn } from "../../store/store";

    let arr;
    nodes.subscribe(val => {
      arr = Object.values(val);
    });

    let show = false
    function toggle_creation() {
        show = !show;
        if (!show)
            adding_p2p_conn.update((_) => false)
    }


    function deleteConnection(index) {
        $connections.splice(index, 1)
        $connections = $connections
    }
</script>

<div style="margin-top:69px;">
    <hr/>
    <button on:click={toggle_creation}>Connections</button>
</div>
{#if show}
    <div>
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
                    <select bind:value={c.node_to}>
                        {#each arr as n}
                            <option value={n.id}>
                                {n.id}
                            </option>
                        {/each}
                    </select>
                </div>
                <div>
                    <button on:click={() => deleteConnection(i)} class="btn-basic remover {confirm ? "confirm": ""}">X</button>
                </div>
            </div>
        {/each}
        <hr/>
        <label>
            <input type="checkbox" bind:checked={$adding_p2p_conn} />
            Add p2p connections
        </label>
    </div>
{/if}


