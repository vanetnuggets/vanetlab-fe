<script>
    import '../../assets/nodeconf.css'
    import { slide } from "svelte/transition";
    import { nodes, networks } from "../../store/scenario";
    import OptionalAttributes from "./L2attributes.svelte"

    export let node_id;
    const l2_types = {
        lte: ["eu", "enb"],
        wifi: ["sta", "ap"],
    };

    let open_l2 = false;
    function toggle_l2() {
        open_l2 = !open_l2;
    }

    $: if ($nodes[node_id] !== undefined){ 
        if($nodes[node_id].l2id == -1) {
            $nodes[node_id].l2 = null;
            $nodes[node_id].l2conf = {};
        } else {
            $nodes[node_id].l2 = $networks[$nodes[node_id].l2id].type.toLowerCase();
        }
    }
    
    // $: if ($nodes[node_id].l2 != null && !l2_types[$nodes[node_id].l2].includes($nodes[node_id].l2conf.type))
    //     $nodes[node_id].l2conf={}
        
</script>

<div class="L2">
    <button on:click={toggle_l2} class="importrant-btn btn-trans full">
        | Network config
    </button>
    {#if open_l2 && $nodes[node_id] !== undefined}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    Network: <br />
                </div>
                <div class="col">
                    <select
                        bind:value={$nodes[node_id].l2id}
                    >
                        {#each Object.keys($networks) as l2_t}
                            <option value={$networks[l2_t].id}>
                                {$networks[l2_t].ssid}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            {#if $nodes[node_id].l2 != null}
                <div transition:slide>
                    <div class="row">
                        <div class="col">
                            Node type: <br />
                        </div>
                        <div class="col">
                            <select bind:value={$nodes[node_id].l2conf.type}>
                                {#each l2_types[$nodes[node_id].l2] as l2_st}
                                    <option value={l2_st}>
                                        {l2_st}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <OptionalAttributes node_id={node_id} />

                </div>
                
            {/if}
        </div>
    {/if}
</div>
