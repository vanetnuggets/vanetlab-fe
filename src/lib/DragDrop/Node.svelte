<script>
	export let left;
	export let top ;
	export let id;
	let moving = false;
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving= false;
	}
	
	function move(e){
		if(moving){
			left += e.movementX;
			top += e.movementY;
		}
	}
	
</script>

<style>
	.node {
		user-select: none;
		position:absolute;
		border: solid 1px gray;
		cursor: move;
	}
</style>

<svelte:window on:mouseup={stop} on:mousemove={move}/>

<section on:mousedown={start} style="left: {left}px; top : {top}px" class="node">
	<slot>
	<h1>
 		{id}
	</h1>
	</slot>
</section>