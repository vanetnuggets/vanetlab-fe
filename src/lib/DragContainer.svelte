<style>
.area {
  max-width: 1010px;
  height: 600px;
  background-color: yellow;
  position: relative;
}
</style>

<div id="draggable_area" class="area" on:click={test}>
  <ListNodes/>
</div>

<script>
  import ListNodes from './DragDrop/List_Nodes.svelte';
  import { store_container_size, show_rdrawer } from '../store/store.js';
  
  import { onMount } from 'svelte';

  onMount(() => {
    let csize = {
      "width": document.getElementById('draggable_area').offsetWidth,
      "height": document.getElementById('draggable_area').offsetHeight
    }
    console.log(csize);
    store_container_size.update(_ => csize)
  });


      
  
  function test() {
    // Toto funguje aj ked kliknem na kruzok, takze nic
    // Mozno do kruzku dat setTimeout, ale nejsme opice ci ?
    // show_rdrawer.update(n => null);
  }
</script>