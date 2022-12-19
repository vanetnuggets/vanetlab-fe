<style>
.toolbar {
	display: inline-block;
	width: 100%;
	z-index: -1;
}
.action {
	float: left;
}
.zoom {
	float: right;
}
.minibtn {
	padding: 0px 4px;
	margin: 6px 0px;
	font-size: 12px;
	background-color: white;
	border: 2px solid black;
	cursor: pointer;
}
.minibtn:hover {
	border: 2px solid navy;
	transition: 0.3s;
	
}
.minibtn:active {
	background-color: navy;
	color: white;
	transition: 0.3s;
}
</style>


<script>
	import Keydown from "svelte-keydown";
	import Node from './Node.svelte';
	import sipky from '../sipky/sipky.js'
	import { nodes, node_id,node_info,moving, store_container_size } from '../../store/store.js';
	
	export let mouseX=0
	export let mouseY=0
	export let mouseOver=false

	let cont_size
	let last_id;
	let zoom=1;
	let checked=false;
	let current_node

	node_info.subscribe(val => {
    	current_node = val;
  	})

	node_id.subscribe(val => {
		last_id = val;
	})
	
	store_container_size.subscribe(val => {
		cont_size = val;
	})

	function id(){
		let this_id = last_id;
		node_id.update(n => n + 1);
		return this_id;
	}  

	function add_node(){
		const postionx= Math.round((cont_size.width/2)*10)/10
		const positiony = Math.round((cont_size.height/2)*10)/10
		let newNode = {
			"left": postionx,
			"top": positiony,
			"x": postionx,
			"y": positiony,
			"id": id(),
			"element": null,
			"containers": [],
			"type": "foo"
  		};
		$nodes = [...$nodes, newNode]
	}

	function recalculate_positions(zoom_in){

		mouseX=cont_size.width/2
		mouseY=cont_size.height/2
		let direction=-1
		if (zoom_in)
		direction=-direction
		
		$nodes.forEach(node => {
			let distancex= Math.abs(node.left-mouseX)
			let distancey= Math.abs(node.top-mouseY)
			if(distancex<1){
				distancex=1
			}
			if(distancey<1){
				distancey=1
			}
			const shiftx=Math.round(Math.log2(distancex))
			const shifty=Math.round(Math.log2(distancey))
		
			if(node.left>mouseX)
				node.left= node.left + shiftx*direction
			else{
				node.left= node.left - shiftx*direction
			}
			if(node.top>mouseY)
				node.top= node.top + shifty*direction
			else{
				node.top= node.top - shifty*direction
			}
			sipky.update(node.id);
		});
	}

	function return_to_1x(){
		if(!checked){
			zoom = 1
			$nodes.forEach(node => {
				node.left=node.x
				node.top=node.y
				sipky.update(node.id);
			})
		}
	}

	const handleWheel = e => {
		if(mouseOver && !checked){
			if (e.deltaY>0){
				recalc_zoom(-0.1)
				recalculate_positions(false)
			}
			recalc_zoom(0.1)
			recalculate_positions(true)
		}
	}

	function recalc_zoom(zoom_change) {
		let new_zoom = Math.round((zoom+zoom_change)*10)/10;
		if (new_zoom > 0.3 && new_zoom < 3) {
			zoom = new_zoom
		}
	}

	function change_zoom(evt) {
		console.log(evt.key);
		if (evt.key == '-') {
			recalc_zoom(-0.1)
			recalculate_positions(false)

		} else if (evt.key == '+') {
			recalc_zoom(0.1)
			recalculate_positions(true)
		}
	}

	function add_zoom(val) {
		recalc_zoom(val);
		let x = val < 0 ? false: true;
		recalculate_positions(x);
	}

	function to_index(id) {
		for (let i=0; i<$nodes.length; i++) {
			let curr = $nodes[i];
			if ( curr.id == id )
				return i
		}
		return null;
	}

	function move(e){
		if ( current_node == null ) {
			return;
		}
		let i = to_index(current_node.id);
		if ( i == null ) {
			return;
		} 
		if($moving){
			$nodes[i].left = $nodes[i].left+e.movementX;
			$nodes[i].top = $nodes[i].top+e.movementY;
			$nodes[i].x = $nodes[i].left / zoom;
			$nodes[i].y = $nodes[i].top / zoom;
			sipky.update($nodes[i].id);
			node_info.update(_ => $nodes[i]);
		}
	}

	function stop() {
		$moving = false;
		current_node = null;
	}

	function start() {
		$moving = true;
	}
	
	
</script>

<!-- <svelte:window on:mouseup={stop}/> -->
<svelte:window  on:mousedown={start} on:mousemove={move} on:mouseleave={stop} on:mouseup={stop}   on:keydown={change_zoom} on:wheel={handleWheel}/>
<div class="toolbar">
	<div class="action">
		<button on:click={add_node} class=add-button>Add node</button>
	</div>
	<div class="zoom">
		Zoom Level: {zoom}
		<button class="minibtn" on:click={() => add_zoom(0.1)}>➕</button>
		<button class="minibtn" on:click={() => add_zoom(-0.1)}>➖</button>
		<button class="minibtn" on:click={return_to_1x} >♻️</button>
	</div>
</div>
<div class=playground>
	{#each $nodes as node (node.id) }
		<Node bind:node={node} zoom={zoom}/>
	{/each}
</div>
