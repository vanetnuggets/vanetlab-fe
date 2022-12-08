<style>
.area {
  position: relative;
  height: 100%;
  }
</style>

<div bind:this={canvas} class="area canvas">
  <ListNodes/>
</div>

<script>
  import ListNodes from './ListNodes.svelte';
  import { store_container_size } from '../../store/store.js';
  
  import { onMount, onDestroy } from 'svelte';
    import sipky from '../sipky/sipky';

  let canvas;
  let interval_update_size

  onMount(() => {
    sipky.enable();
    // OOK OOK OOK OOK SOM ORAGNUTAN
    interval_update_size = setInterval(() => {
      let csize = {
      "width": canvas.offsetWidth,
      "height": canvas.offsetHeight
    }
    store_container_size.update(_ => csize)
    }, 1000);
  });

  onDestroy(() => {
    sipky.disable();
    clearInterval(interval_update_size)
  }) 

</script>