<script>
	import Node from './Node.svelte';
	import { nodes } from '../../store/store.js';
	let last_id = 0

	function id(){
		return last_id++;
	}  

	function add_node(){
		let newNode = {
			left:50,
			top:50,
			id: id(),
			element: null,
			containers:[]
  		};
		$nodes = [...$nodes, newNode]
	}
</script>


<button on:click={add_node}>Add node</button>
{#each $nodes as node (node.id) }
	<Node bind:node={node}/>
{/each}