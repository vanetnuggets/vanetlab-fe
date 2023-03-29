<script>
    import { slide } from "svelte/transition";
    import { nodes} from "../../store/scenario";

    export let node_id;

    let n_nodes_toggle = false;
    let neighbor_id = null;
    let neighbors_toggle = false;
    
    function toggle_neighbors() {
        neighbors_toggle = !neighbors_toggle;
    };
    function toggle_n_nodes() {
        n_nodes_toggle = !n_nodes_toggle;
    };
    function add_neighbors() {
        neighbor_id = parseInt(neighbor_id)
        // TODO pridata podmienku nech neprekroci max_node_id, pridat nech sa vymazu susedia ak sa vymaze susedny node s idckom
        if (!Number.isInteger(neighbor_id))
            return;
        if (!$nodes[node_id].switch_nodes.includes(neighbor_id)) {
            $nodes[node_id].switch_nodes.push(neighbor_id);
            $nodes[node_id].switch_nodes.sort(function(a, b) {
                return a - b;
            });
            $nodes = $nodes;
        }
    };
    const remove_mobility = (nb_id) => {
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
            <div transition:slide>
                <div class="row">
                    <div class="col">
                        Node_id: <br />
                    </div>
                    <div class="col">
                        <input
                        class="my-input"
                        bind:value={neighbor_id}
                        placeholder="Node you want to connect"
                        >
                    </div>
                </div>
            </div>
            <button on:click={add_neighbors} class="importrant-btn btn-trans">
                Add
            </button><br />
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
                        {#each Object.entries($nodes[node_id].switch_nodes) as [_, nb_id]}
                            <tr>
                            <td>{nb_id}</td>
                            <td><button on:click={() => remove_mobility(nb_id)}>&times;</button></td>
                            </tr>
                        {/each}
                    </table>
                </div>
            {/if}
    {/if}
</div>
