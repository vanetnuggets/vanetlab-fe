<style>
.area {
  position: relative;
  height: 100%;
  }
</style>

<!-- on:mousemove={move} -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div  on:mouseover={mouse_over} on:mouseleave={mouse_leave} bind:this={canvas} class="area canvas">
  <ListNodes mouseX={mouseX} mouseY={mouseY} mouseOver={mouseover}/>
</div>

<script>
  import ListNodes from './ListNodes.svelte';
  import { store_container_size } from '../../store/store.js';
  
  import { onMount, onDestroy } from 'svelte';
  import sipky from '../sipky/sipky';

  let canvas;
  let interval_update_size

  let mouseX=0
  let mouseY=0
  let mouseover=false

  function mouse_over(){
    mouseover=true
  }

  function mouse_leave(){
    mouseover=false
  }

  function move(e){
    // console.log("cau")
		var react = e.target.getBoundingClientRect();
		mouseX=e.clientX-react.left
		mouseY=e.clientY-react.top
	}
  
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