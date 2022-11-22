<style>
.area {
  background-color: yellow;
  position: relative;
  height: 100%;
}
</style>

<div id="draggable_area" class="area">
  <ListNodes/>
</div>

<script>
  import ListNodes from './ListNodes.svelte';
  import { store_container_size } from '../../store/store.js';
  
  import { onMount } from 'svelte';

  onMount(() => {
    // OOK OOK OOK OOK SOM ORAGNUTAN
    setInterval(() => {
      let csize = {
      "width": document.getElementById('draggable_area').offsetWidth,
      "height": document.getElementById('draggable_area').offsetHeight
    }
    store_container_size.update(_ => csize)
    }, 1000);
  });
</script>