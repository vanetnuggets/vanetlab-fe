<style>
	.node {
		user-select: none;
		position:absolute;
		cursor: move;
		margin: auto;
		width: 50px;
		height: 50px;
		border-radius: 100%;
	}
	.remove { 
		cursor: pointer; 
		position: absolute; 
		right: 0px;
		top: -4px; 
		color: white;
		background-color: red;
		border-radius: 100%;
		padding: 0px 5px;
		margin: 0px;
		font-size: 14px;
		font-weight: bold;
		height: 20px;
		width: 10px;
	}
	.info {
		position: absolute; 
		left: -5px;
		top: -5px; 
		color: var(--dark-1);
		background-color: transparent;
		margin: 0px;
		font-size: 16px;
		font-weight: bold;
		height: 20px;
		width: 10px;
	}

	.foo {
		outline: solid 1px gray;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background-color: var(--dark-1);
	}

	.bar {
		outline: solid 1px gray;
		width: 50px;
		height: 50px;
		border-radius: 5%;
		background-color: red;
	}

	.ap{
		width: 50px;
		height: 50px;
		background-image: url("nodes/ap.png");
		background-size: 50px;
		background-color: aqua;
		outline: 3px solid var(--dark-1);
		border-radius: 100%;
	}

	.node-id {
		color: black;
		font-size: 14px;
		font-weight: bold;
		background-color: white;
		margin: 30px 20px 20px 17px;
		padding: 0px 5px;
		position:absolute;
		border-radius: 25%;
		outline: 2px solid var(--dark-1);
		cursor: move;
	}

	.selected {
		outline: 3px solid red;
	}
</style>

<script>
	import { 
		node_info2, 
		moving_type, 
		show_rdrawer, 
		node_info,
		networks,
		nodes
	} from '../../store/store.js';
	import sipky from '../sipky/sipky.js'

	let nodearr;
	nodes.subscribe(val => {
		nodearr = Object.values(val);
	})

	let unselected = '';
	let selected = 'selected';

	export let node={
		"left":0,
		"top":0,
		"x":0,
		"y":0,
		"id":0,
		"containers":[],
		"element": null,
		"info": false,
		"state": unselected,
		"color": "navy",
		"l2id": null
	}

	let ndcolor = "navy";
	networks.subscribe(_ => {
		ndcolor = nodecolor();
	})

	function nodecolor() {
		if (node.l2id === undefined || node.l2id === null) {
			return "navy";
		}
		return $networks[node.l2id].color;
	}

	export let zoom = 1

	let moving = false;
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving = false;
	}
	
	function remove(){
		// = nodearr.filter((value) => value.id !== node.id);
		// show_rdrawer.update(_ => 'container_info');
		// sipky.on_delete(node.id);
	}

	function set_current(evt){
		if ( $moving_type == "info") {
			for (let node of nodearr) {
				node.info = false;
			}
			node.info = true;
			node_info2.update(_ => node);
			show_rdrawer.update(_ => 'node_info');
		}

		if ( $moving_type != "node") {
			return;
		}
		
		node.state = selected;
		if (evt.shiftKey == true) {
			$node_info.set(node.id, node);
		} else {
			for (let n of $node_info.values()) {
				if (n.id != node.id)
					n.state = unselected;
			}
			let map = new Map()
			map.set(node.id, node)
			$node_info = map;
		}
	}

	function unselect(evt) {
		if (evt.shiftKey == true) {
			return;
		}
		node.state = unselected;
		$node_info = new Map();
	}
</script>



<!-- <svelte:window on:mouseup={stop}/> -->

<div on:pointerup={(evt) => unselect(evt)} on:pointerdown={(evt) => set_current(evt)} on:focus on:blur>
	<div bind:this={node.element} 
		style="left: {node.left}px; top : {node.top}px;	transform: scale({zoom}); background-color: {ndcolor};" 
		class="node {node.state} {node.type}" 
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:pointerdown={e => e.stopPropagation()} on:click={() => remove()} class=remove>
			X
		</span>
		<!-- <div style="left: {node.left+15}px; top : {node.top}px" class=node-id> -->
		<div class="node-id">
			{node.id}
		</div>

		{#if node.info == true}
		<div class="info">
			ℹ️
		</div>
		{/if}
	</div>
	
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