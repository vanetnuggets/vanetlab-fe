<style>
.add-button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.add-button:hover {background-color: #3e8e41}

.add-button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

p{
	color: blue;
	font-weight: bold;
	font-size: 20px;
}
label{
	color: blue;
	font-weight: bold;
	font-size: 20px;
}
</style>


<script>
	import Node from './Node.svelte';
	import sipky from '../sipky/sipky.js'
	import { nodes, node_id,store_container_size } from '../../store/store.js';
	
	export let mouseX=0
	export let mouseY=0
	export let mouseOver=false

	let cont_size
	let last_id;
	let zoom=1;
	let checked=false;

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
				if(zoom > 0.3)
				zoom=Math.round((zoom-0.1)*10)/10
				recalculate_positions(false)
			}
			else if(zoom <3){
				zoom=Math.round((zoom+0.1)*10)/10
				recalculate_positions(true)
			}
		}
		// e.preventDefault()
	}
	
	
</script>

<svelte:window on:wheel={handleWheel} />
<button on:click={add_node} class=add-button>Add node</button>
<p>Zoom: {zoom}</p>
<label class="container">Fix to 1x
	<input type=checkbox bind:checked={checked} on:click={return_to_1x}>
</label>
{#each $nodes as node (node.id) }
	<Node bind:node={node} zoom={zoom}/>
{/each}