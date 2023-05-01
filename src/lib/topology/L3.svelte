<script>
    import "../../assets/nodeconf.css";
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";
    import OptionalAttributes from "./L3attributes.svelte";
    import { required, useForm} from "svelte-use-form";
    import { select } from "d3";

    export let node_id;
    export let editable
    let pomocna

    const l3_types = {
        udpclient: {
            port: "1",
            start: "0",
            stop: "0",
            comm: node_id.toString(),
        },
        udpserver: {
            port: "1",
            start: "0",
            stop: "0",
        },
        tcpclient: {
            port: "1",
            start: "0",
            stop: "0",
            comm: node_id.toString(),
        },
        tcpserver: {
            port: "1",
            start: "0",
            stop: "0",
        },
    };
        
    const l3_attributes = {
        port: {
            name: "Port",
            end: "",
            placeholder: "Port for communication",
            validation: "Must be from range 1-65535",
            valid: true
        },
        start: { 
            name: "Start",
            end: "",
            placeholder: "Start of communication", 
            validation: "Must be Positive Integer",
            valid: true 
        },
        stop: {
            name: "Stop",
            end: "",
            placeholder: "Stop of communication",
            validation: "Must be Positive Integer > Start" ,
            valid: true
        },
        comm: {
            name: "Communication",
            end: "",
            placeholder: "Node to communicate with",
            validation: "Missing value. This field is Required",
            valid: true
        }
    };

    const l3form = useForm({
      l3: { validators: [required] },
      port: { validators: [required] },
      start: { validators: [required] },
      stop: { validators: [required] },
      comm: { validators: [required] },
    })
   
    let open_l3 = false;
    function toggle_l3() {
        open_l3 = !open_l3;
    }

    function reset_l3conf() {
        $nodes[node_id].l3conf = l3_types[$nodes[node_id].l3];
        $nodes = $nodes;
    }

    $:  if($nodes[node_id].l3 == null)
            $l3form.l3.valid = false
        else
            $l3form.l3.valid = true
    

    $:  if(node_id != undefined || node_id != null){
            Object.keys(l3_attributes).forEach((l3_attribute) => {
                if($l3form[l3_attribute] == undefined)
                    l3_attributes[l3_attribute].valid = true
                else
                    l3_attributes[l3_attribute].valid = $l3form[l3_attribute].valid
            });
        }
    
</script>

<div class="L3">
    <button on:click={toggle_l3} class="importrant-btn btn-trans full">
        | Application config
    </button>
    {#if open_l3 && $nodes[node_id] !== undefined}
        <div transition:slide>
            <form use:l3form>
                <div class="form-field">
                    <div class="row">
                        <div class="col">
                            <label for='l3'>Application: </label>
                        </div>
                        <div class="col">
                            <select
                                class="dropdown"
                                bind:value={$nodes[node_id].l3}
                                on:change={reset_l3conf}
                                disabled={!editable}
                                id='l3'
                                name='l3'
                                class:field-danger={!$l3form.l3.valid}
                            >
                                {#each Object.keys(l3_types) as l3_typ}
                                    <option value={l3_typ}>
                                        {l3_typ}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div style="color: red;" hidden={$l3form.l3.valid}>
                        Missing value. This field is Required
                    </div>
                </div>
                
               

                {#if $nodes[node_id].l3 != null}
                    <div transition:slide>
                        {#each Object.keys($nodes[node_id].l3conf) as key}
                            {#if key !== "attributes"}
                                <div class="form-field">
                                    <div class="row">
                                        <div class="col">
                                            <label for={key}>{l3_attributes[key].name}: <br /> </label>
                                        </div>
                                        <div class="col">
                                            {#if key === "comm"}
                                                <select
                                                    class="dropdown"
                                                    bind:value={$nodes[node_id].l3conf[key]}
                                                    disabled={!editable}
                                                    id={key}
                                                    name={key}
                                                    class:field-danger={!l3_attributes[key].valid}
                                                >
                                                    {#each Object.keys($nodes) as node}
                                                        <option value={node}>
                                                            {node}
                                                        </option>
                                                    {/each}
                                                </select>
                                            {:else}
                                                <input
                                                    class="my-input dropdown"
                                                    bind:value={$nodes[node_id].l3conf[key]}
                                                    placeholder={l3_attributes[key]
                                                        .placeholder}
                                                    disabled={!editable}
                                                    type="number"
                                                    id={key}
                                                    name={key}
                                                    class:field-danger={!l3_attributes[key].valid}
                                                />
                                            {/if}
                                        </div>
                                    </div>
                                    <div style="color: red;" hidden={l3_attributes[key].valid}>
                                        {l3_attributes[key].validation}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                        <OptionalAttributes node_id={node_id} editable={editable} />
                    </div>
                {/if}
            </form>
        </div>
    {/if}
</div>


<!-- class:field-danger={!$l3attributesform.port.valid} -->