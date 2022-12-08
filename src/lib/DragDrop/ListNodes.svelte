<style>
.add-button{
	z-index: 100;
	cursor: pointer;
}
</style>


<script>
	import Node from './Node.svelte';
	import { nodes, node_id } from '../../store/store.js';
	
	let last_id;
	let zoom=2;
	node_id.subscribe(val => {
		last_id = val;
	})

	function id(){
		let this_id = last_id;
		node_id.update(n => n + 1);
		return this_id;
	}  

	function add_node(){
		let newNode = {
			"left": 50,
			"top": 50,
			"id": id(),
			"element": null,
			"containers": [],
			"type": "foo"
  		};
		$nodes = [...$nodes, newNode]
	}
	const handleWheel = e => {
		if (e.deltaY>0){
			zoom=zoom-0.1
		}
		else{
			zoom=zoom+0.1
		}
		// console.log(e.deltaY)
		// e.preventDefault()
	}
</script>

<svelte:window on:wheel={handleWheel}/>
<button on:click={add_node} class=add-button>Add node</button>
{#each $nodes as node (node.id) }
	<Node bind:node={node} zoom={zoom}/>
{/each}