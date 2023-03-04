<div class="keyframes">
    <button on:click={toggle_keyframes} class="importrant-btn btn-trans"> 
        Keyframes
    </button><br>
    {#if open_keyframes}
      <div transition:slide>
        <div class="add_keyframes">
          <button on:click={toggle_add_keyframes} class="importrant-btn btn-trans"> 
            Add
          </button><br>
          {#if open_add_keyframes}
            <div transition:slide>
              <div class="row">
                  <div class="col">
                    Time: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"  bind:value={end_time} placeholder="Movement end time">
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                    X: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"  bind:value={x} placeholder="Position on x-axis ">
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                    Y: <br>
                  </div>
                  <div class="col">
                    <input class="my-input"   bind:value={y} placeholder="Position on y-axis">
                  </div>
              </div>
              {error_message}
              <button on:click={add_keyframe}>
                  Add keyframe
              </button>
              <br>
            </div>
            
          {/if}
      </div>
        <button on:click={toggle_list_keyframes} class="importrant-btn btn-trans"> 
          List
        </button><br>
        {#if open_list_keyframes}
          <div transition:slide>
            {#each keyframes as keyframe}
                <span>{keyframe.time}</span> 
                <span>{keyframe.x}</span>
                <span>{keyframe.y}</span>
                <button on:click={() => remove_keyframe(keyframe)}>&times;</button>
                <br>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
</div>

<script>
import { slide } from 'svelte/transition'

let keyframes = [
    { time: 1, x: 10, y: 20 },
    { time: 3, x: 50, y: 60 },
    { time: 5, x: 50, y: 60 },
  ];

  let end_time = null;
  let x = null;
  let y = null;
  let error_message = ""
  
 
  let open_keyframes = false;
  function toggle_keyframes() {
    open_keyframes = !open_keyframes;  
  }
  
  let open_add_keyframes = false;
  function toggle_add_keyframes() {
    open_add_keyframes = !open_add_keyframes;  
  }
  
  let open_list_keyframes = true;
  function toggle_list_keyframes() {
    open_list_keyframes = !open_list_keyframes;  
  }

  function check_format() {
    if(Number.isNaN(end_time=parseInt(end_time)))
      end_time = null
    if(Number.isNaN(x=parseInt(x)))
      x = null
    if(Number.isNaN(y=parseInt(y)))
      y = null

    if(end_time == null || x == null || y == null){
      error_message = "Incorrectly entered format. Integer requared."
      return false  
    }
    return true
  }

  function check_missing() {
    if(end_time == null || x == null || y == null){
      error_message = "Something is missing"
      return false  
    }
    return true
  }

  function add_keyframe () {
    if(check_missing() && check_format() ){
      let index
      for ( index=0; index < keyframes.length; index++) {
        if (keyframes[index].time > end_time) {
          break;
        }
      }
    
      keyframes.splice(index, 0,  
        {
          time: end_time,
          x,
          y,
        })
      keyframes=keyframes;

      end_time = null;
      x=null;
      y=null;
      error_message=""
    }
  };

  const remove_keyframe = keyframe => {
    keyframes = keyframes.filter(k => k !== keyframe);
  };
</script>