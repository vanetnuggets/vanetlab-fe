<script>
    import "../../assets/nodeconf.css";
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";
    import OptionalAttributes from "./L3attributes.svelte";
    import ValidateInput from "../validation/ValidateInput.svelte";
    import { l3_attributes } from "../../store/validation";
    import ValidateSelect from "../validation/ValidateSelect.svelte";
    import { requiredValidator } from "../../services/validation/Validators";
    import { buildValidator } from "../../services/validation/ValidationSevice";

    export let node_id;
    export let editable

    const l3_types = ['udpclient','udpserver','tcpclient','tcpserver']
   
    let open_l3 = false;
    function toggle_l3() {
        open_l3 = !open_l3;
    }

    function reset_l3conf() {
        $nodes[node_id].l3conf = { port: "1",start: "0", stop: "0"};
        if($nodes[node_id].l3 == 'udpclient' || $nodes[node_id].l3 == 'tcpclient')
            $nodes[node_id].l3conf.comm = null
    }

    const l3_config = {
        validation: buildValidator(requiredValidator()),
        name: "Application config",
        placeholder: "Choose L3 layer"
    }
</script>

<div class="L3">
     <button on:click={toggle_l3} class="importrant-btn btn-trans full">
        | Application config
    </button>
    {#if open_l3 && $nodes[node_id] !== undefined}
        <div transition:slide>
            <ValidateSelect bind:value={$nodes[node_id].l3} attribute={l3_config} objects = {l3_types}  on_change={reset_l3conf} editable = {editable} ></ValidateSelect>
                {#if $nodes[node_id].l3 != null}
                    <div transition:slide>
                        {#each Object.keys($nodes[node_id].l3conf) as key}
                            {#if key !== "attributes"}
                                {#if key === "comm"}
                                    <ValidateSelect bind:value={$nodes[node_id].l3conf[key]} attribute={$l3_attributes[key]} objects = {Object.keys($nodes)}  on_change={null} editable = {editable} ></ValidateSelect>
                                {:else}
                                    <ValidateInput bind:value={$nodes[node_id].l3conf[key]} attribute={$l3_attributes[key]} comparator={$nodes[node_id].l3conf["start"]} editable = {editable} ></ValidateInput><br>
                                {/if}
                            {/if}
                        {/each}
                        <!-- <OptionalAttributes node_id={node_id} editable={editable} /> -->
                    </div> 
                {/if}
        </div>
    {/if}
</div>