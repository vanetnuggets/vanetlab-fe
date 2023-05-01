<script>

  import { slide } from "svelte/transition";
  import { max_at, nodes } from "../../store/scenario.js";
  import { get } from "svelte/store";
  import {emailValidator, requiredValidator,integerValidation,floatValidation} from "../../services/Validation/Validators.js"
  import { setValidator } from '../../services/Validation/ValidationSevice.js'
    import { zip } from "d3";
    import { subscribe } from "svelte/internal";


  export let node_id;
  export let editable;


  let mobility;
  let missing = true

    const validation = setValidator(requiredValidator(), emailValidator())
    const validity = validation[0]
    const validate = validation[1]
    
    
    $: console.log(mobility_attributes.Time.validation[0])
    const mobility_attributes = {
      Time: {
        validation: setValidator(requiredValidator(), emailValidator()),
        name: "Time",
        value: null,
        end: "s",
        placeholder: "Movement end time"
      },
      X: {
        name: "X",
        value: null,
        end: "",
        placeholder: "Position on x-axis",
        validation: "Positive Float",
      },
      Y: {
        name: "Y",
        value: null,
        end: "",
        placeholder: "Position on y-axis",
        validation: "Positive Float",
      },
      Z: {
        name: "Z",
        value: null,
        end: "",
        placeholder: "Position on z-axis",
        validation: "Positive Float",
      },
    };
    

    $: console.log()
    function extractFromValid(validation){
       
      return validation
    }

    nodes.subscribe((n) => {
      if (n[node_id] === undefined) {
        return {};
      }
      mobility = n[node_id].mobility;
    });

    $: if (mobility_attributes.Time.value != null && mobility_attributes.X.value != null &&
    mobility_attributes.Y.value != null && mobility_attributes.Z.value != null){
      missing = false
    } else 
      missing = true

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
      mobility[mobility_attributes.Time.value.toString() + ".0"] = {
        x: mobility_attributes.X.value,
        y: mobility_attributes.Y.value,
        z: mobility_attributes.Z.value,
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
      if (get(max_at) < Number(mobility_attributes.Time.value)) {
        max_at.update((_) => Number(mobility_attributes.Time.value));
      }

      mobility_attributes.Time.value = null;
      mobility_attributes.X.value = null;
      mobility_attributes.Y.value = null;
      mobility_attributes.Z.value = null;
    };

    const remove_mobility = (time) => {
      if (Object.keys(mobility).length !== 1) {
        mobility = delete mobility[time] && mobility;
        $nodes = $nodes;
      }
    };

    let testovaci = ""
</script>

<div class="mobility">
  <div class="row">
    <div class="col">
      <label>Testovaci: </label>
    </div>
    <div class="col">
      <input
        class="my-input"
        bind:value={testovaci}
        placeholder="ahoj"
        class:field-danger={!$validity.valid}
        use:validate={testovaci}
      />
    </div>
  </div>
  <div style="color: red;" hidden={$validity.valid}>
    { $validity.message }
  </div>
</div>

    <!-- <button on:click={toggle_mobility} class="importrant-btn btn-trans full">
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
              <form use:form>
                {#each Object.entries(mobility_attributes) as [store_name, attribute]}
                  <div class="form-field">
                    <div class="row">
                      <div class="col">
                        <label for={store_name}>{attribute.name}: </label>
                      </div>
                      <div class="col">
                        <input
                        class="my-input"
                        bind:value={attribute.value}
                        placeholder={attribute.placeholder}
                        disabled={!editable}
                        type="number"
                        id={store_name}
                        name={store_name}
                        class:field-danger={!$form[store_name].valid}
                        />
                      </div>
                    </div>
                    <div style="color: red;" hidden={$form[store_name].valid}>
                      Invalid format. Must be {attribute.validation}
                    </div>
                  </div>
                {/each}
                <br />
              </form>
              <button
                class="btn-basic"
                on:click={add_mobility}
                disabled={!editable || !$form.valid || missing}
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
