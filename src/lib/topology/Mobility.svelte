<script>

  import { slide } from "svelte/transition";
  import { max_at, nodes } from "../../store/scenario.js";
  import { get } from "svelte/store";

  import {mobility_attributes} from "../../store/validation.js"
  import ValidateInput from "../validation/ValidateInput.svelte";
  import { buildValidator } from "../../services/validation/ValidationSevice.js";
  import { positiveIntegerValidation,positiveFloatValidator} from "../../services/validation/Validators.js"

  export let node_id;
  export let editable;


  let mobility;
  let valid = false

  let inputs = {
    time : null,
    x: null,
    y: null,
    z: null
  }

  nodes.subscribe((n) => {
    if (n[node_id] === undefined) {
      return {};
    }
    mobility = n[node_id].mobility;
  });
  
  const validationFloat =  buildValidator(positiveFloatValidator())
  const validationInt = buildValidator(positiveIntegerValidation())
  
  $: if ( inputs.time != null && inputs.x != null && inputs.y != null && inputs.z != null){
        valid = true
        let result = null
        Object.entries(inputs).forEach(entry => {
          if(entry[0] == 'time')
            result = validationInt(entry[1])
          else
            result = validationFloat(entry[1])
          if(!result.valid)
            valid = false
        })
      } else 
        valid = false
  
  


  let open_mobility = false;
  function toggle_mobility() {
    open_mobility = !open_mobility;
  }

  let open_add_mobility = false;
  function toggle_add_mobility() {
    open_add_mobility = !open_add_mobility;
  }

  let open_list_mobility = true;
  function toggle_list_mobility() {
    open_list_mobility = !open_list_mobility;
  }
  
  function add_mobility() {
    mobility[inputs.time.toString() + ".0"] = {
      x: Number(inputs.x).toFixed(2).toString(),
      y: Number(inputs.y).toFixed(2).toString(),
      z: Number(inputs.z).toFixed(2).toString(),
    };
    $nodes[node_id].mobility = Object.keys(mobility)
      .sort(function (a, b) {
        return +a - +b;
      })
      .reduce((obj, key) => {
        obj[key] = mobility[key];
        return obj;
      }, {});
    $nodes = $nodes;

      //update MaxAt
    if (get(max_at) < Number(inputs.time)) {
      max_at.update((_) => Number(inputs.time));
    }

    inputs.time = null;
    inputs.x = null;
    inputs.y = null;
    inputs.z = null;
  };

  const remove_mobility = (time) => {
    if (Object.keys(mobility).length !== 1) {
      mobility = delete mobility[time] && mobility;
      $nodes = $nodes;
    }
  };

</script>

<div class="mobility">
  
    <button on:click={toggle_mobility} class="importrant-btn btn-trans full">
      | Mobility
    </button><br />
    {#if open_mobility && $nodes[node_id] !== undefined}
      <div transition:slide>
        <div class="add_mobility">
          <button on:click={toggle_add_mobility} class="btn-basic">
            Modify
          </button><br />
          {#if open_add_mobility}
            <div transition:slide>
              {#each Object.entries($mobility_attributes) as [store_name, attribute]}
                <ValidateInput bind:value={inputs[store_name]} attribute={attribute} comparator={null} editable = {editable} ></ValidateInput><br>  
              {/each}
              <br />
              <button
                class="btn-basic"
                on:click={add_mobility}
                disabled={!editable || !valid}
                >
                Add keyframe
              </button>
            </div>
          {/if}
        </div>
       
        <button on:click={toggle_list_mobility} class="btn-basic">
          List
        </button><br />
        {#if open_list_mobility}
          <div transition:slide>
            <table class="mobility_table">
              <tr>
                <th style="width:25%">Time</th>
                <th>X</th>
                <th>Y</th>
                <th>Delete</th>
              </tr>
              {#each Object.entries($nodes[node_id].mobility) as [time, position]}
                <tr>
                  <td>{time}</td>
                  <td>{position.x}</td>
                  <td>{position.y}</td>
                  <td
                    ><button
                      class="btn-basic"
                      disabled={!editable}
                      on:click={() => remove_mobility(time)}>&times;</button
                    ></td
                  >
                </tr>
              {/each}
            </table>
          </div>
        {/if}
      </div>
      <button on:click={toggle_list_mobility} class="btn-basic">
        List
      </button><br />
      {#if open_list_mobility}
        <div transition:slide>
          <table class="mobility_table">
            <tr>
              <th style="width:25%">Time</th>
              <th>X</th>
              <th>Y</th>
              <th>Delete</th>
            </tr>
            {#each Object.entries($nodes[node_id].mobility) as [time, position]}
              <tr>
                <td>{time}</td>
                <td>{position.x.toFixed(2)}</td>
                <td>{position.y.toFixed(2)}</td>
                <td
                  ><button
                    class="btn-basic"
                    disabled={!editable}
                    on:click={() => remove_mobility(time)}>&times;</button
                  ></td
                >
              </tr>
            {/each}
          </table>
        </div>
      {/if}
  {/if}
</div>

<style scoped>
</style>
    {/if}
  </div> -->
