<script>
    import { slide } from "svelte/transition";
    import {  nodes } from "../../store/scenario.js";
    import { l3_optional_attributes } from "../../store/validation.js";
    import ValidateInputRemove from "../validation/ValidateInputRemove.svelte";

    export let node_id;
    export let editable

    let attributes_input = null;

    let open_l3_attributes = false;
    function toggle_l3_attributes() {
        open_l3_attributes = !open_l3_attributes;
    }

    function add_attribute() {
        if(attributes_input != null){
            if( node.l3conf["attributes"] === undefined)
                node.l3conf.attributes = {}
            node.l3conf.attributes[attributes_input] = null
            $nodes = $nodes
            attributes_input = null
        }
    }

    function remove_l3_attributes(attribute) {
        node.l3conf.attributes = delete node.l3conf.attributes[attribute] && node.l3conf.attributes
        if( Object.keys(node.l3conf["attributes"]).length === 0 )
            node.l3conf = delete node.l3conf.attributes && node.l3conf
        $nodes = $nodes
    }

    $: node =  $nodes[node_id]
</script>

<div class="l3_attributes">
    <button on:click={toggle_l3_attributes} class="btn-basic">
        Optional attributes
    </button><br />
    {#if open_l3_attributes && node !== undefined && $l3_optional_attributes[node.l3]!== undefined}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    <select bind:value={attributes_input} disabled={!editable}>
                        {#each Object.keys($l3_optional_attributes[node.l3]) as attribute}
                            {#if node.l3conf["attributes"] == undefined || !Object.keys(node.l3conf["attributes"]).includes(attribute)}
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
            {#if node.l3conf["attributes"] !== undefined}
                {#each Object.keys(node.l3conf.attributes) as attribute}
                    {#if $l3_optional_attributes[node.l3][attribute] !== undefined}
                        <ValidateInputRemove bind:value={node.l3conf.attributes[attribute]} attribute={$l3_optional_attributes[node.l3][attribute]} remove_l_attributes={remove_l3_attributes} remove = {attribute} editable = {editable} ></ValidateInputRemove><br>
                        <!-- <span>{attribute}</span>
                        <input
                            class="my-input"
                            bind:value={node.l3conf.attributes[attribute]}
                            placeholder={ optional_attributes[node.l3][attribute]
                                .validation}
                            size="10"
                            disabled={!editable}
                        />
                        <button class="btn-basic" on:click={() => remove_l3_attributes(attribute)} disabled={!editable}>&times;</button>
                        <br /> -->
                    {/if}
                {/each}
            {/if}
        </div>
    {/if}
</div>
