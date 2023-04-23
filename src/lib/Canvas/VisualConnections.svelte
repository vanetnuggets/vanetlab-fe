<script>
    import { connections, networks, nodes } from "../../store/scenario";
    import { adding_ovs_neighbors, current_node } from "../../store/store";

    export let nodearr;
    export let mouse_x;
    export let mouse_y;;
    export let add_p2p_toggle;
    export let first_p2p;

    $: sietky = createPairs(nodearr);

    function createPairs(nodes){
        let arr = {}
        
        // zober nody podľa sieti
        nodes.forEach(element => {
            if (element.l2id in arr) {
                arr[element.l2id].nodes.push(element.id)
            } 
            else {
                arr[element.l2id] = {
                    id: element.l2id,
                    nodes: [
                        element.id
                    ]
                } 
            }
        });
        
        let connects = []
        // sprav páry jednotlivých nodov
        for (const index in arr) {
            if (index === "-1")
                continue;
            let second_layer = {
                id: parseInt(arr[index].id),
                nodes: []
            }
            for (var i = 0; i < arr[index].nodes.length - 1; i++) {
                for (var j = i; j < arr[index].nodes.length - 1; j++) {
                    second_layer.nodes.push([arr[index].nodes[i], arr[index].nodes[j+1]])
                }
            }
            connects.push(second_layer)
        }
        return Object.values(connects)
    }
</script>

<!-- p2p connections -->
{#each $connections as c}
    <line x1={$nodes[c.node_from].x} y1={$nodes[c.node_from].y} x2={$nodes[c.node_to].x} y2={$nodes[c.node_to].y} stroke="black" stroke-width="2px"/>
{/each}
{#each sietky as siet}
    <!-- csma connections -->
    {#if $networks[siet.id].type == "ETH"}
        {#each siet.nodes as nody}
            <line x1={$nodes[nody[0]].x} y1={$nodes[nody[0]].y} x2={$nodes[nody[1]].x} y2={$nodes[nody[1]].y} stroke={$networks[siet.id].color} stroke-width="1px"/>
        {/each}
    {/if}
    <!-- wireless connections -->
    {#if $networks[siet.id].type != "ETH"}
        {#each siet.nodes as nody}
        <line x1={$nodes[nody[0]].x} y1={$nodes[nody[0]].y} x2={$nodes[nody[1]].x} y2={$nodes[nody[1]].y} stroke={$networks[siet.id].color} stroke-dasharray="4"/>
        {/each}
    {/if}
{/each}
{#each nodearr as d}
<!-- p2p line -->
{#if add_p2p_toggle && d.id == first_p2p}
    <line x1={d.x} y1={d.y} x2={mouse_x} y2={mouse_y} stroke="black" stroke-width="2px"/>
{/if}
<!-- sdn line -->
{#if $adding_ovs_neighbors && d.id == $current_node}
<line x1={d.x} y1={d.y} x2={mouse_x} y2={mouse_y} stroke="black" stroke-width="1px"/>
{/if}
<!-- sdn neighbor conenctions -->
{#if d.type == "sdn"}
    {#if d.switch_nodes.length > 0}
        {#each d.switch_nodes as neighbor}
            <line x1={d.x} y1={d.y} x2={$nodes[neighbor].x} y2={$nodes[neighbor].y} stroke="black" stroke-width="1px"/>
        {/each}
    {/if} 
{/if}
{/each}

<style scoped>
    line {
        pointer-events: none;
    }
</style>
