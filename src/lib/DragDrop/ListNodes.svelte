<script>
	import Node from './Node.svelte';
	import { nodes, node_id } from '../../store/store.js';
	
	let last_id;
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
</script>


<button on:click={add_node}>Add node</button>
{#each $nodes as node (node.id) }
	<Node bind:node={node}/>
{/each}