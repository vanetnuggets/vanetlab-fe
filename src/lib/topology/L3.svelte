<script>
    import "../../assets/nodeconf.css";
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";
    import OptionalAttributes from "./L3attributes.svelte";
    import ValidateInput from "../validation/ValidateInput.svelte";
    import { l3_attributes } from "../../store/validation.js";
    import ValidateSelect from "../validation/ValidateSelect.svelte";
    import { requiredValidator } from "../../services/Validations/Validators";
    import { buildValidator } from "../../services/Validations/ValidationSevice";

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
        else if($nodes[node_id].l3 == 'none')
            $nodes[node_id].l3conf = {}
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
            <div class="row">
                <div class="col">
                  {l3_config.name}:
                </div>
                <div class="col">
                  <select
                      class="dropdown"
                      bind:value={$nodes[node_id].l3}
                      placeholder={l3_config.placeholder}
                      disabled={!editable}
                      on:change={reset_l3conf}   
                  >
                      {#each l3_types as object}
                          <option value={object}>
                              {object}
                          </option>
                      {/each}
                      <option value="none" selected>none</option>
                  </select>
                </div>
            </div>
            
            <!-- <ValidateSelect bind:value={$nodes[node_id].l3} attribute={l3_config} objects = {l3_types}  on_change={reset_l3conf} editable = {editable} ></ValidateSelect> -->
            {#if $nodes[node_id].l3 != null && $nodes[node_id].l3 != 'none'}
                <div transition:slide>
                    {#each Object.keys($nodes[node_id].l3conf) as key}
                        {#if key !== "attributes" && $l3_attributes[key] != undefined}
                            {#if key === "comm"}
                                <ValidateSelect bind:value={$nodes[node_id].l3conf[key]} attribute={$l3_attributes[key]} objects = {Object.keys($nodes)}  on_change={null} editable = {editable} ></ValidateSelect>
                            {:else}
                                <ValidateInput bind:value={$nodes[node_id].l3conf[key]} attribute={$l3_attributes[key]} comparator={$nodes[node_id].l3conf["start"]} editable = {editable} ></ValidateInput><br>
                            {/if}
                        {/if}
                    {/each}
                    <OptionalAttributes node_id={node_id} editable={editable} />
                </div> 
            {/if}
        </div>
    {/if}
</div>