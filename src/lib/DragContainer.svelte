<script>
import ListNodes from './DragDrop/List_Nodes.svelte';
import { show_rdrawer } from '../store/store.js';

let csize = {
  width: 1000,
  height: 600
}

function test() {
  // Toto funguje aj ked kliknem na kruzok, takze nic
  // Mozno do kruzku dat setTimeout, ale nejsme opice ci ?
  // show_rdrawer.update(n => null);
}
</script>

<style>
.area {
  width: 1000px;
  height: 600px;
}
</style>

<div class="area" on:click={test}>
  <ListNodes container_size={csize}></ListNodes>
</div>