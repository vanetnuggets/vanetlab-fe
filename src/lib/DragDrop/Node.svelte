<script>
	let node_size = 50;

	export let node={
		"left":0,
		"top":0,
		"id":0
	} 
	export let container_size;

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
			node.left = Math.max(0, node.left+e.movementX);
			node.top = Math.max(0, node.top+e.movementY);

			node.left = Math.min(container_size.width-node_size, node.left)
			node.top = Math.min(container_size.height-node_size, node.top)
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
		outline: solid 1px gray;
		background-color: navy;
		cursor: move;
		width: 50px;
		height: 50px;
		color: white;
		font-size: large;
		font-weight: bold;
		text-align: center;
		border-radius: 100%;
		margin: auto;
	}
	.nodetext {

	}
	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
</style>

<svelte:window on:mouseup={stop} on:mousemove={move}/>

<section on:mousedown={start} style="left: {node.left}px; top : {node.top}px" class="node">
	{node.id}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:pointerdown={e => e.stopPropagation()}
		on:click={() => remove()}
	 class=remove style="color:red">
		X
	</span>
</section>