<div>
  From Sumo
  {#if sumo_file == null}
  <Dropzone on:drop={handleDrop}></Dropzone>
  {:else}
  Loaded file: {sumo_file.name}
  <button on:click={loadSumo}>Load scenario</button>
  {/if}
</div>

<script>
import Dropzone from "svelte-file-dropzone";

let sumo_file = null

function loadSumo() {

}

function handleDrop(e) {
  const { acceptedFiles, fileRejections } = e.detail;
  sumo_file = acceptedFiles[0];
  console.log(sumo_file);
}

</script>