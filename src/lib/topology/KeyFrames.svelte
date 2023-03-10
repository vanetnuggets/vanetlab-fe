<div class="keyframes">
    <button on:click={toggle_key_frames} class="importrant-btn btn-trans"> 
        Key Frames
    </button><br>
    {#if open_key_frames}
        <div transition:slide>
        <div class="row">
            <div class="col">
            Time: <br>
            </div>
            <div class="col">
            <input class="my-input" bind:value={end_time} placeholder="Movement end time">
            </div>
        </div>
        <div class="row">
            <div class="col">
            X: <br>
            </div>
            <div class="col">
            <input class="my-input" bind:value={x} placeholder="Position on x-axis ">
            </div>
        </div>
        <div class="row">
            <div class="col">
            Y: <br>
            </div>
            <div class="col">
            <input class="my-input" bind:value={y} placeholder="Position on y-axis">
            </div>
        </div>
        <button on:click={add_key_frame}>
            Add keyframe
        </button>
        <br>
            List <br>
        {#each key_frames as key_frame}
            <span>{key_frame.time}</span>
            <span>{key_frame.x}</span>
            <span>{key_frame.y}</span>
            <button on:click={() => remove_key_frame(key_frame)}>&times;</button>
            <br>
        {/each}
        </div>
    {/if}
</div>

<style>

</style>

<script>
import { slide } from 'svelte/transition'

let key_frames = [
    { time: 1, x: 10, y: 20 },
    { time: 1, x: 50, y: 60 },
  ];

  let end_time = null;
  let x = null;
  let y = null;
  let open_key_frames = true;
  
  function toggle_key_frames() {
    open_key_frames = !open_key_frames;  
  }

  const add_key_frame = () => {
    key_frames = [
      ...key_frames,
      {
        time: end_time,
        x,
        y,
      }
    ];
    end_time = null;
    x=null;
    y=null;
  };

  const remove_key_frame = key_frame => {
    key_frames = key_frames.filter(k => k !== key_frame);
  };
</script>