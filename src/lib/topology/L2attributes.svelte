<script>
    import { slide } from "svelte/transition";
    import {  nodes } from "../../store/scenario.js";
    import ValidateInputRemove from "../validation/ValidateInputRemove.svelte";
    import { l2_optional_attributes } from "../../store/validation.js";
    export let node_id;
    export let editable
    
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
    <button on:click={toggle_l2_attributes} class="btn-basic" >
        Optional attributes
    </button><br />
    {#if open_l2_attributes && node !== undefined && $l2_optional_attributes[node.l2]!== undefined}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    <select bind:value={attributes_input} disabled={!editable}>
                        {#each Object.keys($l2_optional_attributes[node.l2]) as attribute}
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
                {#each Object.keys(node.l2conf.attributes) as attribute}
                    {#if $l2_optional_attributes[node.l2][attribute] !== undefined}
                    <ValidateInputRemove bind:value={node.l2conf.attributes[attribute]} attribute={$l2_optional_attributes[node.l2][attribute]} remove_l_attributes={remove_l2_attributes} remove = {attribute} editable = {editable} ></ValidateInputRemove><br>
                        <!-- <span>{attribute}</span>
                        <input
                            class="my-input"
                            bind:value={node.l2conf.attributes[attribute]}
                            placeholder={ optional_attributes[node.l2][attribute]
                                .validation}
                            size="10"
                            disabled={!editable}
                        />
                        {optional_attributes[node.l2][attribute].end} -->
                    <!-- <span>{value}</span> -->
                    <!-- <button class="btn-basic" on:click={() => remove_l2_attributes(attribute)} disabled={!editable}>&times;</button>
                    <br /> -->
                    {/if}
                {/each}
            {/if}
        </div>
    {/if}
</div>