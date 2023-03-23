<script>
  import { slide } from "svelte/transition";
  import { max_at, nodes } from "../../store/scenario.js";
  import { get } from 'svelte/store'
  import '../../assets/nodeconf.css'

  export let node_id;

  let time_input = null;
  let x_input = null;
  let y_input = null;
  let z_input = null;
  let error_message = "";

  let mobility;
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
      mobility[time_input] = { x: x_input, y: y_input, z: z_input };
      $nodes = $nodes;
      
      // update MaxAt
      if (get(max_at) < time_input) {
        max_at.update(_ => time_input);
      }

      time_input = null;
      x_input = null;
      y_input = null;
      z_input = null;
      error_message = "";
    }
  };

  const remove_mobility = (time) => {
    mobility = delete mobility[time] && mobility;
    $nodes = $nodes;
  };
</script>

<div class="mobility">
  <button on:click={toggle_mobility} class="importrant-btn btn-trans full">
    | Mobility
  </button><br />
  {#if open_mobility}
    <div transition:slide>
      <div class="add_mobility">
        <button on:click={toggle_add_mobility} class="importrant-btn btn-trans">
          Add
        </button><br />
        {#if open_add_mobility}
          <div transition:slide>
            <div class="row">
              <div class="col">
                Time: <br />
              </div>
              <div class="col">
                <input
                  class="my-input"
                  bind:value={time_input}
                  placeholder="Movement end time"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                X: <br />
              </div>
              <div class="col">
                <input
                  class="my-input"
                  bind:value={x_input}
                  placeholder="Position on x-axis "
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                Y: <br />
              </div>
              <div class="col">
                <input
                  class="my-input"
                  bind:value={y_input}
                  placeholder="Position on y-axis"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                Z: <br />
              </div>
              <div class="col">
                <input
                  class="my-input"
                  bind:value={z_input}
                  placeholder="Speed?"
                />
              </div>
            </div>
            {error_message}
            <button on:click={add_mobility}> Add keyframe </button>
            <br />
          </div>
        {/if}
      </div>
      <button on:click={toggle_list_mobility} class="importrant-btn btn-trans">
        List
      </button><br />
      {#if open_list_mobility}
        <div transition:slide>
          {#each Object.entries($nodes[node_id].mobility) as [time, position]}
            <span>{time}</span>
            <span>{position.x.toFixed(2)}</span>
            <span>{position.y.toFixed(2)}</span>
            <button on:click={() => remove_mobility(time)}>&times;</button>
            <br />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
