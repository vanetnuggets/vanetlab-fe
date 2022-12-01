<script>
	import { store_container_size, show_rdrawer, node_info, nodes } from '../../store/store.js';
	import sipky from '../sipky/sipky.js'
	let node_size = 50;

	export let node={
		"left":0,
		"top":0,
		"id":0,
		"containers":[],
		"element": null
	} 
	
	let cont_size;
	store_container_size.subscribe(val => {
		cont_size = val;
	})

	let moving = false;
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving = false;
		
	}

	function stop_a_little() {
		moving = false;
	}
	
	function move(e){
		if(moving){
			node.left = Math.max(0, node.left+e.movementX);
			node.top = Math.max(0, node.top+e.movementY);

			node.left = Math.min(cont_size.width-node_size, node.left)
			node.top = Math.min(cont_size.height-node_size, node.top)
		}
		update();
	}

	function remove(){
		$nodes = $nodes.filter((value) => value.id !== node.id);
		show_rdrawer.update(_ => 'container_info');
		sipky.on_delete(node.id);

	}

	function update() {
		show_rdrawer.update(_ => 'node_info');
		node_info.update(_ => node);
		sipky.update(node.id);
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
	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
</style>

<svelte:window on:mouseup={stop} />

<div bind:this={node.element} on:mousemove={move} on:mousedown={start}
	style="left: {node.left}px; top : {node.top}px" class="node">
	{node.id}
	<span on:pointerdown={e => e.stopPropagation()} on:click={() => remove()} class=remove style="color:red">
		X
	</span>
</div>


<!--
	<svelte:window on:mouseup={stop} on:mousemove={move} on:mousedown={on_mousedown} />
	
	<section id="{node.id.toString()}" on:click={update} on:mousedown={start} style="left: {node.left}px; top : {node.top}px" class="node">
		{node.id}
		<span on:pointerdown={e => e.stopPropagation()}
			on:click={() => remove()}
		class=remove style="color:red">
			X
		</span>
	</section>

-->