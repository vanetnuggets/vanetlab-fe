<script>
	export let node={
		"left":0,
		"top":0,
		"id":0
	} 

	export let remove_from_list; 
	let moving = false;
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving= false;
	}
	
	function move(e){
		if(moving){
			node.left += e.movementX;
			node.top += e.movementY;
		}
	}
	function remove(){
		remove_from_list(node.id)
	}
	
</script>

<style>
	.node {
		user-select: none;
		position:absolute;
		border: solid 1px gray;
		cursor: move;
	}
	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
</style>

<svelte:window on:mouseup={stop} on:mousemove={move}/>

<section on:mousedown={start} style="left: {node.left}px; top : {node.top}px" class="node">
	
	<slot>
	<h1>
 		{node.id}
	</h1>
	</slot>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:pointerdown={e => e.stopPropagation()}
		on:click={() => remove()}
	 class=remove style="color:red">
		X
	</span>
</section>