<script>
    import '../../assets/nodeconf.css'
    import { slide } from "svelte/transition";
    import { nodes, networks } from "../../store/scenario";
    import OptionalAttributes from "./L2attributes.svelte"
    import { pgw_exists, current_node } from '../../store/store';
    export let node_id;
    export let editable;
    const l2_types = {
        lte: ["ue", "enb", "pgw"],
        wifi: ["sta", "ap"],
        wave: ['generic node'],
        eth: ['generic node']
    };
    const wifi_standards = ["802.11b", "802.11a", "802.11g", "802.11n", "802.11ac", "802.11ax", "802.11be", "802.11p"]
    let open_l2 = false;
    function toggle_l2() {
        open_l2 = !open_l2;
    }
    function set_default() {
        if($nodes[node_id].l2conf.type == "ap")
            $nodes[node_id].l2conf.standard = "802.11n"
        else
            $nodes[node_id].l2conf = delete $nodes[node_id].l2conf.standard && $nodes[node_id].l2conf;
    }
    function handlePwg(event) {
        if (event.target.value==="pgw") {
            pgw_exists.set(true)
            // if (node != undefined && $current_node === node.id)
            current_node.update((_) => null)
        } 
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
    let network_valid = false 
    let node_type_valid = false 
    let standard_valid = false 
    $:  if ($nodes[node_id]!= undefined && $nodes[node_id].l2id != null)
            network_valid = true
        else
            network_valid = false
    $:  if ($nodes[node_id]!= undefined && ($nodes[node_id].l2conf.type != null || (l2_types[$nodes[node_id].l2]!= undefined && l2_types[$nodes[node_id].l2].lenght == 0)))
            node_type_valid = true
        else
            node_type_valid = false
    $:  if ($nodes[node_id]!= undefined && $nodes[node_id].l2conf.standard != null)
            standard_valid = true
        else
            standard_valid = false
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
                        class="dropdown"
                        disabled={!editable}
                        class:field-danger={!network_valid} 
                        >
                        {#each Object.keys($networks) as l2_t}
                            <option value={$networks[l2_t].id}>
                                {$networks[l2_t].ssid}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            <div style="color: red;" hidden={network_valid}>
                This field is required
              </div>
            {#if $nodes[node_id].l2 != null}
                <div transition:slide>
                    <div class="row">
                        <div class="col">
                            Node type: <br />
                        </div>
                        <div class="col">
                            <select class="dropdown"   class:field-danger={!node_type_valid}  on:change={handlePwg} bind:value={$nodes[node_id].l2conf.type} on:change = {set_default} disabled={!editable}>
                                
                                {#each l2_types[$nodes[node_id].l2] as l2_st}
                                    <option disabled={$nodes[node_id].l2==="lte" && l2_st==="pgw" && $pgw_exists ? true : false} value={l2_st}>
                                        {l2_st}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div style="color: red;" hidden={node_type_valid}>
                        This field is required
                      </div>
                    {#if $nodes[node_id].l2conf.type == "ap"}
                        <div class="row">
                            <div class="col">
                                Standart: <br />
                            </div>
                            <div class="col">
                                <select class="dropdown" class:field-danger={!standard_valid} bind:value={$nodes[node_id].l2conf.standard} disabled={!editable}>
                                    {#each wifi_standards as wifi_standart}
                                        <option value={wifi_standart}>
                                            {wifi_standart}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <div style="color: red;" hidden={standard_valid}>
                            This field is required
                          </div>
                    {/if}
                    <OptionalAttributes node_id={node_id} editable={editable}/>

                </div>
                
            {/if}
        </div>
    {/if}
</div>