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
              <button on:click={add_key_frame}>
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
                <button on:click={() => remove_key_frame(keyframe)}>&times;</button>
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
  
  
 
  let open_keyframes = true;
  function toggle_keyframes() {
    open_keyframes = !open_keyframes;  
  }
  
  let open_add_keyframes = false;
  function toggle_add_keyframes() {
    open_add_keyframes = !open_add_keyframes;  
  }
  
  let open_list_keyframes = false;
  function toggle_list_keyframes() {
    open_list_keyframes = !open_list_keyframes;  
  }

  const add_key_frame = () => {
    let index = 0;
    for ( index; index < keyframes.length; index++) {
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
  };

  const remove_key_frame = keyframe => {
    keyframes = keyframes.filter(k => k !== keyframe);
  };
</script>