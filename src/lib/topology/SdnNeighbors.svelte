<script>
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";
    import { adding_ovs_neighbors } from "../../store/store.js";


    export let node_id;

    let n_nodes_toggle = false;
    let neighbors_toggle = false;
    
    function toggle_neighbors() {
        neighbors_toggle = !neighbors_toggle;
        if (!neighbors_toggle)
            adding_ovs_neighbors.update((_) => false)

    };
    function toggle_n_nodes() {
        n_nodes_toggle = !n_nodes_toggle;
    };
    const remove_neighbor = (nb_id) => {
        nb_id = parseInt(nb_id)
        $nodes[node_id].switch_nodes = $nodes[node_id].switch_nodes.filter(item => item !== nb_id);
        $nodes = $nodes;
    };   
</script>

<div class="Neighbors">
    <button on:click={toggle_neighbors} class="importrant-btn btn-trans full">
        | Connected nodes
    </button>
    {#if neighbors_toggle}
        <div transition:slide>
            <label>
                <input type="checkbox" bind:checked={$adding_ovs_neighbors} />
                Add neighbors
              </label>
        </div>
        <button on:click={toggle_n_nodes} class="importrant-btn btn-trans">
            Neighbors
        </button><br />
            {#if n_nodes_toggle}
                <div transition:slide>
                    <table class="mobility_table">
                        <tr>
                            <th style="width:75%">Neighbor_id</th>
                            <th>Delete</th>
                        </tr>
                        {#if $nodes[node_id] != undefined}
                            {#each Object.entries($nodes[node_id].switch_nodes) as [_, nb_id]}
                                <tr>
                                <td>{nb_id}</td>
                                <td><button on:click={() => remove_neighbor(nb_id)}>&times;</button></td>
                                </tr>
                            {/each}
                        {/if}
                    </table>
                </div>
            {/if}
    {/if}
</div>
