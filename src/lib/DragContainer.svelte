<script>
import ListNodes from './DragDrop/List_Nodes.svelte';

let csize = {
  width: 1000,
  height: 600
}

</script>

<style>
.area {
  width: 1000px;
  height: 600px;
}
</style>

<div class="area">
  <ListNodes container_size={csize}></ListNodes>

</div>