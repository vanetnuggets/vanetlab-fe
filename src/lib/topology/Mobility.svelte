<div class="mobility">
    <button on:click={toggle_mobility} class="importrant-btn btn-trans"> 
        Mobility
    </button><br>
    {#if open_mobility}
      <div transition:slide>
        <div class="add_mobility">
          <button on:click={toggle_add_mobility} class="importrant-btn btn-trans"> 
            Add
          </button><br>
          {#if open_add_mobility}
            <div transition:slide>
              <div class="row">
                  <div class="col">
                    Time: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"  bind:value={time_input} placeholder="Movement end time">
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                    X: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"  bind:value={x_input} placeholder="Position on x-axis ">
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                    Y: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"   bind:value={y_input} placeholder="Position on y-axis">
                  </div>
              </div>
              <div class="row">
                <div class="col">
                  Z: <br>
                </div>
                <div class="col">
                  <input class="my-input"   bind:value={z_input} placeholder="Speed?">
                </div>
              </div>
              {error_message}
              <button on:click={add_mobility}>
                  Add keyframe
              </button>
              <br>
            </div>
            
          {/if}
      </div>
        <button on:click={toggle_list_mobility} class="importrant-btn btn-trans"> 
          List
        </button><br>
        {#if open_list_mobility}
          <div transition:slide>
            {#each Object.entries($main_config.nodes.mobility) as [time, position]}
                <span>{time}</span> 
                <span>{position.x}</span>
                <span>{position.y}</span>
                <span>{position.z}</span>
                <button on:click={() => remove_mobility(time)}>&times;</button>
                <br>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
</div>

<script>
  import { slide } from 'svelte/transition'
  import { main_config } from '../../store/store.js';
 
  export let node_id
  
  let time_input = null;
  let x_input = null;
  let y_input = null;
  let z_input = null;
  let error_message = ""
  

  let mobility
  main_config.subscribe(n => {
    mobility = n.nodes.mobility;
  }) 
 
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
    if(!Number.isInteger(time_input=Number(time_input))){
      time_input = null
      error_message = "Incorrectly entered format. Integer requared."
      return false  
    }
    if(Number.isNaN(x_input=Number(x_input)))
      x_input = null
    if(Number.isNaN(y_input=Number(y_input)))
      y_input = null
    if(Number.isNaN(z_input=Number(z_input)))
      z_input = null

    if(!time_input || !x_input || !y_input || !z_input){
      error_message = "Incorrectly entered format. Float requared."
      return false  
    }
    return true
  }

  function check_missing() {
    if(!time_input || !x_input || !y_input || !z_input){
      error_message = "Something is missing"
      return false  
    }
    return true
  }

  const add_mobility = () => {
   // console.log(node_id)
    if(check_missing() && check_format() ){
      mobility[time_input]={"x":x_input,"y":y_input,"z":z_input}
      $main_config=$main_config
      
      time_input = null;
      x_input=null;
      y_input=null;
      z_input=null;
      error_message=""
      console.log($main_config)
    }
  };

  const remove_mobility = (time) => {
    mobility = delete mobility[time] && mobility
    $main_config=$main_config
  };
</script>