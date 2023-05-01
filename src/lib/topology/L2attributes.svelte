<script>
    import { slide } from "svelte/transition";
    import {  nodes } from "../../store/scenario.js";
    import ValidateInputRemove from "../validation/ValidateInputRemove.svelte";
    import { l2_optional_attributes } from "../../store/validation";

    export let node_id;
    export let editable

<<<<<<< HEAD
    const optional_attributes = {
        wifi: {
            RxGain : {
                validation : "double",
                default : "64.0",
                end : ""
            },
            TxGain : {
                validation : "double",
                default : "64.0",
                end : ""
            }
        },
        wave: {
            RxGain : {
                validation : "double",
                default : "64.0",
                end : ""
            },
            TxGain : {
                validation : "double",
                default : "64.0",
                end : ""
            }
        },
        eth: {
            DataRate  : {
                validation : "int",
                default : "5",
                end : "Mbps"
            },
            Delay : {
                validation : "int",
                default : "2",
                end : "ms"
            },
        }
    };
=======
    
>>>>>>> 1366d2f (validating everything)

    let attributes_input = null;

    let open_l2_attributes = false;
    function toggle_l2_attributes() {
        open_l2_attributes = !open_l2_attributes;
    }

    function add_attribute() {
        if(attributes_input != null){
            if( node.l2conf["attributes"] === undefined)
                node.l2conf.attributes = {}
            node.l2conf.attributes[attributes_input] = null
            $nodes = $nodes
            attributes_input = null
        }
    }

    function remove_l2_attributes(attribute) {
        node.l2conf.attributes = delete node.l2conf.attributes[attribute] && node.l2conf.attributes
        if( Object.keys(node.l2conf["attributes"]).length === 0 )
            node.l2conf = delete node.l2conf.attributes && node.l2conf
        $nodes = $nodes
    }

    $: node =  $nodes[node_id]
</script>

<div class="l2_attributes">
    {#if node !== undefined && optional_attributes[node.l2] !== undefined && Object.keys(optional_attributes[node.l2]).length > 0}
        <button on:click={toggle_l2_attributes} class="btn-basic" >
            Optional attributes
        </button><br />
        {#if open_l2_attributes}
            <div transition:slide>
                <div class="row">
                    <div class="col">
                        <select bind:value={attributes_input} disabled={!editable}>
                            {#each Object.keys(optional_attributes[node.l2]) as attribute}
                                {#if node.l2conf["attributes"] == undefined || !Object.keys(node.l2conf["attributes"]).includes(attribute)}
                                <option value={attribute}>
                                    {attribute}
                                </option>
                                {/if}
                            {/each}
                        </select>
                    </div>
                    <div class="col">
                        <button class="btn-basic" on:click={add_attribute} disabled={!editable} style="margin-left: 15px"> Add </button>
                    </div>
                    <br/>
                </div>
                {#if node.l2conf["attributes"] !== undefined}
                    {#each Object.entries(node.l2conf.attributes) as [attribute, value]}
                        <span>{attribute}</span>
                        <input
                            class="my-input"
                            bind:value={node.l2conf.attributes[attribute]}
                            placeholder={ optional_attributes[node.l2][attribute]
                                .validation}
                            size="10"
                            disabled={!editable}
                        />
                        {optional_attributes[node.l2][attribute].end}
                        <!-- <span>{value}</span> -->
                        <button class="btn-basic" on:click={() => remove_l2_attributes(attribute)} disabled={!editable}>&times;</button>
                        <br />
                    {/each}
                {/if}
            </div>
        {/if}
    {/if}
</div>
