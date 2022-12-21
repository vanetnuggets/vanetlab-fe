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
.select-button:target {
	background-color: navy;
	color: white;
	transition: 0.3s;
}
</style>


<script>
	import Node from './Node.svelte';
	import sipky from '../sipky/sipky.js'
	import { 
		node_info2, 
		moving_type, 
		nodes, 
		node_id, 
		node_info, 
		store_container_size 
	} from '../../store/store.js';
	
	export let mouseX=0
	export let mouseY=0
	export let mouseOver=false

	let move_now = false;

	let cont_size
	let last_id;
	let zoom=1;
	let checked=false;
	let current_node

	let move_x = 0;
	let move_y = 0;

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
			"type": "foo",
			"selected": false
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

			const shiftx = distancex/10;
			const shifty = distancey/10;
			
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
			if (e.deltaY > 0){
				add_zoom(-0.1)
			} else {
				add_zoom(0.1)
			}
		}
	}

	function recalc_zoom(zoom_change) {
		let new_zoom = Math.round((zoom+zoom_change)*10)/10;
		if (new_zoom > 0.3 && new_zoom < 3) {
			zoom = new_zoom
		}
	}

	function add_zoom(val) {
		let old_zoom = zoom;
		recalc_zoom(val);
		if (zoom == old_zoom) {
			return;
		}
		let x = val < 0 ? false: true;
		recalculate_positions(x);
	}


	function _move_canvas(dir, val) {
		if (dir == 'x') {
			move_x += val;
			for (let i=0; i<$nodes.length; i++) {
				let node_id = $nodes[i].id;
				$nodes[i].left = ($nodes[i].x + move_x)*zoom;
				sipky.update(node_id);
			}
		}
		if (dir == 'y') {
			move_y += val;
			for (let i=0; i<$nodes.length; i++) {
				let node_id = $nodes[i].id;
				$nodes[i].top = ($nodes[i].y + move_y)*zoom;
				sipky.update(node_id);
			}
		}
	}


	function change_zoom(evt) {
		if (evt.key == '-') {
			add_zoom(-0.1)
		} else if (evt.key == '+') {
			add_zoom(0.1)
		}

		if (evt.key == 'a') {
			_move_canvas('x', -10);
		}
		if (evt.key == 'd') {
			_move_canvas('x', 10);
		}
		if (evt.key == 's') {
			_move_canvas('y', 10);
		}
		if (evt.key == 'w') {
			_move_canvas('y', -10);
		}
	}

	function set_move_type(type) {
		$moving_type = type;
		for (let n of $nodes) {
			n.info = false;
			n.state = '';
		}
	}

	function to_index(id) {
		for (let i=0; i<$nodes.length; i++) {
			let curr = $nodes[i];
			if ( curr.id == id )
				return i
		}
		return null;
	}

	function move_canvas(evt) {
		if(move_now == false || $moving_type != 'canvas') {
			return
		}

		_move_canvas('x', evt.movementX);
		_move_canvas('y', evt.movementY);
	}

	function move(e){
		if(move_now == false) {
			return;
		}

		if ( $moving_type == 'canvas' ) {
			move_canvas(e);
			return;
		}

		if ($moving_type == 'node') {
			for(let cn of current_node.values()) {
				if (cn == null) {
					continue;
				}
				let i = to_index(cn.id);
				if ( i == null ) {
					continue;
				} 

				$nodes[i].left = $nodes[i].left+e.movementX;
				$nodes[i].top = $nodes[i].top+e.movementY;
				$nodes[i].x = ($nodes[i].left-move_x) / zoom;
				$nodes[i].y = ($nodes[i].top-move_y) / zoom;
				sipky.update($nodes[i].id);
				$node_info.set($nodes[i].id, $nodes[i]);
			}
		}
	}

	function stop() {
		move_now = false;
		//current_node = null;
	}

	function start() {
		move_now = true;
	}
</script>

<!-- <svelte:window on:mouseup={stop}/> -->
<svelte:window on:mousedown={start} on:mousemove={move} on:mouseleave={stop} on:mouseup={stop}   on:keydown={change_zoom} on:wheel={handleWheel}/>
<div class="toolbar">
	<div class="action">
		<button on:click={add_node} class=add-button>Add node</button>
		<button on:click={() => set_move_type('node')} class="minibtn select-button">👆️</button>
		<button on:click={() => set_move_type('canvas')} class="minibtn select-button">🗺️</button>
		<button on:click={() => set_move_type('info')} class="minibtn select-button">ℹ️</button>
	
	</div>
	<div class="zoom">
		Moving: {$moving_type}
		MoveX: {move_x}
		MoveY: {move_y}
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
