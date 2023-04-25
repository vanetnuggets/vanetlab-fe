<script>
  import { slide } from "svelte/transition";
  import { max_at, nodes } from "../../store/scenario.js";
  import { get } from "svelte/store";
  import { useForm, required, minLength, maxLength } from "svelte-use-form";
  import "../../assets/nodeconf.css";
  import TimeManagment from "../Canvas/TimeManagment.svelte";
    import { format } from "util";

  export let node_id;
  export let editable;

  let time_input = null;
  let x_input = null;
  let y_input = null;
  let z_input = null;
  let error_message = "";

  let mobility;

  const form = useForm({
    Time: { validators: [required, maxLength(8)] },
    X: { validators: [required, minLength(8)] },
    Y: { validators: [required, minLength(8)] },
    Z: { validators: [required, minLength(8)] },
  });

  const mobility_attributes = {
    Time: {
      name: "Time",
      value: null,
      end: "s",
      placeholder: "Movement end time",
      validation: "Integer",
    },
    X: {
      name: "X",
      value: null,
      end: "",
      placeholder: "Position on x-axis",
      validation: "Float",
    },
    Y: {
      name: "Y",
      value: null,
      end: "",
      placeholder: "Position on y-axis",
      validation: "Float",
    },
    Z: {
      name: "Z",
      value: null,
      end: "",
      placeholder: "Position on z-axis",
      validation: "Float",
    },
  };

  nodes.subscribe((n) => {
    if (n[node_id] === undefined) {
      return {};
    }
    mobility = n[node_id].mobility;
  });

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

  function check_format() {
    if (!Number.isInteger((time_input = Number(time_input)))) {
      time_input = null;
      error_message = "Incorrectly entered format. Integer required.";
      return false;
    }

    if (Number.isNaN((x_input = Number(x_input)))) x_input = null;
    if (Number.isNaN((y_input = Number(y_input)))) y_input = null;
    if (Number.isNaN((z_input = Number(z_input)))) z_input = null;

    if (!x_input || !y_input || !z_input) {
      error_message = "Incorrectly entered format. Float required.";
      return false;
    }
    return true;
  }

  function check_missing() {
    if (!time_input || !x_input || !y_input || !z_input) {
      error_message = "Something is missing";
      return false;
    }
    return true;
  }

  const add_mobility = () => {
    if (check_missing() && check_format()) {
      mobility[time_input.toString() + ".0"] = {
        x: x_input,
        y: y_input,
        z: z_input,
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

      // update MaxAt
      if (get(max_at) < time_input) {
        max_at.update((_) => time_input);
      }

      time_input = null;
      x_input = null;
      y_input = null;
      z_input = null;
      error_message = "";
    }
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
          Toggle
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
                      type="text"
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
              <button
                class="btn-basic"
                on:click={add_mobility}
                disabled={!editable || !$form.valid}
              >
                Add keyframe
              </button>
              <br />
            </form>
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
  {/if}
</div>

<style scoped>
</style>
